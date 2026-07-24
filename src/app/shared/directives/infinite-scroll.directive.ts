import {
  DestroyRef,
  Directive,
  ElementRef,
  OnInit,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';

/**
 * Emits `(appInfiniteScroll)` whenever the host element (a sentinel placed
 * after the list) becomes visible in the viewport and loading is not in
 * progress.
 *
 * - While `[appInfiniteScrollDisabled]` is true the directive stays silent.
 * - When it flips back to false and the sentinel is still visible, it emits
 *   again, so batches keep loading until the sentinel leaves the viewport.
 * - The observer is disconnected automatically on destroy.
 *
 * Implemented with a bare IntersectionObserver on purpose: the task requires
 * a hand-made infinite scroll, no third-party libraries.
 */
@Directive({ selector: '[appInfiniteScroll]' })
export class InfiniteScrollDirective implements OnInit {
  /** Blocks emissions while the consumer is loading a batch. */
  readonly disabled = input(false, { alias: 'appInfiniteScrollDisabled' });

  /** Fired when more content should be loaded. */
  readonly loadMore = output<void>({ alias: 'appInfiniteScroll' });

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly isIntersecting = signal(false);

  constructor() {
    effect(() => {
      if (this.isIntersecting() && !this.disabled()) {
        this.loadMore.emit();
      }
    });
  }

  ngOnInit(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries.some((entry) => entry.isIntersecting);
        this.isIntersecting.set(isVisible);
      },
      // Start loading 100px before the sentinel reaches the bottom edge.
      { rootMargin: '0px 0px 100px 0px' },
    );

    observer.observe(this.host.nativeElement);
    this.destroyRef.onDestroy(() => observer.disconnect());
  }
}
