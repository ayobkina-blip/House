import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingLocation } from '../housinglocation';
import {FormsModule} from '@angular/forms';
import { ViviendasService } from '../Viviendas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
     
  ],
  template: `

    Numero de vivienda:{{IdVivienda}} 
    <article>
      <img class="listing-photo" [src]="vivienda?.photo"
        alt="Exterior photo of {{vivienda?.name}}"/>
      <section class="listing-description">
        <h2 class="listing-heading">{{vivienda?.name}}</h2>
        <p class="listing-location">{{vivienda?.city}}, {{vivienda?.state}}</p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Units available: {{vivienda?.availableUnits}}</li>
          <li>Does this location have wifi: {{vivienda?.wifi}}</li>
          <li>Does this location have laundry: {{vivienda?.laundry}}</li>
        </ul>
      </section>
      <button type="button"  (click)="EliminarVivienda()" class="primary">Eliminar</button>
      <br>
      <button type="button"  (click)="EliminarVivienda1()" class="primary">Eliminar 1</button>

      <!--
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        
          <label for="first-name">First Name</label>
          <input <img class="listing-photo" [src]id="first-name" [(ngModel)]="a" class="form-control" type="text" >

          <label for="last-name">Last Name</label>
          <input id="last-name" [(ngModel)]="b" class="form-control" type="text" >

          <label for="email">Email</label>
          <input id="email" type="email"  [(ngModel)]="c" class="form-control" >
          <button type="button"  (click)="submitApplication()" class="primary">Apply now</button>

        
      </section>
-->
    </article>
  `,
  styleUrls: ['./DetallesViv.component.css'],
})
export class DetallesVivComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  viviendasService = inject(ViviendasService);
  vivienda: HousingLocation | undefined;

  a="pepito";
  b="";
  c="";

  IdVivienda: number = -1;
 router: Router = inject(Router);

  constructor() {
     this.IdVivienda = parseInt(this.route.snapshot.params['id'], 10);
     
    this.vivienda= this.viviendasService.GetOne(this.IdVivienda);


  }

  EliminarVivienda(){
    this.viviendasService.Eliminar(this.IdVivienda);
    // Refrescar la página o navegar a la lista de viviendas después de eliminar
    this.router.navigate(['/']);

  }
   EliminarVivienda1(){
    this.viviendasService.Eliminar(this.IdVivienda);
    // Refrescar la página o navegar a la lista de viviendas después de eliminar
    window.history.back(); // No recomendado, pero funciona para volver a la página anterior

  }
}
