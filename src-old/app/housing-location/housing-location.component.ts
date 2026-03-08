import { ChangeDetectorRef, Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocation } from '../interfaces/housinglocation';
import { Router, RouterModule } from '@angular/router';
import { HousingService } from '../services/housing.service';
import { vecinosComponent } from "../vecinos/vecinos.component";


@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [CommonModule, RouterModule, vecinosComponent],
  template: `
  <section class="listing">
    <img class="listing-photo" [src]="housingLocation.photo" alt="Exterior photo of {{housingLocation.name}}">
    <h2 class="listing-heading">{{ housingLocation.name }}</h2>
    <p class="listing-location">{{ housingLocation.city}}, {{housingLocation.state }}</p> 
    &nbsp;
    <button class="primary" type="button" [routerLink]="['/details', housingLocation.id]">añadir vecino</button>
    &nbsp;
    <button class="primary" type="button" (click)="deleteLocation(housingLocation.id)">Delete</button>
    &nbsp;
    <button class="primary" type="button"
     [routerLink]="['/Editar', housingLocation.id]">Editar</button>
     &nbsp;
    <!--<button class="primary" type="button" [routerLink]="['/VerVecinos', housingLocation.id]">Ver vecinos</button> -->
    <br><br>
  Total de vecinos eliminados en esta sesión: {{VecinosEliminados}}
  <br><br>
    <lista-vecinos [Id]='housingLocation.id' (EliminarFamClicked)='EliminarFam($event)' > </lista-vecinos>
   </section>
`,
  styleUrl: './housing-location.component.css'
})
export class HousingLocationComponent {
  @Input() housingLocation!: HousingLocation;
  housingService: HousingService = inject(HousingService);

  VecinosEliminados=0;
    private cdr=inject(ChangeDetectorRef);

  constructor(private router: Router) { }
  
  deleteLocation(id : number) {
    rdo:Number;

    this.housingService.delete(id);
    this.router.navigate(['/home']);

  }

  EliminarFam(eliminados:number){
    this.VecinosEliminados+=eliminados;
    this.cdr.markForCheck();
    //let currentUrl = this.router.url;
    //this.router.navigate([currentUrl, { "refresh": (new Date).getTime() }] );
  }

}
