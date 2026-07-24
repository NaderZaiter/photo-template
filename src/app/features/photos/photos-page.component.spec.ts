import { TestBed } from '@angular/core/testing';
import { PhotosPageComponent } from './photos-page.component';

describe('PhotosPageComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PhotosPageComponent],
    });
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(PhotosPageComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
