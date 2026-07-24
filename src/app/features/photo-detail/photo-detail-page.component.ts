import { Component, computed, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { photoUrl } from '../../core/models/photo.model';
import { FavoritesService } from '../../core/services/favorites.service';
import { APP_PATHS } from '../../core/constants/app-routes.constants';

/** Detail size keeps the 2:3 ratio of the grid thumbnails, at higher resolution. */
const DETAIL_WIDTH = 800;
const DETAIL_HEIGHT = 1200;

/**
 * Single full-screen photo.
 *
 * The `id` route parameter is bound as a component input
 * (`withComponentInputBinding`). The photo always renders — the seed resolves
 * at any resolution — but the remove action is only offered while the photo
 * is part of the favorites library.
 */
@Component({
  selector: 'app-photo-detail-page',
  templateUrl: './photo-detail-page.component.html',
  styleUrls: ['./photo-detail-page.component.scss'],
  imports: [MatButtonModule],
})
export class PhotoDetailPageComponent {
  public readonly id = input.required<string>();

  private readonly router = inject(Router);
  private readonly favoritesService = inject(FavoritesService);

  protected readonly imageUrl = computed(() =>
    photoUrl(this.id(), DETAIL_WIDTH, DETAIL_HEIGHT),
  );

  protected readonly isFavorite = computed(() => this.favoritesService.has(this.id()));

  protected removeFromFavorites(): void {
    this.favoritesService.remove(this.id());
    this.router.navigateByUrl(APP_PATHS.favorites);
  }
}
