import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from "../housing-location/housing-location.component";
import { HousingService } from '../services/housing.service';
import { HousingLocation } from '../interfaces/housinglocation';
import { Router } from '@angular/router';
import { MessagesComponent } from "../messages/messages.component";


@Component({
    selector: 'app-home',
    standalone: true,
    template: `
  <section>
    <form>
      <input type="text" placeholder="Filter by city" #filter>
      <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      &nbsp;
      <button class="primary" type="button" (click)="Nuevo()">Nuevo</button>
    </form>
  </section>
  <section>
   <!-- <app-messages></app-messages>  -->
  </section>
  <section class="results">
    @for (housingLocation of filteredLocationList; track housingLocation.id) {
      <app-housing-location
        [housingLocation]="housingLocation">
      </app-housing-location>
    }
  </section>

  `,
    styleUrl: './home.component.css',
    imports: [CommonModule, HousingLocationComponent, MessagesComponent]
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  filteredLocationList: HousingLocation[] = [];
   

  baseUrl = "https://angular.io/assets/images/tutorials/faa/";

  constructor( private router: Router) {
    this.housingService.getAllHousingLocations().then((datos: any) => {
    //  console.log(datos.locations.records);
      var locations=datos.locations.records;
      for (var i = 0; i < locations.length; i++) {
        var nlocation = {id:locations[i][0],
          name: locations[i][1],
          city: locations[i][2],
          state: locations[i][3],
          photo: this.baseUrl+locations[i][4],
          availableUnits: locations[i][5],
          wifi: locations[i][6],
          laundry: locations[i][7]
        };
        this.housingLocationList.push(nlocation);
      }
      this.filteredLocationList = this.housingLocationList;
      //console.log (this.housingLocationList);
    });

  } 

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }
  
    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }
  
  Nuevo() {
    this.router.navigate(['/Nuevo']);
  }

}
