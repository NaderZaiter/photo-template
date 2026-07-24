import { TestBed } from '@angular/core/testing';

import { PhotoCardComponent } from './photo-card.component';
import { Photo } from '../../../core/models/photo.model';

describe('PhotoCardComponent', () => {
  const photo: Photo = { id: 'seed-123' };

  function setup() {
    TestBed.configureTestingModule({ imports: [PhotoCardComponent] });
    const fixture = TestBed.createComponent(PhotoCardComponent);
    fixture.componentRef.setInput('photo', photo);
    fixture.detectChanges();
    return fixture;
  }

  it('should render the seeded picsum image', () => {
    const fixture = setup();
    const img = fixture.nativeElement.querySelector('img') as HTMLImageElement;
    expect(img.getAttribute('src')).toBe('https://picsum.photos/seed/seed-123/200/300');
  });

  it('should expose the configured action as the accessible name', () => {
    const fixture = setup();
    fixture.componentRef.setInput('actionLabel', 'Add photo to favorites');
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(button.getAttribute('aria-label')).toBe('Add photo to favorites');
  });

  it('should emit the photo when clicked', () => {
    const fixture = setup();
    let selected: Photo | undefined;
    fixture.componentInstance.selected.subscribe((value) => (selected = value));

    (fixture.nativeElement.querySelector('button') as HTMLButtonElement).click();

    expect(selected).toEqual(photo);
  });
});
