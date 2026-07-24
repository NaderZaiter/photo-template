import { Routes } from '@angular/router';

import { ROUTE_SEGMENTS } from './core/constants/app-routes.constants';

export const routes: Routes = [
  {
    path: ROUTE_SEGMENTS.photos,
    pathMatch: 'full',
    title: 'Photos',
    loadComponent: () =>
      import('./features/photos/photos-page.component').then((m) => m.PhotosPageComponent),
  },
  {
    path: ROUTE_SEGMENTS.favorites,
    title: 'Favorites',
    loadComponent: () =>
      import('./features/favorites/favorites-page.component').then(
        (m) => m.FavoritesPageComponent,
      ),
  },
  {
    path: ROUTE_SEGMENTS.photoDetail,
    title: 'Photo',
    loadComponent: () =>
      import('./features/photo-detail/photo-detail-page.component').then(
        (m) => m.PhotoDetailPageComponent,
      ),
  },
  { path: '**', redirectTo: '' },
];
