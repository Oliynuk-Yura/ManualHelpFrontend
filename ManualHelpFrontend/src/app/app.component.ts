import { Component } from '@angular/core';
import { ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'restaurant';

  public toasterConfig: ToasterConfig =
    new ToasterConfig({
      positionClass: 'toast-top-right',
      animation: 'flyRight',
      newestOnTop: true
    });
}
