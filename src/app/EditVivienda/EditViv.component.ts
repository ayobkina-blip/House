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
       <img class="listing-photo" [src]="vivienda?.photo" alt="Exterior photo of {{vivienda?.name}}">
     
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        
          <label for="id">id</label>
          <input  id="id" [(ngModel)]="vivienda.id" class="form-control" type="text" >

          <label for="name">Nombre vivienda</label>
          <input id="name" [(ngModel)]="vivienda.name" class="form-control" type="text" >

          <label for="ciudad">Ciudad</label>
          <input id="ciudad" type="email"  [(ngModel)]="vivienda.city" class="form-control" >

          <button type="button"  (click)="Guardar()" class="primary">Guardar</button>

        
      </section>

    </article>
  `,
  styleUrls: ['./EditViv.component.css'],
})
export class EditVivComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  viviendasService = inject(ViviendasService);
  // vivienda: HousingLocation | undefined;
  vivienda: HousingLocation ={  id:0,  name: "",  city: "",  state: "",  photo: "",  availableUnits: 0,  wifi: false,  laundry: false};
  

  IdVivienda: number = -1;
 router: Router = inject(Router);

  constructor() {
     this.IdVivienda = parseInt(this.route.snapshot.params['id'], 10);
     if (this.IdVivienda) {      
        this.vivienda= this.viviendasService.GetOne(this.IdVivienda);
     }
    
     console.log(this.vivienda);

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

  Guardar(){

     if ( parseInt(this.route.snapshot.params['id'], 10)) {
        this.viviendasService.Modificar(this.vivienda);
    // Refrescar la página o navegar a la lista de viviendas después de eliminar
      } else {  
        this.viviendasService.Nueva(this.vivienda);
      }
      this.router.navigate(['/']);
  } 

}
