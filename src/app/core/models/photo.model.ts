/** A photo is identified by a stable seed used to derive its image URLs. */
export interface Photo {
  readonly id: string;
}

/**
 * Builds the image URL for a photo at the requested size.
 *
 * Uses the picsum.photos `seed` endpoint: the same id always resolves to the
 * same image, at any resolution. This keeps favorites and the detail page
 * stable across reloads.
 */
export function photoUrl(id: string, width: number, height: number): string {
  return `https://picsum.photos/seed/${id}/${width}/${height}`;
}
