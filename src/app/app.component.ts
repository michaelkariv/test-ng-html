import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HtmlerComponent} from "./htmler/htmler.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HtmlerComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'test-ng-html';
}
