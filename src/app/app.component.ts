import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Root component of the application.
 *
 * Hosts the RouterOutlet for rendering routed views.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  /** Application title */
  title = 'REWE-Cloud';
}
