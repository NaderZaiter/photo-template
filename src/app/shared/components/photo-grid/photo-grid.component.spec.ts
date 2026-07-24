import { TestBed } from '@angular/core/testing';

import { PhotoGridComponent } from './photo-grid.component';
import { Photo } from '../../../core/models/photo.model';

describe('PhotoGridComponent', () => {
  const photos: Photo[] = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];

  function setup() {
    TestBed.configureTestingModule({ imports: [PhotoGridComponent] });
    const fixture = TestBed.createComponent(PhotoGridComponent);
    fixture.componentRef.setInput('photos', photos);
    fixture.detectChanges();
    return fixture;
  }

  it('should render one card per photo', () => {
    const fixture = setup();
    expect(fixture.nativeElement.querySelectorAll('app-photo-card').length).toBe(3);
  });

  it('should re-emit the selected photo', () => {
    const fixture = setup();
    let selected: Photo | undefined;
    fixture.componentInstance.photoSelected.subscribe((value) => (selected = value));

    const buttons = fixture.nativeElement.querySelectorAll('button');
    (buttons[1] as HTMLButtonElement).click();

    expect(selected).toEqual(photos[1]);
  });
});
