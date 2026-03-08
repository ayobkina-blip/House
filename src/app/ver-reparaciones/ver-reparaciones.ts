import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HouseService } from '../house-service';
import { ReparacionInterface } from '../reparacion-interface';
import { HouseInterface } from '../house-interface';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-ver-reparaciones',
  imports: [CommonModule, FormsModule],
  templateUrl: './ver-reparaciones.html',
  styleUrl: './ver-reparaciones.css',
})
export class VerReparaciones {

  route = inject(ActivatedRoute);
  router = inject(Router);
  service = inject(HouseService);
  cd = inject(ChangeDetectorRef);
  
  id = this.route.snapshot.params['id'];
  casa: HouseInterface | null = null;
  reparaciones: ReparacionInterface[] = [];
  showAddForm = false;

  nuevaReparacion: ReparacionInterface = {
    id: 0,
    id_vivienda: this.id,
    Fecha: '',
    Precio: 0
  };

  // Propiedades para eliminación por rangos
  precioMin: number = 0;
  precioMax: number = 0;
  fechaInicio: string = '';
  fechaFin: string = '';
  eliminandoPorRango: boolean = false;

  // Propiedades para edición masiva universal
  nuevaFechaUniversal: string = '';
  nuevoPrecioUniversal: number = 0;
  editandoMasivamente: boolean = false;

  ngOnInit() {
    this.loadHouseData();
    this.loadReparaciones();
  }

  loadHouseData() {
    this.service.getOneHouse(this.id).then(data => {
      this.casa = data;
      this.cd.detectChanges();
    });
  }

  loadReparaciones() {
    this.service.getReparacionesByHouse(this.id).then(data => {
      this.reparaciones = data.sort((a: ReparacionInterface, b: ReparacionInterface) => 
        new Date(b.Fecha).getTime() - new Date(a.Fecha).getTime()
      );
      this.cd.detectChanges();
    });
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
    this.resetForm();
  }

  resetForm() {
    this.nuevaReparacion = {
      id: 0,
      id_vivienda: this.id,
      Fecha: '',
      Precio: 0
    };
  }

  guardarReparacion() {
    if (!this.nuevaReparacion.Fecha || this.nuevaReparacion.Precio <= 0) {
      return;
    }

    this.service.addReparacion(this.nuevaReparacion).then(() => {
      this.loadReparaciones();
      this.showAddForm = false;
      this.resetForm();
    });
  }

  eliminarReparacion(id: number) {
    this.service.deleteReparacion(id).then(() => {
      this.loadReparaciones();
    })
  }

  cancelar() {
    this.showAddForm = false;
    this.resetForm();
  }

  getTotalCost(): number {
    return this.reparaciones.reduce((total, reparacion) => total + reparacion.Precio, 0);
  }

  volver() {
    this.router.navigate(['/detalles-casa', this.id]);
  }

  // Métodos para edición masiva universal
  editarFechaMasiva() {
    if (!this.nuevaFechaUniversal || this.reparaciones.length === 0) {
      return;
    }

    if (confirm(`¿Estás seguro de que quieres cambiar la fecha de TODAS (${this.reparaciones.length}) reparaciones a ${this.nuevaFechaUniversal}?`)) {
      this.editandoMasivamente = true;
      
      const promesasEdicion = this.reparaciones.map(reparacion => {
        const reparacionActualizada = { ...reparacion, Fecha: this.nuevaFechaUniversal };
        return this.service.updateReparacion(reparacion.id, reparacionActualizada);
      });

      Promise.all(promesasEdicion).then(() => {
        this.editandoMasivamente = false;
        this.nuevaFechaUniversal = '';
        this.loadReparaciones();
      }).catch(() => {
        this.editandoMasivamente = false;
      });
    }
  }

  editarPrecioMasivo() {
    if (this.nuevoPrecioUniversal <= 0 || this.reparaciones.length === 0) {
      return;
    }

    if (confirm(`¿Estás seguro de que quieres cambiar el precio de TODAS (${this.reparaciones.length}) reparaciones a €${this.nuevoPrecioUniversal}?`)) {
      this.editandoMasivamente = true;
      
      const promesasEdicion = this.reparaciones.map(reparacion => {
        const reparacionActualizada = { ...reparacion, Precio: this.nuevoPrecioUniversal };
        return this.service.updateReparacion(reparacion.id, reparacionActualizada);
      });

      Promise.all(promesasEdicion).then(() => {
        this.editandoMasivamente = false;
        this.nuevoPrecioUniversal = 0;
        this.loadReparaciones();
      }).catch(() => {
        this.editandoMasivamente = false;
      });
    }
  }

  // Métodos para eliminación por rangos
  eliminarPorRangoPrecio() {
    if (this.precioMin < 0 || this.precioMax <= 0 || this.precioMin > this.precioMax) {
      return;
    }

    const reparacionesAEliminar = this.reparaciones.filter(reparacion => 
      reparacion.Precio >= this.precioMin && reparacion.Precio <= this.precioMax
    );

    if (reparacionesAEliminar.length === 0) {
      return;
    }

    if (confirm(`¿Estás seguro de que quieres eliminar ${reparacionesAEliminar.length} reparaciones por rango de precios (${this.precioMin}€ - ${this.precioMax}€)?`)) {
      this.eliminandoPorRango = true;
      
      const promesasEliminacion = reparacionesAEliminar.map(reparacion => {
        return this.service.deleteReparacion(reparacion.id);
      });

      Promise.all(promesasEliminacion).then(() => {
        this.eliminandoPorRango = false;
        this.precioMin = 0;
        this.precioMax = 0;
        this.loadReparaciones();
      }).catch(() => {
        this.eliminandoPorRango = false;
      });
    }
  }

  eliminarPorRangoFechas() {
    if (!this.fechaInicio || !this.fechaFin || new Date(this.fechaInicio) > new Date(this.fechaFin)) {
      return;
    }

    const reparacionesAEliminar = this.reparaciones.filter(reparacion => {
      const fechaReparacion = new Date(reparacion.Fecha);
      return fechaReparacion >= new Date(this.fechaInicio) && fechaReparacion <= new Date(this.fechaFin);
    });

    if (reparacionesAEliminar.length === 0) {
      return;
    }

    if (confirm(`¿Estás seguro de que quieres eliminar ${reparacionesAEliminar.length} reparaciones del ${this.fechaInicio} al ${this.fechaFin}?`)) {
      this.eliminandoPorRango = true;
      
      const promesasEliminacion = reparacionesAEliminar.map(reparacion => {
        return this.service.deleteReparacion(reparacion.id);
      });

      Promise.all(promesasEliminacion).then(() => {
        this.eliminandoPorRango = false;
        this.fechaInicio = '';
        this.fechaFin = '';
        this.loadReparaciones();
      }).catch(() => {
        this.eliminandoPorRango = false;
      });
    }
  }
}
