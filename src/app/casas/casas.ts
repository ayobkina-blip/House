import { Component, inject } from '@angular/core';
import { HouseService } from '../house-service';
import { HouseInterface } from '../house-interface';

@Component({
  selector: 'app-casas',
  imports: [],
  templateUrl: './casas.html',
  styleUrl: './casas.css',
})
export class Casas {

  service  = inject(HouseService);
  casas:HouseInterface[] = [];

  ngOnInit(){
    this.service.getAllHouse().then(datos => {
      this.casas = datos;
    })
    
  }
  

}
