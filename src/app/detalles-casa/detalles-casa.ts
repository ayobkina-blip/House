import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HouseService } from '../house-service';
import { HouseInterface } from '../house-interface';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-detalles-casa',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './detalles-casa.html',
  styleUrl: './detalles-casa.css',
})
export class DetallesCasa {

  route = inject(ActivatedRoute);
  router = inject(Router);
  service = inject(HouseService);
  cd = inject(ChangeDetectorRef);
  isEditMode = false;
  casa:HouseInterface = {
    id:0,
    name:"",
    city:"",
    state:"",
    photo:"",
    availableUnits:0,
    wifi:0,
    laundry:0,
    rating:0
  }


  ngOnInit(){
    const id = this.route.snapshot.params['id'];
    
    if (id) {
      this.isEditMode = true;
      this.service.getOneHouse(id).then(data => {
        this.casa = data;
        this.cd.detectChanges();
      })
    }
  }
  
  guardar(){
    if (this.isEditMode) {
      this.service.updateHouse(this.casa.id, this.casa);
    } else {
      this.service.addHouse(this.casa).then(() => {
        this.router.navigate(['/casas']);
      });
    }
  }

  cancelar(){
    this.router.navigate(['/casas']);
  }

}
