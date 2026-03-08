import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HouseService } from '../house-service';
import { VecinoInterface } from '../vecino-interface';
import { HouseInterface } from '../house-interface';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-ver-vecinos',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './ver-vecinos.html',
  styleUrl: './ver-vecinos.css',
})
export class VerVecinos {

  route = inject(ActivatedRoute);
  router = inject(Router);
  service = inject(HouseService);
  cd = inject(ChangeDetectorRef);
  
  id = this.route.snapshot.params['id'];
  casa: HouseInterface | null = null;
  vecinos: VecinoInterface[] = [];
  showAddForm = false;

  nuevoVecino: VecinoInterface = {
    id: 0,
    idlocation: this.id,
    nombre: '',
    apellido: '',
    email: ''
  };

  // Propiedades para eliminación por dominio
  dominioCorreo: string = '';
  eliminando: boolean = false;

  ngOnInit() {
    this.loadHouseData();
    this.loadVecinos();
  }

  loadHouseData() {
    this.service.getOneHouse(this.id).then(data => {
      this.casa = data;
      this.cd.detectChanges();
    });
  }

  loadVecinos() {
    // console.log('Loading neighbors for house ID:', this.id);
    this.service.getVecinosByHouse(this.id).then(data => {
      // console.log('Neighbors received:', data);
      this.vecinos = data;
      this.cd.detectChanges();
    }).catch(error => {
      // console.error('Error loading vecinos:', error);
      this.vecinos = [];
      this.cd.detectChanges();
    });
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
    this.resetForm();
  }

  resetForm() {
    this.nuevoVecino = {
      id: 0,
      idlocation: this.id,
      nombre: '',
      apellido: '',
      email: ''
    };
  }

  guardarVecino() {
    this.service.addVecino(this.nuevoVecino).then(() => {
      // Disminuir unidades disponibles de la casa
      if (this.casa && this.casa.availableUnits > 0) {
        this.casa.availableUnits -= 1;
        this.service.updateHouse(this.casa.id, this.casa).then(() => {
          this.loadHouseData();
        });
      }
      
      this.loadVecinos();
      this.showAddForm = false;
      this.resetForm();
    });
  }

  eliminarVecino(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este vecino?')) {
      this.service.deleteVecino(id).then(() => {
        // Actualizar unidades disponibles de la casa
        if (this.casa) {
          this.casa.availableUnits += 1;
          this.service.updateHouse(this.casa.id, this.casa).then(() => {
            this.loadHouseData();
          });
        }
        this.loadVecinos();
      });
    }
  }

  cancelar() {
    this.showAddForm = false;
    this.resetForm();
  }

  eliminarPorDominio() {
    if (!this.dominioCorreo.trim()) {
      return;
    }

    const vecinosAEliminar = this.vecinos.filter(vecino => 
      vecino.email.includes(this.dominioCorreo.trim())
    );

    if (vecinosAEliminar.length === 0) {
      return;
    }

    this.eliminando = true;

    // Eliminar cada vecino encontrado
    const promesasEliminacion = vecinosAEliminar.map(vecino => {
      return this.service.deleteVecino(vecino.id);
    });

    Promise.all(promesasEliminacion).then(() => {
      // Actualizar unidades disponibles de la casa
      if (this.casa) {
        this.casa.availableUnits += vecinosAEliminar.length;
        this.service.updateHouse(this.casa.id, this.casa).then(() => {
          this.loadHouseData();
        });
      }
      
      this.eliminando = false;
      this.dominioCorreo = '';
      
      // Recargar lista de vecinos
      this.loadVecinos();
    })
  }

  volver() {
    this.router.navigate(['/casas']);
  }
}
