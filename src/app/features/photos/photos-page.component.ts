import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Photo } from '../../core/models/photo.model';
import { PhotoService } from '../../core/services/photo.service';
import { FavoritesService } from '../../core/services/favorites.service';
import { PhotoGridComponent } from '../../shared/components/photo-grid/photo-grid.component';
import { InfiniteScrollDirective } from '../../shared/directives/infinite-scroll.directive';

const SNACK_BAR_DURATION_MS = 2000;

@Component({
  selector: 'app-photos-page',
  templateUrl: './photos-page.component.html',
  styleUrls: ['./photos-page.component.scss'],
  imports: [MatProgressSpinnerModule, PhotoGridComponent, InfiniteScrollDirective],
})
export class PhotosPageComponent {
  private readonly photoService = inject(PhotoService);
  private readonly favoritesService = inject(FavoritesService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly photos = signal<Photo[]>([]);
  protected readonly isLoading = signal(false);

  protected addToFavorites(photo: Photo): void {
    const wasAdded = this.favoritesService.add(photo);
    this.snackBar.open(wasAdded ? 'Added to favorites' : 'Already in favorites', undefined, {
      duration: SNACK_BAR_DURATION_MS,
    });
  }

  protected loadMore(): void {
    if (this.isLoading()) {
      return;
    }

    this.isLoading.set(true);
    this.photoService
      .getPhotos()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.isLoading.set(false)),
      )
      .subscribe({
        next: (batch) => this.photos.update((current) => [...current, ...batch]),
        error: () => undefined,
      });
  }
}
