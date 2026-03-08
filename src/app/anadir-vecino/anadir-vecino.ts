import {  Component, inject } from '@angular/core';
import { HouseService } from '../house-service';
import { ActivatedRoute, Router } from '@angular/router';
import { VecinoInterface } from '../vecino-interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-anadir-vecino',
  imports: [FormsModule],
  templateUrl: './anadir-vecino.html',
  styleUrl: './anadir-vecino.css',
})
export class AnadirVecino {

  service = inject(HouseService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  id = this.route.snapshot.params['id'];

  vecino:VecinoInterface = {
    id:0,
    idlocation:this.id,
    nombre:"",
    apellido:"",
    email:""
  }

  guardar(){
    this.service.addVecino(this.vecino).then(() => {
      this.router.navigate(['/casas']);
    });
  }

  cancelar(){
    this.router.navigate(['/casas']);
  }



}
