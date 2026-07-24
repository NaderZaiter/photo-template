import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';

import { HeaderComponent } from './header.component';
import { APP_PATHS, ROUTE_SEGMENTS } from '../../../core/constants/app-routes.constants';

@Component({ template: '' })
class DummyPageComponent {}

describe('HeaderComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        provideRouter([
          { path: ROUTE_SEGMENTS.photos, pathMatch: 'full', component: DummyPageComponent },
          { path: ROUTE_SEGMENTS.favorites, component: DummyPageComponent },
          { path: ROUTE_SEGMENTS.photoDetail, component: DummyPageComponent },
        ]),
      ],
    });
  });

  async function setup(url: string): Promise<ComponentFixture<HeaderComponent>> {
    const fixture = TestBed.createComponent(HeaderComponent);
    await TestBed.inject(Router).navigateByUrl(url);
    await fixture.whenStable();
    fixture.detectChanges();
    return fixture;
  }

  function links(fixture: ComponentFixture<HeaderComponent>): HTMLAnchorElement[] {
    return Array.from(fixture.nativeElement.querySelectorAll('a.header__link'));
  }

  function activeLinks(fixture: ComponentFixture<HeaderComponent>): HTMLAnchorElement[] {
    return Array.from(fixture.nativeElement.querySelectorAll('a.header__link--active'));
  }

  it('should render both navigation links pointing to the centralized paths', async () => {
    const fixture = await setup(APP_PATHS.photos);
    const [photos, favorites] = links(fixture);
    expect(links(fixture).length).toBe(2);
    expect(photos.getAttribute('href')).toBe(APP_PATHS.photos);
    expect(favorites.getAttribute('href')).toBe(APP_PATHS.favorites);
  });

  it('should mark only Photos as active on the root route', async () => {
    const fixture = await setup(APP_PATHS.photos);
    const active = activeLinks(fixture);
    expect(active.length).toBe(1);
    expect(active[0].textContent?.trim()).toBe('Photos');
    expect(active[0].getAttribute('aria-current')).toBe('page');
  });

  it('should mark only Favorites as active on the favorites route', async () => {
    const fixture = await setup(APP_PATHS.favorites);
    const active = activeLinks(fixture);
    expect(active.length).toBe(1);
    expect(active[0].textContent?.trim()).toBe('Favorites');
    expect(active[0].getAttribute('aria-current')).toBe('page');
  });

  it('should mark no link as active on the photo detail route', async () => {
    const fixture = await setup(APP_PATHS.photoDetail('some-id'));
    expect(activeLinks(fixture).length).toBe(0);
    for (const link of links(fixture)) {
      expect(link.getAttribute('aria-current')).toBeNull();
    }
  });
});
