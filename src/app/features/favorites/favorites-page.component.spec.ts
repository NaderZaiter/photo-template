import { TestBed } from '@angular/core/testing';
import { FavoritesPageComponent } from './favorites-page.component';

describe('FavoritesPageComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FavoritesPageComponent],
    });
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(FavoritesPageComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
