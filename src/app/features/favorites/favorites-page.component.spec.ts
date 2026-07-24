import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';

import { FavoritesPageComponent } from './favorites-page.component';
import { FavoritesService } from '../../core/services/favorites.service';
import { APP_PATHS } from '../../core/constants/app-routes.constants';
import { Photo } from '../../core/models/photo.model';

describe('FavoritesPageComponent', () => {
  const favorites = signal<Photo[]>([]);

  beforeEach(() => {
    favorites.set([]);
    TestBed.configureTestingModule({
      imports: [FavoritesPageComponent],
      providers: [provideRouter([]), { provide: FavoritesService, useValue: { favorites } }],
    });
  });

  it('should render one card per favorite photo', () => {
    favorites.set([{ id: 'a' }, { id: 'b' }]);
    const fixture = TestBed.createComponent(FavoritesPageComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('app-photo-card').length).toBe(2);
  });

  it('should reflect library changes reactively', () => {
    favorites.set([{ id: 'a' }]);
    const fixture = TestBed.createComponent(FavoritesPageComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('app-photo-card').length).toBe(1);

    favorites.set([]);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('app-photo-card').length).toBe(0);
  });

  it('should open the photo detail when a favorite is clicked', () => {
    favorites.set([{ id: 'seed-1' }]);
    const fixture = TestBed.createComponent(FavoritesPageComponent);
    fixture.detectChanges();
    const navigate = spyOn(TestBed.inject(Router), 'navigateByUrl');

    (fixture.nativeElement.querySelector('app-photo-card button') as HTMLButtonElement).click();

    expect(navigate).toHaveBeenCalledWith(APP_PATHS.photoDetail('seed-1'));
  });
});
