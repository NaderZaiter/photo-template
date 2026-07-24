export interface Photo {
  readonly id: string;
}

export function photoUrl(id: string, width: number, height: number): string {
  return `https://picsum.photos/seed/${id}/${width}/${height}`;
}
