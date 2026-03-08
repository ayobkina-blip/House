import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HouseService } from '../house-service';
import { VecinoInterface } from '../vecino-interface';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-detalles-vecino',
  imports: [FormsModule, CommonModule],
  templateUrl: './detalles-vecino.html',
  styleUrl: './detalles-vecino.css',
})
export class DetallesVecino {

  route = inject(ActivatedRoute);
  router = inject(Router);
  service = inject(HouseService);
  cd = inject(ChangeDetectorRef);
  isEditMode = false;
  vecino:VecinoInterface = {
    id:0,
    idlocation:0,
    nombre:"",
    apellido:"",
    email:""
  }

  ngOnInit(){
    const id = this.route.snapshot.params['id'];
    
    if (id && id !== 'nuevo') {
      this.isEditMode = true;
      this.service.getOneVecino(id).then(data => {
        this.vecino = data;
        this.cd.detectChanges();
      })
    } else {
      // Create mode - set default idlocation from route if available
      this.vecino.idlocation = parseInt(id) || 0;
    }
  }
  
  guardar(){
    if (this.isEditMode) {
      this.service.updateVecino(this.vecino.id, this.vecino).then(() => {
        this.router.navigate(['/ver-vecinos', this.vecino.idlocation]);
      });
    } else {
      this.service.addVecino(this.vecino).then(() => {
        this.router.navigate(['/ver-vecinos', this.vecino.idlocation]);
      });
    }
  }

  cancelar(){
    if (this.isEditMode) {
      this.router.navigate(['/ver-vecinos', this.vecino.idlocation]);
    } else {
      this.router.navigate(['/ver-vecinos', this.vecino.idlocation]);
    }
  }

}
