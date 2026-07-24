import { Component, inject } from '@angular/core';

import { FavoritesService } from '../../core/services/favorites.service';
import { PhotoGridComponent } from '../../shared/components/photo-grid/photo-grid.component';

/** Favorites library: every saved photo, no infinite scrolling. */
@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.scss'],
  imports: [PhotoGridComponent],
})
export class FavoritesPageComponent {
  private readonly favoritesService = inject(FavoritesService);

  protected readonly favorites = this.favoritesService.favorites;
}
