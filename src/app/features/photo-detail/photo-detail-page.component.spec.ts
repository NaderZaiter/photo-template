import { TestBed } from '@angular/core/testing';
import { PhotoDetailPageComponent } from './photo-detail-page.component';

describe('PhotoDetailPageComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PhotoDetailPageComponent],
    });
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(PhotoDetailPageComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
