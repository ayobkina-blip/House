import { Component, inject } from '@angular/core';
import { HouseService } from '../house-service';
import { HouseInterface } from '../house-interface';
import { ChangeDetectorRef } from '@angular/core';
import { Casa } from '../casa/casa';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-casas',
  imports: [Casa, RouterLink, FormsModule],
  templateUrl: './casas.html',
  styleUrl: './casas.css',
})
export class Casas {

  service  = inject(HouseService);
  cr = inject(ChangeDetectorRef);
  casas:HouseInterface[] = [];
  casasFiltradas:HouseInterface[] = [];
  filterText: string = '';

  ngOnInit(){
    this.service.getAllHouse().then(datos => {
    this.casas = datos;
    this.casasFiltradas = datos;
    
    this.cr.detectChanges();
      
    })
  }

  eliminarDeLista(id: number) {
    this.casas = this.casas.filter(casa => casa.id !== id);
    this.filterCasas();
  }

  onFilterChange() {
    this.filterCasas();
  }

  filterCasas() {
    if (!this.filterText.trim()) {
      this.casasFiltradas = [...this.casas];
    } else {
      this.casasFiltradas = this.casas.filter(casa => 
        casa.city.toLowerCase().includes(this.filterText.toLowerCase())
      );
    }
  }

  agregarCasaDuplicada(casa: HouseInterface) {
    this.casas.unshift(casa);
    this.filterCasas();
    this.cr.detectChanges();
  }
  
  

}
