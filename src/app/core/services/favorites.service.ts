import { Injectable, signal } from '@angular/core';

import { Photo } from '../models/photo.model';

const STORAGE_KEY = 'photo-library.favorites';

/**
 * Holds the favorites library as a signal and persists it to localStorage,
 * so the list survives page reloads without any backend.
 */
@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly favoritesSignal = signal<Photo[]>(this.loadFavorites());

  /** Read-only view of the favorites library, newest last. */
  public readonly favorites = this.favoritesSignal.asReadonly();

  /**
   * Adds a photo to the library.
   * Returns false (and leaves the library untouched) if it is already there.
   */
  public add(photo: Photo): boolean {
    if (this.has(photo.id)) {
      return false;
    }

    this.favoritesSignal.update((favorites) => [...favorites, photo]);
    this.persist();
    return true;
  }

  public remove(id: string): void {
    if (!this.has(id)) {
      return;
    }

    this.favoritesSignal.update((favorites) =>
      favorites.filter((favorite) => favorite.id !== id),
    );
    this.persist();
  }

  public has(id: string): boolean {
    return this.favoritesSignal().some((favorite) => favorite.id === id);
  }

  /** Defensive read: any missing, corrupt or unexpected payload yields []. */
  private loadFavorites(): Photo[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return [];
      }

      const parsed: unknown = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        return [];
      }

      return parsed
        .filter(
          (item): item is Photo =>
            typeof item === 'object' &&
            item !== null &&
            typeof (item as Photo).id === 'string',
        )
        .map((item) => ({ id: item.id }));
    } catch {
      return [];
    }
  }

  private persist(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.favoritesSignal()));
  }
}
