import { Component, computed, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { photoUrl } from '../../core/models/photo.model';
import { FavoritesService } from '../../core/services/favorites.service';
import { APP_PATHS } from '../../core/constants/app-routes.constants';

const DETAIL_WIDTH = 800;
const DETAIL_HEIGHT = 1200;

@Component({
  selector: 'app-photo-detail-page',
  templateUrl: './photo-detail-page.component.html',
  styleUrls: ['./photo-detail-page.component.scss'],
  imports: [MatButtonModule, MatProgressSpinnerModule],
})
export class PhotoDetailPageComponent {
  public readonly id = input.required<string>();

  private readonly router = inject(Router);
  private readonly favoritesService = inject(FavoritesService);

  protected readonly isImageLoaded = signal(false);

  protected readonly imageUrl = computed(() =>
    photoUrl(this.id(), DETAIL_WIDTH, DETAIL_HEIGHT),
  );

  protected readonly isFavorite = computed(() => this.favoritesService.has(this.id()));

  protected removeFromFavorites(): void {
    this.favoritesService.remove(this.id());
    this.router.navigateByUrl(APP_PATHS.favorites);
  }
}
