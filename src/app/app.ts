import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Casas } from './casas/casas';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Casas],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('House');

  
}
