/**
 * Single source of truth for application routes.
 *
 * - `ROUTE_SEGMENTS`: path segments used by the router configuration.
 * - `APP_PATHS`: absolute URLs used for navigation (templates and code).
 */
export const ROUTE_SEGMENTS = {
  photos: '',
  favorites: 'favorites',
  photoDetail: 'photos/:id',
} as const;

export const APP_PATHS = {
  photos: '/',
  favorites: '/favorites',
  photoDetail: (id: string) => `/photos/${id}`,
} as const;
