import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';

import { PhotosPageComponent } from './photos-page.component';
import { PhotoService } from '../../core/services/photo.service';
import { Photo } from '../../core/models/photo.model';

/** Keeps the real IntersectionObserver out of the page tests. */
class NoopIntersectionObserver {
  observe(): void {}
  disconnect(): void {}
}

describe('PhotosPageComponent', () => {
  let fixture: ComponentFixture<PhotosPageComponent>;
  let photoService: jasmine.SpyObj<PhotoService>;
  let batches: Subject<Photo[]>;
  const originalIntersectionObserver = window.IntersectionObserver;

  beforeEach(() => {
    (window as unknown as { IntersectionObserver: unknown }).IntersectionObserver =
      NoopIntersectionObserver;

    batches = new Subject<Photo[]>();
    photoService = jasmine.createSpyObj<PhotoService>('PhotoService', ['getPhotos']);
    photoService.getPhotos.and.callFake(() => batches.asObservable());

    TestBed.configureTestingModule({
      imports: [PhotosPageComponent],
      providers: [{ provide: PhotoService, useValue: photoService }],
    });

    fixture = TestBed.createComponent(PhotosPageComponent);
    fixture.detectChanges();
  });

  afterEach(() => {
    window.IntersectionObserver = originalIntersectionObserver;
  });

  function loadMore(): void {
    (fixture.componentInstance as unknown as { loadMore: () => void }).loadMore();
    fixture.detectChanges();
  }

  function emitBatch(photos: Photo[]): void {
    batches.next(photos);
    batches.complete();
    batches = new Subject<Photo[]>();
    fixture.detectChanges();
  }

  it('should render the infinite scroll sentinel', () => {
    expect(fixture.nativeElement.querySelector('.photos-page__sentinel')).not.toBeNull();
  });

  it('should show the loader while a batch is loading and hide it afterwards', () => {
    loadMore();
    expect(fixture.nativeElement.querySelector('mat-progress-spinner')).not.toBeNull();

    emitBatch([{ id: 'a' }]);
    expect(fixture.nativeElement.querySelector('mat-progress-spinner')).toBeNull();
  });

  it('should append every new batch to the grid', () => {
    loadMore();
    emitBatch([{ id: 'a' }, { id: 'b' }]);
    expect(fixture.nativeElement.querySelectorAll('app-photo-card').length).toBe(2);

    loadMore();
    emitBatch([{ id: 'c' }]);
    expect(fixture.nativeElement.querySelectorAll('app-photo-card').length).toBe(3);
  });

  it('should hide the loader and accept new requests if a batch fails', () => {
    loadMore();
    expect(fixture.nativeElement.querySelector('mat-progress-spinner')).not.toBeNull();

    batches.error(new Error('network down'));
    batches = new Subject<Photo[]>();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('mat-progress-spinner')).toBeNull();
    expect(fixture.nativeElement.querySelectorAll('app-photo-card').length).toBe(0);

    loadMore();
    expect(photoService.getPhotos).toHaveBeenCalledTimes(2);
  });

  it('should ignore load requests while a batch is already loading', () => {
    loadMore();
    loadMore();

    expect(photoService.getPhotos).toHaveBeenCalledTimes(1);
  });
});
