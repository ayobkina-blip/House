import { Injectable, inject } from '@angular/core';
import { HousingLocation } from '../interfaces/housinglocation';
import { MessagesService } from './messages.service';


@Injectable({
  providedIn: 'root'
})
export class HousingService {

  messageService: MessagesService = inject(MessagesService);

  constructor() { }

  url ="http://localhost:8080/dwc/angular/Viv-vec/src/api/api.php/locations";
  async getAllHousingLocations(): Promise<HousingLocation[]> {
    const data = await fetch(this.url, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    });
    return await data.json() ?? [];
  }
  
  async getHousingLocationById(id: number): Promise<any | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? {};
  }

  async delete(id: number) : Promise<string> {
    const respuesta = await fetch(`${this.url}/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    });
    console.log("Respuesta:",respuesta);
    return await respuesta.text() ?? "";
  }

  async update(location:HousingLocation) : Promise<string> {
    const respuesta = await fetch(`${this.url}/${location.id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(location)
    });    
    
    return await respuesta.text() ?? "";
  }

  async save(location:HousingLocation) : Promise<string> {
    const respuesta = await fetch(`${this.url}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(location)
    });
    return await respuesta.text() ?? "";
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(`Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`);
  }

}
