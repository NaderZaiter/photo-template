import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { Photo } from '../../core/models/photo.model';
import { FavoritesService } from '../../core/services/favorites.service';
import { APP_PATHS } from '../../core/constants/app-routes.constants';
import { PhotoGridComponent } from '../../shared/components/photo-grid/photo-grid.component';

/** Favorites library: every saved photo, no infinite scrolling. */
@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.scss'],
  imports: [PhotoGridComponent, MatButtonModule, RouterLink],
})
export class FavoritesPageComponent {
  private readonly favoritesService = inject(FavoritesService);
  private readonly router = inject(Router);

  protected readonly favorites = this.favoritesService.favorites;
  protected readonly paths = APP_PATHS;

  protected openPhoto(photo: Photo): void {
    this.router.navigateByUrl(APP_PATHS.photoDetail(photo.id));
  }
}
