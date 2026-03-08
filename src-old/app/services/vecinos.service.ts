import { Injectable } from '@angular/core';
import { Vecinos } from '../interfaces/vecinos';


@Injectable({
  providedIn: 'root'
})
export class VecinosService {

  constructor() { }

  url ="http://localhost:8080/dwc/angular/Viv-vec/src/api/api.php/vecinos";

  async save(vecinos:Vecinos) : Promise<string> {
    const respuesta = await fetch(`${this.url}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(vecinos)
    });
    return await respuesta.text() ?? "";
  }
  
  // Metodo 1 (devuelve promesa)  
  async getAll(): Promise<string> {

    const respuesta = await fetch(`${this.url}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      }      
    });
    return await respuesta.text() ?? "";
  }

  getAllbyId(idVivienda:number): Vecinos[] {

    var vecinos:Vecinos[]=[];
    
    fetch(`${this.url}/?filter[]=idlocation,eq,${idVivienda}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      }      
    })
    .then((response) => response.json())
    .then((ObjVecinos) => {
          var arrVecinos = ObjVecinos.vecinos.records;                   
          arrVecinos.forEach((item:any) => {
            
            var elem = {id:item[0],              
              idlocation:item[1],
              nombre: item[2],
              apellido: item[3],
              email:item[4]              
            };

            vecinos.push(elem);               
          });
          return vecinos;
     })
    return vecinos;
  }
   


  async delete(id: number): Promise<string> {
    const respuesta = await fetch(`${this.url}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await respuesta.text() ?? "";
  }


}
