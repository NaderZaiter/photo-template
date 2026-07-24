import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';

import { PhotoDetailPageComponent } from './photo-detail-page.component';
import { FavoritesService } from '../../core/services/favorites.service';
import { APP_PATHS } from '../../core/constants/app-routes.constants';

describe('PhotoDetailPageComponent', () => {
  let favoritesService: jasmine.SpyObj<FavoritesService>;

  beforeEach(() => {
    favoritesService = jasmine.createSpyObj<FavoritesService>('FavoritesService', [
      'has',
      'remove',
    ]);

    TestBed.configureTestingModule({
      imports: [PhotoDetailPageComponent],
      providers: [
        provideRouter([]),
        { provide: FavoritesService, useValue: favoritesService },
      ],
    });
  });

  function setup(id: string, isFavorite: boolean): ComponentFixture<PhotoDetailPageComponent> {
    favoritesService.has.and.returnValue(isFavorite);
    const fixture = TestBed.createComponent(PhotoDetailPageComponent);
    fixture.componentRef.setInput('id', id);
    fixture.detectChanges();
    return fixture;
  }

  it('should render the photo at detail resolution using the same seed', () => {
    const fixture = setup('seed-1', true);
    const img = fixture.nativeElement.querySelector('img') as HTMLImageElement;

    expect(img.getAttribute('src')).toBe('https://picsum.photos/seed/seed-1/800/1200');
  });

  it('should offer the remove action while the photo is a favorite', () => {
    const fixture = setup('seed-1', true);

    expect(fixture.nativeElement.querySelector('button')?.textContent).toContain(
      'Remove from favorites',
    );
  });

  it('should show a note instead of the remove action for unknown photos', () => {
    const fixture = setup('seed-1', false);

    expect(fixture.nativeElement.querySelector('button')).toBeNull();
    expect(fixture.nativeElement.querySelector('.photo-detail__note')?.textContent).toContain(
      'not in your favorites',
    );
  });

  it('should remove the photo and navigate back to favorites', () => {
    const fixture = setup('seed-1', true);
    const router = TestBed.inject(Router);
    const navigate = spyOn(router, 'navigateByUrl');

    (fixture.nativeElement.querySelector('button') as HTMLButtonElement).click();

    expect(favoritesService.remove).toHaveBeenCalledWith('seed-1');
    expect(navigate).toHaveBeenCalledWith(APP_PATHS.favorites);
  });
});
