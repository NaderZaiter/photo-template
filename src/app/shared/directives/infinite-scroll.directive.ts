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

@Directive({ selector: '[appInfiniteScroll]' })
export class InfiniteScrollDirective implements OnInit {
  public readonly disabled = input(false, { alias: 'appInfiniteScrollDisabled' });

  public readonly loadMore = output<void>({ alias: 'appInfiniteScroll' });

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

  public ngOnInit(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries.some((entry) => entry.isIntersecting);
        this.isIntersecting.set(isVisible);
      },
      { rootMargin: '0px 0px 100px 0px' },
    );

    observer.observe(this.host.nativeElement);
    this.destroyRef.onDestroy(() => observer.disconnect());
  }
}
