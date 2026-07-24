import { TestBed } from '@angular/core/testing';

import { PhotoService, PHOTO_BATCH_SIZE } from './photo.service';
import { Photo } from '../models/photo.model';

describe('PhotoService', () => {
  let service: PhotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhotoService);
    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should emit a batch of the requested size with unique ids', () => {
    spyOn(Math, 'random').and.returnValue(0);
    let result: Photo[] | undefined;

    service.getPhotos(8).subscribe((photos) => (result = photos));
    jasmine.clock().tick(300);

    expect(result?.length).toBe(8);
    const ids = new Set(result?.map((photo) => photo.id));
    expect(ids.size).toBe(8);
  });

  it('should default to the standard batch size', () => {
    spyOn(Math, 'random').and.returnValue(0);
    let result: Photo[] | undefined;

    service.getPhotos().subscribe((photos) => (result = photos));
    jasmine.clock().tick(300);

    expect(result?.length).toBe(PHOTO_BATCH_SIZE);
  });

  it('should not emit before the minimum 200ms delay', () => {
    spyOn(Math, 'random').and.returnValue(0);
    let result: Photo[] | undefined;

    service.getPhotos().subscribe((photos) => (result = photos));

    jasmine.clock().tick(199);
    expect(result).toBeUndefined();
    jasmine.clock().tick(1);
    expect(result).toBeDefined();
  });

  it('should emit at most after the maximum 300ms delay', () => {
    spyOn(Math, 'random').and.returnValue(1);
    let result: Photo[] | undefined;

    service.getPhotos().subscribe((photos) => (result = photos));

    jasmine.clock().tick(299);
    expect(result).toBeUndefined();
    jasmine.clock().tick(1);
    expect(result).toBeDefined();
  });
});
