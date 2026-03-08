import { Injectable } from '@angular/core';
import { HouseInterface } from './house-interface';
import { VecinoInterface } from './vecino-interface';
import { ReparacionInterface } from './reparacion-interface';
import { EvolucionPreciosInterface } from './evolucion-precios-interface';

@Injectable({
  providedIn: 'root',
})
export class HouseService {
  ruta = "http://localhost/House/api.php";
  arrayCasas:HouseInterface[] = [];
  getAllHouse(){
    return fetch(this.ruta+"/locations")
    .then(response => response.json())
    .then(response => {
      const data  = response.locations.records;
      
      return data.map((casa: any):HouseInterface => ({
        id: casa[0],
        name: casa[1],
        city: casa[2],
        state: casa[3],
        photo: casa[4],
        availableUnits: casa[5],
        wifi: casa[6],
        laundry: casa[7],
        rating: casa[8]
      }));
    })
  
  }

  getOneHouse(id:number){
    return fetch(this.ruta+"/locations/"+id)
    .then(response => response.json())
    .then(response => {
      const casa = response;
      return casa;
    })
  }

  deleteHouse(id:number){
    return fetch(this.ruta+"/locations/"+id, {
      method:"delete"
    })
  }

  updateHouse(id:number, casa:HouseInterface){
    return fetch(this.ruta+"/locations/"+id, {
      method:"PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(casa)
    })
  }

  addVecino(vecino:VecinoInterface){
    return fetch(this.ruta+"/vecinos", {
      method:"POST", 
      headers:{ "Content-Type": "application/json" },
      body: JSON.stringify(vecino)
    })
  }

  addHouse(casa:HouseInterface){
    return fetch(this.ruta+"/locations", {
      method:"POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(casa)
    })
  }

  duplicateHouse(id:number){
    return this.getOneHouse(id).then(casa => {
      const nuevaCasa = { 
        ...casa, 
        name: casa.name + ' - Copia',
        id: 0
      };
      return this.addHouse(nuevaCasa).then(response => response.json()).then(data => {
        // Transformar la respuesta a HouseInterface
        return {
          id: data.id || 0,
          name: data.name || nuevaCasa.name,
          city: data.city || casa.city,
          state: data.state || casa.state,
          photo: data.photo || casa.photo,
          availableUnits: data.availableUnits || casa.availableUnits,
          wifi: data.wifi || casa.wifi,
          laundry: data.laundry || casa.laundry,
          rating: data.rating || casa.rating
        };
      });
    })
  }

  getVecinosByHouse(id:number){
    return fetch(this.ruta+"/vecinos?filter=idlocation,eq,"+id)
    .then(response => response.json())
    .then(response => {

      let data = [];
      data = response.vecinos.records;
      
      
      return data.map((vecino: any):VecinoInterface => ({
        id: vecino[0],
        idlocation: vecino[1],
        nombre: vecino[2],
        apellido: vecino[3],
        email: vecino[4]
      }));
    })
  }

  getOneVecino(id:number){
    return fetch(this.ruta+"/vecinos/"+id)
    .then(response => response.json())
    .then(response => {
      const vecino = response;
      return vecino;
    })
  }

  deleteVecino(id:number){
    return fetch(this.ruta+"/vecinos/"+id, {
      method:"DELETE"
    })
  }

  updateVecino(id:number, vecino:VecinoInterface){
    return fetch(this.ruta+"/vecinos/"+id, {
      method:"PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(vecino)
    })
  }

  getReparacionesByHouse(id:number){
    return fetch(this.ruta+"/reparaciones?filter=id_vivienda,eq,"+id)
    .then(response => response.json())
    .then(response => {

      let data = [];
      data = response.reparaciones.records;
      
      
      return data.map((reparacion: any):ReparacionInterface => ({
        id: reparacion[0],
        id_vivienda: reparacion[1],
        Fecha: reparacion[2],
        Precio: parseFloat(reparacion[3])
      }));
    })
  }

  addReparacion(reparacion:ReparacionInterface){
    return fetch(this.ruta+"/reparaciones", {
      method:"POST", 
      headers:{ "Content-Type": "application/json" },
      body: JSON.stringify(reparacion)
    })
  }

  deleteReparacion(id:number){
    return fetch(this.ruta+"/reparaciones/"+id, {
      method:"DELETE"
    })
  }

  updateReparacion(id:number, reparacion:ReparacionInterface){
    return fetch(this.ruta+"/reparaciones/"+id, {
      method:"PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reparacion)
    })
  }

  getEvolucionPreciosByHouse(id:number){
    return fetch(this.ruta+"/evo_precios_viv?filter=id_vivienda,eq,"+id)
    .then(response => response.json())
    .then(response => {

      let data = [];
      data = response.evo_precios_viv.records;
      
      
      return data.map((evolucion: any):EvolucionPreciosInterface => ({
        id: evolucion[0],
        id_vivienda: evolucion[1],
        Fecha: evolucion[2],
        Precio: parseFloat(evolucion[3])
      }));
    })
  }

  addEvolucionPrecio(evolucion:EvolucionPreciosInterface){
    return fetch(this.ruta+"/evo_precios_viv", {
      method:"POST", 
      headers:{ "Content-Type": "application/json" },
      body: JSON.stringify(evolucion)
    })
  }

  deleteEvolucionPrecio(id:number){
    return fetch(this.ruta+"/evo_precios_viv/"+id, {
      method:"DELETE"
    })
  }

  updateEvolucionPrecio(id:number, evolucion:EvolucionPreciosInterface){
    return fetch(this.ruta+"/evo_precios_viv/"+id, {
      method:"PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(evolucion)
    })
  }


}
