# Photo Library

Angular 22 photo library with an infinite random photostream and a persistent Favorites collection.

## Requirements

- Node.js 24+ (see `.nvmrc`)

## Getting started

```bash
nvm use
npm install
npm start
```

Open [http://localhost:4200](http://localhost:4200).

| Command | Description |
| --- | --- |
| `npm start` | Dev server |
| `npm test -- --watch=false` | Unit tests |
| `npm run build` | Production build |

## Features

- **Photos** (`/`) — infinite scroll with a simulated API delay (200–300 ms). Click a photo to add it to Favorites.
- **Favorites** (`/favorites`) — saved photos, persisted in `localStorage`. Click to open the detail view.
- **Photo detail** (`/photos/:id`) — full-size photo with remove-from-favorites.

## Stack

- Angular 22 (standalone, signals, zoneless)
- Angular Material 22
- SCSS
- Karma + Jasmine

## Architecture

```
src/app/
├── core/        # Models, route constants, PhotoService, FavoritesService
├── features/    # Lazy-loaded pages: photos, favorites, photo-detail
└── shared/      # Header, PhotoCard, PhotoGrid, InfiniteScrollDirective
```

Photos come from [picsum.photos](https://picsum.photos/) using stable seed IDs. Infinite scroll is a custom `IntersectionObserver` directive (no third-party libraries). Favorites state uses signals and survives page refresh via `localStorage`.
