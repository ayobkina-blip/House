import { Component, VERSION } from '@angular/core';
import { HomeComponent } from "./home/home.component";
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    template: `
      <main>
        <a [routerLink]="['/']">
          <header class="brand-name">
            <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true">
          </header>
        </a>
        <section class="content">
          <router-outlet></router-outlet>
        </section>
      </main>
    `,
    styleUrls: ['./app.component.css'],
    imports: [HomeComponent, RouterModule]
})
export class AppComponent {
  title = 'homes';
  version = VERSION.full;
}
