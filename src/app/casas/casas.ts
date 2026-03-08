import { Component, inject } from '@angular/core';
import { HouseService } from '../house-service';
import { HouseInterface } from '../house-interface';
import { ChangeDetectorRef } from '@angular/core';
import { Casa } from '../casa/casa';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-casas',
  imports: [Casa, RouterLink],
  templateUrl: './casas.html',
  styleUrl: './casas.css',
})
export class Casas {

  service  = inject(HouseService);
  cr = inject(ChangeDetectorRef);
  casas:HouseInterface[] = [];

  ngOnInit(){
    this.service.getAllHouse().then(datos => {
    this.casas = datos;
    
    this.cr.detectChanges();
      
    })
  }

  eliminarDeLista(id: number) {
    this.casas = this.casas.filter(casa => casa.id !== id);
  }
  
  

}
