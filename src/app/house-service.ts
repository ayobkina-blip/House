import { Injectable } from '@angular/core';
import { HouseInterface } from './house-interface';

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


}
