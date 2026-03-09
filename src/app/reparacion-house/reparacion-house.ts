import { Component, inject, Output, output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HouseService } from '../house-service';
import { ReparacionInterface } from '../reparacion-interface';
import { HouseInterface } from '../house-interface';
import { ChangeDetectorRef } from '@angular/core';
import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-reparacion-house',
  imports: [CommonModule, FormsModule],
  templateUrl: './reparacion-house.html',
  styleUrl: './reparacion-house.css',
})
export class ReparacionHouse {

  route = inject(ActivatedRoute);
  router = inject(Router);
  service = inject(HouseService);
  cd = inject(ChangeDetectorRef);
  
  //id = this.route.snapshot.params['id'];
  
  @Input() id: number = 0;
  @Output() calculado = new EventEmitter<boolean>();

  casa: HouseInterface | null = null;
  reparaciones: ReparacionInterface[] = [];
  showAddForm = false;

  

  // Propiedades para edición masiva universal
  nuevaFechaUniversal: string = '';
  nuevoPrecioUniversal: number = 0;
  editandoMasivamente: boolean = false;

  ngOnInit() {
    this.loadReparaciones();
  }

  loadReparaciones() {
    this.service.getReparacionesByHouse(this.id).then(data => {
      this.reparaciones = data.sort((a: ReparacionInterface, b: ReparacionInterface) => 
        new Date(b.Fecha).getTime() - new Date(a.Fecha).getTime()
      );
      this.cd.detectChanges();
    });
  }

  incrementar() {
    const reparacionesAEliminar = this.reparaciones.filter(reparacion => 
      reparacion.Precio > 1000
    );

    if (this.nuevoPrecioUniversal <= 0 || reparacionesAEliminar.length === 0) {
      return;
    }

    if (confirm(`¿Estás seguro de que quieres cambiar el precio de ${reparacionesAEliminar.length} reparaciones a ${this.nuevoPrecioUniversal}€ mas?`)) {
      this.editandoMasivamente = true;
      
      const promesasEdicion = reparacionesAEliminar.map(reparacion => {
        const reparacionActualizada = { ...reparacion, Precio: reparacion.Precio +this.nuevoPrecioUniversal };
        return this.service.updateReparacion(reparacion.id, reparacionActualizada);
      });



      Promise.all(promesasEdicion).then(() => {
        this.editandoMasivamente = false;
        this.nuevoPrecioUniversal = 0;
        this.loadReparaciones();
        this.calculado.emit(true);
        
      }).catch(() => {
        this.editandoMasivamente = false;
      });
    }
  }
}
