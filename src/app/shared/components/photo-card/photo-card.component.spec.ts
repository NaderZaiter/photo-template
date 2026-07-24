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

  it('should emit the photo when clicked', () => {
    const fixture = setup();
    let selected: Photo | undefined;
    fixture.componentInstance.selected.subscribe((value) => (selected = value));

    (fixture.nativeElement.querySelector('button') as HTMLButtonElement).click();

    expect(selected).toEqual(photo);
  });
});
