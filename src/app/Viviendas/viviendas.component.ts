import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocation } from '../housinglocation';
import { ViviendaComponent } from "../vivienda/vivienda.component";
import { ViviendasService } from '../Viviendas.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-viviendas',
  standalone: true,
  imports: [
    CommonModule,
    ViviendaComponent
],
  template: `
    <section>
     
    </section>
    <button type="button"  (click)="NuevaVivienda()" class="primary">Nueva vivienda</button>

    <section class="results">

   
      
  @for (v of viviendasList; track v.name) {
    <app-vivienda  [vivienda]="v"> </app-vivienda>
  }

<!-- Sintaxis antiga 
     <app-vivienda  *ngFor="let v of viviendasList" 
          [vivienda]="v">

    </app-vivienda>
--> 

    </section>
  `,
  styleUrls: ['./viviendas.component.css'],
})

export class ViviendasComponent {
   
   readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';

  showHello: boolean = true;
  viviendasList: HousingLocation[] = [];
  
  servicioViviendas = inject(ViviendasService);
router: Router = inject(Router);

  constructor() {
    this.viviendasList = this.servicioViviendas.GetAll();

    // this.viviendasList = inject(ViviendasService).GetAll();
  }

  NuevaVivienda(){
     this.router.navigate(['/EditViv']);   
  } 
  
}
