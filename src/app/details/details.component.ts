import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
/*
import { HousingService } from '../housing.service';*/
import { HousingLocation } from '../housinglocation';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule   
  ],
  template: `
    <article>
      <img class="listing-photo" [src]="housingLocation?.photo"
        alt="Exterior photo of {{housingLocation?.name}}"/>
      <section class="listing-description">
        <h2 class="listing-heading">{{housingLocation?.name}}</h2>
        <p class="listing-location">{{housingLocation?.city}}, {{housingLocation?.state}}</p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Units available: {{housingLocation?.availableUnits}}</li>
          <li>Does this location have wifi: {{housingLocation?.wifi}}</li>
          <li>Does this location have laundry: {{housingLocation?.laundry}}</li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
       <!-- <form  (submit)="submitApplication()"> -->
          <label for="first-name">First Name</label>
          <input id="first-name" [(ngModel)]="a" class="form-control" type="text" >

          <label for="last-name">Last Name</label>
          <input id="last-name" [(ngModel)]="b" class="form-control" type="text" >

          <label for="email">Email</label>
          <input id="email" type="email"  [(ngModel)]="c" class="form-control" >
          <!--
          <button type="button"  (click)="submitApplication()" class="primary">Apply now</button>-->

          <!--</form>-->
      </section>
    </article>
  `,
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  /*
  housingService = inject(HousingService);*/
  housingLocation: HousingLocation | undefined;

  a="pepito";
  b="";
  c="";
 
/*
  constructor() {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingLocation = this.housingService.getHousingLocationById(housingLocationId);
  }

  submitApplication() {
    this.housingService.submitApplication(this.a,this.b,this.c);   
  
  }*/
}
