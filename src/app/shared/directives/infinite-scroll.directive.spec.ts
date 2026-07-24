import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfiniteScrollDirective } from './infinite-scroll.directive';

class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = [];

  readonly observed: Element[] = [];
  isDisconnected = false;

  constructor(private readonly callback: IntersectionObserverCallback) {
    MockIntersectionObserver.instances.push(this);
  }

  observe(element: Element): void {
    this.observed.push(element);
  }

  disconnect(): void {
    this.isDisconnected = true;
  }

  trigger(isIntersecting: boolean): void {
    this.callback(
      [{ isIntersecting } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver,
    );
  }
}

@Component({
  template: `<div
    class="sentinel"
    appInfiniteScroll
    [appInfiniteScrollDisabled]="isDisabled()"
    (appInfiniteScroll)="emissions = emissions + 1"
  ></div>`,
  imports: [InfiniteScrollDirective],
})
class HostComponent {
  readonly isDisabled = signal(false);
  emissions = 0;
}

describe('InfiniteScrollDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;
  const originalIntersectionObserver = window.IntersectionObserver;

  beforeEach(() => {
    MockIntersectionObserver.instances = [];
    (window as unknown as { IntersectionObserver: unknown }).IntersectionObserver =
      MockIntersectionObserver;

    TestBed.configureTestingModule({ imports: [HostComponent] });
    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    window.IntersectionObserver = originalIntersectionObserver;
  });

  function observer(): MockIntersectionObserver {
    expect(MockIntersectionObserver.instances.length).toBe(1);
    return MockIntersectionObserver.instances[0];
  }

  it('should observe the host sentinel element', () => {
    const sentinel = fixture.nativeElement.querySelector('.sentinel');
    expect(observer().observed).toEqual([sentinel]);
  });

  it('should emit when the sentinel becomes visible', () => {
    observer().trigger(true);
    fixture.detectChanges();

    expect(host.emissions).toBe(1);
  });

  it('should not emit while disabled', () => {
    host.isDisabled.set(true);
    fixture.detectChanges();

    observer().trigger(true);
    fixture.detectChanges();

    expect(host.emissions).toBe(0);
  });

  it('should emit once re-enabled if the sentinel is still visible', () => {
    host.isDisabled.set(true);
    fixture.detectChanges();
    observer().trigger(true);
    fixture.detectChanges();
    expect(host.emissions).toBe(0);

    host.isDisabled.set(false);
    fixture.detectChanges();

    expect(host.emissions).toBe(1);
  });

  it('should emit again when the sentinel leaves and re-enters the viewport', () => {
    observer().trigger(true);
    fixture.detectChanges();
    observer().trigger(false);
    fixture.detectChanges();
    observer().trigger(true);
    fixture.detectChanges();

    expect(host.emissions).toBe(2);
  });

  it('should disconnect the observer on destroy', () => {
    fixture.destroy();
    expect(observer().isDisconnected).toBeTrue();
  });
});
