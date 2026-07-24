import { Component, input, output } from '@angular/core';

import { Photo } from '../../../core/models/photo.model';
import { PhotoCardComponent } from '../photo-card/photo-card.component';

/** Responsive grid of photo cards, shared by the Photos and Favorites pages. */
@Component({
  selector: 'app-photo-grid',
  templateUrl: './photo-grid.component.html',
  styleUrls: ['./photo-grid.component.scss'],
  imports: [PhotoCardComponent],
})
export class PhotoGridComponent {
  public readonly photos = input.required<Photo[]>();

  /** Accessible name forwarded to every card. */
  public readonly cardActionLabel = input('Select photo');

  public readonly photoSelected = output<Photo>();
}
