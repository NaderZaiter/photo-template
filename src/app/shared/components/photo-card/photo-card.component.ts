import { Component, computed, input, output } from '@angular/core';

import { Photo, photoUrl } from '../../../core/models/photo.model';

/** Thumbnail size required by the task statement (picsum.photos/200/300). */
const THUMB_WIDTH = 200;
const THUMB_HEIGHT = 300;

/**
 * Clickable photo thumbnail. What the click means (add to favorites, open
 * detail...) is decided by the consuming page through `(selected)`.
 */
@Component({
  selector: 'app-photo-card',
  templateUrl: './photo-card.component.html',
  styleUrls: ['./photo-card.component.scss'],
})
export class PhotoCardComponent {
  public readonly photo = input.required<Photo>();

  /** Accessible name describing what clicking the card does on this page. */
  public readonly actionLabel = input('Select photo');

  public readonly selected = output<Photo>();

  protected readonly imageUrl = computed(() =>
    photoUrl(this.photo().id, THUMB_WIDTH, THUMB_HEIGHT),
  );
}
