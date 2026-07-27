import { TestBed } from '@angular/core/testing';

import { FavoritesService } from './favorites.service';

const STORAGE_KEY = 'photo-library.favorites';

describe('FavoritesService', () => {
  beforeEach(() => {
    localStorage.removeItem(STORAGE_KEY);
    TestBed.configureTestingModule({});
  });

  afterEach(() => {
    localStorage.removeItem(STORAGE_KEY);
  });

  function createService(): FavoritesService {
    return TestBed.inject(FavoritesService);
  }

  it('should start empty when nothing is persisted', () => {
    expect(createService().favorites()).toEqual([]);
  });

  it('should add a photo and persist it', () => {
    const service = createService();

    expect(service.add({ id: 'a' })).toBeTrue();

    expect(service.favorites()).toEqual([{ id: 'a' }]);
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')).toEqual([{ id: 'a' }]);
  });

  it('should reject duplicates without touching the library', () => {
    const service = createService();
    service.add({ id: 'a' });

    expect(service.add({ id: 'a' })).toBeFalse();

    expect(service.favorites()).toEqual([{ id: 'a' }]);
  });

  it('should remove a photo and persist the change', () => {
    const service = createService();
    service.add({ id: 'a' });
    service.add({ id: 'b' });

    service.remove('a');

    expect(service.favorites()).toEqual([{ id: 'b' }]);
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')).toEqual([{ id: 'b' }]);
  });

  it('should do nothing when removing a photo that is not a favorite', () => {
    const service = createService();
    service.add({ id: 'a' });
    const setItem = spyOn(localStorage, 'setItem');

    service.remove('missing');

    expect(service.favorites()).toEqual([{ id: 'a' }]);
    expect(setItem).not.toHaveBeenCalled();
  });

  it('should report membership through has()', () => {
    const service = createService();
    service.add({ id: 'a' });

    expect(service.has('a')).toBeTrue();
    expect(service.has('b')).toBeFalse();
  });

  it('should load persisted favorites on creation', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([{ id: 'a' }, { id: 'b' }]));

    expect(createService().favorites()).toEqual([{ id: 'a' }, { id: 'b' }]);
  });

  it('should fall back to an empty library on corrupt JSON', () => {
    localStorage.setItem(STORAGE_KEY, '{not json');

    expect(createService().favorites()).toEqual([]);
  });

  it('should fall back to an empty library on unexpected payloads', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ id: 'not-an-array' }));

    expect(createService().favorites()).toEqual([]);
  });

  it('should drop malformed entries while keeping valid ones', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([{ id: 'a' }, { id: 42 }, null, 'x']));

    expect(createService().favorites()).toEqual([{ id: 'a' }]);
  });

  it('should keep in-memory favorites when localStorage.setItem throws', () => {
    const service = createService();
    spyOn(localStorage, 'setItem').and.throwError('QuotaExceededError');

    expect(service.add({ id: 'a' })).toBeTrue();
    expect(service.favorites()).toEqual([{ id: 'a' }]);
    expect(service.has('a')).toBeTrue();
  });
});
