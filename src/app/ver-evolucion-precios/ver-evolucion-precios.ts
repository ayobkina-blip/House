import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HouseService } from '../house-service';
import { EvolucionPreciosInterface } from '../evolucion-precios-interface';
import { HouseInterface } from '../house-interface';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-ver-evolucion-precios',
  imports: [CommonModule, FormsModule],
  templateUrl: './ver-evolucion-precios.html',
  styleUrl: './ver-evolucion-precios.css',
})
export class VerEvolucionPrecios {

  route = inject(ActivatedRoute);
  router = inject(Router);
  service = inject(HouseService);
  cd = inject(ChangeDetectorRef);
  
  id = this.route.snapshot.params['id'];
  casa: HouseInterface | null = null;
  evolucionPrecios: EvolucionPreciosInterface[] = [];
  showAddForm = false;

  nuevaEvolucion: EvolucionPreciosInterface = {
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
    this.loadEvolucionPrecios();
  }

  loadHouseData() {
    this.service.getOneHouse(this.id).then(data => {
      this.casa = data;
      this.cd.detectChanges();
    });
  }

  loadEvolucionPrecios() {
    this.service.getEvolucionPreciosByHouse(this.id).then(data => {
      this.evolucionPrecios = data.sort((a: EvolucionPreciosInterface, b: EvolucionPreciosInterface) => 
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
    this.nuevaEvolucion = {
      id: 0,
      id_vivienda: this.id,
      Fecha: '',
      Precio: 0
    };
  }

  guardarEvolucion() {
    if (!this.nuevaEvolucion.Fecha || this.nuevaEvolucion.Precio <= 0) {
      return;
    }

    this.service.addEvolucionPrecio(this.nuevaEvolucion).then(() => {
      this.loadEvolucionPrecios();
      this.showAddForm = false;
      this.resetForm();
    });
  }

  eliminarEvolucion(id: number) {
    this.service.deleteEvolucionPrecio(id).then(() => {
      this.loadEvolucionPrecios();
    });
  }

  cancelar() {
    this.showAddForm = false;
    this.resetForm();
  }

  getCurrentPrice(): number {
    if (this.evolucionPrecios.length === 0) return 0;
    const sortedByDate = [...this.evolucionPrecios].sort((a, b) => 
      new Date(b.Fecha).getTime() - new Date(a.Fecha).getTime()
    );
    return sortedByDate[0].Precio;
  }

  getPriceVariation(): { amount: number } {
    if (this.evolucionPrecios.length < 2) {
      return { amount: 0 };
    }
    
    const sortedByDate = [...this.evolucionPrecios].sort((a, b) => 
      new Date(a.Fecha).getTime() - new Date(b.Fecha).getTime()
    );
    
    const firstPrice = sortedByDate[0].Precio;
    const currentPrice = this.getCurrentPrice();
    
    const amount = currentPrice - firstPrice;
    
    return { amount };
  }

  volver() {
    this.router.navigate(['/detalles-casa', this.id]);
  }

  // Métodos para edición masiva universal
  editarFechaMasiva() {
    if (!this.nuevaFechaUniversal || this.evolucionPrecios.length === 0) {
      return;
    }

    if (confirm(`¿Estás seguro de que quieres cambiar la fecha de TODOS (${this.evolucionPrecios.length}) registros a ${this.nuevaFechaUniversal}?`)) {
      this.editandoMasivamente = true;
      
      const promesasEdicion = this.evolucionPrecios.map(evolucion => {
        const evolucionActualizada = { ...evolucion, Fecha: this.nuevaFechaUniversal };
        return this.service.updateEvolucionPrecio(evolucion.id, evolucionActualizada);
      });

      Promise.all(promesasEdicion).then(() => {
        this.editandoMasivamente = false;
        this.nuevaFechaUniversal = '';
        this.loadEvolucionPrecios();
      }).catch(() => {
        this.editandoMasivamente = false;
      });
    }
  }

  editarPrecioMasivo() {
    if (this.nuevoPrecioUniversal <= 0 || this.evolucionPrecios.length === 0) {
      return;
    }

    if (confirm(`¿Estás seguro de que quieres cambiar el precio de TODOS (${this.evolucionPrecios.length}) registros a €${this.nuevoPrecioUniversal}?`)) {
      this.editandoMasivamente = true;
      
      const promesasEdicion = this.evolucionPrecios.map(evolucion => {
        const evolucionActualizada = { ...evolucion, Precio: this.nuevoPrecioUniversal };
        return this.service.updateEvolucionPrecio(evolucion.id, evolucionActualizada);
      });

      Promise.all(promesasEdicion).then(() => {
        this.editandoMasivamente = false;
        this.nuevoPrecioUniversal = 0;
        this.loadEvolucionPrecios();
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

    const preciosAEliminar = this.evolucionPrecios.filter(evolucion => 
      evolucion.Precio >= this.precioMin && evolucion.Precio <= this.precioMax
    );

    if (preciosAEliminar.length === 0) {
      return;
    }

    if (confirm(`¿Estás seguro de que quieres eliminar ${preciosAEliminar.length} registros por rango de precios (${this.precioMin}€ - ${this.precioMax}€)?`)) {
      this.eliminandoPorRango = true;
      
      const promesasEliminacion = preciosAEliminar.map(evolucion => {
        return this.service.deleteEvolucionPrecio(evolucion.id);
      });

      Promise.all(promesasEliminacion).then(() => {
        this.eliminandoPorRango = false;
        this.precioMin = 0;
        this.precioMax = 0;
        this.loadEvolucionPrecios();
      }).catch(() => {
        this.eliminandoPorRango = false;
      });
    }
  }

  eliminarPorRangoFechas() {
    if (!this.fechaInicio || !this.fechaFin || new Date(this.fechaInicio) > new Date(this.fechaFin)) {
      return;
    }

    const preciosAEliminar = this.evolucionPrecios.filter(evolucion => {
      const fechaPrecio = new Date(evolucion.Fecha);
      return fechaPrecio >= new Date(this.fechaInicio) && fechaPrecio <= new Date(this.fechaFin);
    });

    if (preciosAEliminar.length === 0) {
      return;
    }

    if (confirm(`¿Estás seguro de que quieres eliminar ${preciosAEliminar.length} registros del ${this.fechaInicio} al ${this.fechaFin}?`)) {
      this.eliminandoPorRango = true;
      
      const promesasEliminacion = preciosAEliminar.map(evolucion => {
        return this.service.deleteEvolucionPrecio(evolucion.id);
      });

      Promise.all(promesasEliminacion).then(() => {
        this.eliminandoPorRango = false;
        this.fechaInicio = '';
        this.fechaFin = '';
        this.loadEvolucionPrecios();
      }).catch(() => {
        this.eliminandoPorRango = false;
      });
    }
  }
}
