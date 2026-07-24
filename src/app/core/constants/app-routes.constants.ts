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
