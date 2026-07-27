import { photoUrl } from './photo.model';

describe('photoUrl', () => {
  it('should build a picsum seed URL for the requested size', () => {
    expect(photoUrl('seed-123', 200, 300)).toBe(
      'https://picsum.photos/seed/seed-123/200/300',
    );
  });

  it('should encode special characters in the photo id', () => {
    expect(photoUrl('a/b c', 800, 1200)).toBe(
      'https://picsum.photos/seed/a%2Fb%20c/800/1200',
    );
  });
});
