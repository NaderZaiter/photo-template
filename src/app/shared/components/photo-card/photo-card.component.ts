import { Component, computed, input, output } from '@angular/core';

import { Photo, photoUrl } from '../../../core/models/photo.model';

const THUMB_WIDTH = 200;
const THUMB_HEIGHT = 300;

@Component({
  selector: 'app-photo-card',
  templateUrl: './photo-card.component.html',
  styleUrls: ['./photo-card.component.scss'],
})
export class PhotoCardComponent {
  public readonly photo = input.required<Photo>();

  public readonly actionLabel = input('Select photo');

  public readonly selected = output<Photo>();

  protected readonly imageUrl = computed(() =>
    photoUrl(this.photo().id, THUMB_WIDTH, THUMB_HEIGHT),
  );
}
