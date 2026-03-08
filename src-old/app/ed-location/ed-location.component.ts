import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HousingService } from '../services/housing.service';
import { MessagesService } from '../services/messages.service';

@Component({
    selector: 'app-ed-location',
    standalone: true,
    templateUrl: './ed-location.component.html',
    styleUrl: './ed-location.component.css',
    imports: [CommonModule, FormsModule]
})
export class EdLocationComponent {
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  housingService: HousingService = inject(HousingService);

  messageService: MessagesService = inject(MessagesService);
  
  router: Router = inject(Router);
  location: any = {};
  //location: HousingLocation | undefined;
  NuevaLocation: boolean;  

  baseUrl = "https://angular.io/assets/images/tutorials/faa/";

  constructor(private route: ActivatedRoute) {
    this.NuevaLocation = false;
  
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    if (housingLocationId) {
      this.housingService.getHousingLocationById(housingLocationId).then( datos => {

       //datos.photo = this.baseUrl+datos.photo;
       this.location = datos;
      });
    } else {
      this.NuevaLocation = true;
    }

  }

  EnviarDatos() {    
    if (this.NuevaLocation) {
          this.housingService.save(this.location).then(rdo=>{
            console.log("Añadir fila en la tabla vivienda, respuesta SQL:",rdo);
            this.messageService.add('Añadir fila en la tabla vivienda, respuesta SQL: '+rdo);
          }); 
    } else {
          this.housingService.update(this.location).then(rdo=>{
            console.log("Update de la vivienda,respuesta MYSQL",rdo);
            this.messageService.add('Update de la vivienda, respuesta SQL: '+rdo);
          });
    }
    this.router.navigate(['/home']);
  }
}
