import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocation } from '../housinglocation';
import { RouterModule } from '@angular/router';
import { ViviendasService } from '../Viviendas.service';  
import { Router } from '@angular/router';


@Component({
  selector: 'app-vivienda',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  template: `
    <section class="listing">
      <img class="listing-photo" [src]="vivienda.photo" alt="Exterior photo of {{vivienda.name}}">
      <h2 class="listing-heading">{{ vivienda.name }}</h2>
      <p class="listing-location">{{ vivienda.city}}, {{vivienda.state }}</p>
      <a [routerLink]="['/DescViv', vivienda.id]">Ver vivienda</a>
    </section>
     <button type="button"  (click)="EliminarVivienda()" class="primary">Eliminar</button>
      <br>
    <button type="button"  (click)="ModificarVivienda()" class="primary">Modificar</button>
      <br>
  `,
  styleUrls: ['./vivienda.component.css'],
})

export class ViviendaComponent {

  @Input() vivienda!: HousingLocation;

router: Router = inject(Router);

  viviendasService = inject(ViviendasService);


   EliminarVivienda(){
    this.viviendasService.Eliminar(this.vivienda.id);
    // Refrescar la página o navegar a la lista de viviendas después de eliminar
    this.router.navigate(['/']);

  }
  ModificarVivienda(){
   
    // Refrescar la página o navegar a la lista de viviendas después de eliminar
    this.router.navigate(['/EditViv', this.vivienda.id]);

  }

}