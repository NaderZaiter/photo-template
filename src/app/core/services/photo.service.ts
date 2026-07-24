import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

import { Photo } from '../models/photo.model';

/** Default number of photos returned per request. */
export const PHOTO_BATCH_SIZE = 12;

const MIN_API_DELAY_MS = 200;
const MAX_API_DELAY_MS = 300;

/**
 * Emulates a real-world photo API: every request resolves a fresh batch of
 * random photos after a random 200-300ms latency.
 */
@Injectable({ providedIn: 'root' })
export class PhotoService {
  getPhotos(count = PHOTO_BATCH_SIZE): Observable<Photo[]> {
    const photos: Photo[] = Array.from({ length: count }, () => ({
      id: crypto.randomUUID(),
    }));

    return of(photos).pipe(delay(this.randomDelay()));
  }

  private randomDelay(): number {
    return MIN_API_DELAY_MS + Math.random() * (MAX_API_DELAY_MS - MIN_API_DELAY_MS);
  }
}
