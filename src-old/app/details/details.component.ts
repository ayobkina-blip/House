import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HousingService } from '../services/housing.service';
import { HousingLocation } from '../interfaces/housinglocation';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Vecinos } from '../interfaces/vecinos';
import { VecinosService } from '../services/vecinos.service';
import { MessagesService } from '../services/messages.service';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article>
      <img class="listing-photo" [src]="housingLocation.photo"
        alt="Exterior photo of {{housingLocation.name}}"/>
      <section class="listing-description">
        <h2 class="listing-heading">{{housingLocation.name}}</h2>
        <p class="listing-location">{{housingLocation.city}}, {{housingLocation.state}}</p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Units available: {{housingLocation.availableUnits}}</li>
          <li>Does this location have wifi: {{housingLocation.wifi}}</li>
          <li>Does this location have laundry: {{housingLocation.laundry}}</li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">First Name</label>
          <input id="first-name" type="text" formControlName="firstName">

          <label for="last-name">Last Name</label>
          <input id="last-name" type="text" formControlName="lastName">

          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email">
          <button type="submit" class="primary">Apply now</button>
        </form>
      </section>
    </article>
  `,
  styleUrl: './details.component.css'
})

export class DetailsComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation = {
    id: 0,
    name: "",
    city: "",
    state: "",
    photo: "",availableUnits: 0, wifi: false,
    laundry:false
  };
  housingLocationId:number =0;
  foto:string="";
  vecino: Vecinos = { id: 0 ,idlocation:0,nombre:'',apellido:'', email:''};
  vecinosService = inject(VecinosService);
  messagesService = inject(MessagesService);
  router: Router = inject(Router);

  
  baseUrl = "https://angular.io/assets/images/tutorials/faa/";

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  });

  constructor() {
    this.housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingService.getHousingLocationById(this.housingLocationId).then( datos => {
    console.log(datos); // ahora ya es un json lo que devuelve. No hay que convertirlo casi
    this.foto=datos.photo;
    datos.photo = this.baseUrl+datos.photo;
    this.housingLocation = datos;
    });
    }

  submitApplication() { // Añadir 
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );

    // Crea el vecino nuevo !!
    this.vecino={ id: 0 ,  
      idlocation:this.housingLocationId,
      nombre: this.applyForm.value.firstName ?? '',
      apellido: this.applyForm.value.lastName ?? '',
      email: this.applyForm.value.email ?? ''}

    this.vecinosService.save(this.vecino).then(rdo=>{

      this.housingLocation.availableUnits -= 1;
      var urlfoto= this.housingLocation.photo;
      this.housingLocation.photo = this.foto;
      this.housingService.update(this.housingLocation);
      this.housingLocation.photo = urlfoto;

      console.log("Añadir fila en la tabla Vecinos, respuesta SQL (id de la fila):",rdo);
      this.messagesService.add('Añadir fila en tabla vecinos, resp SQL (id de la fila): '+rdo);
      this.router.navigate(['/home']);
    }); 

  }
}