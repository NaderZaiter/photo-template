import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

import { APP_PATHS } from '../../../core/constants/app-routes.constants';

/**
 * Application header with the two main navigation actions.
 * The active view is derived from the URL via `routerLinkActive`.
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [MatToolbarModule, MatButtonModule, RouterLink, RouterLinkActive],
})
export class HeaderComponent {
  protected readonly paths = APP_PATHS;
}
