import { ChangeDetectorRef, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HousingService } from '../services/housing.service';
import { HousingLocation } from '../interfaces/housinglocation';
import { Vecinos } from '../interfaces/vecinos';
import { VecinosService } from '../services/vecinos.service';
import { MessagesService } from '../services/messages.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'lista-vecinos',
  standalone: true,
  imports: [CommonModule,FormsModule],
  template: `
    <article>  

      <section class="listing-apply">

      @for (V of vecinosList; track V.id) {
          <tr>
              <td> {{V.nombre}}</td> <td> {{V.apellido}}</td> <td> {{V.email}}</td>
              <button class="primary" type="button" (click)="delete(V.id)">Delete</button>
          </tr>
      }
        
      </section>
      <section>        
        <br>
         Número de vecinos: {{vecinosList.length }} <br><br>
        Dominio correo: <input  [(ngModel)]="familia"  type="text" id="dominio" name="nombre" placeholder="">
        <button  class="primary"  (click)="delete_all()"><i
            class="bi bi-trash"></i>&nbsp;Eliminar familia</button>
        &nbsp;&nbsp;
        <button  class="primary"  (click)="refresh()"><i
            class="bi bi-trash"></i>&nbsp;Actualizar</button>
      </section>
      </article>           
            
      
    
  `,
  styleUrl: './vecinos.component.css'
})

export class vecinosComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation = {
    id: 0,
    name: "",
    city: "",
    state: "",
    photo: "",availableUnits: 0, wifi: false,
    laundry:false
  };
  
  vecinosService = inject(VecinosService);
  messagesService = inject(MessagesService);
  router: Router = inject(Router);
  foto:string="";
  vecinosList:Vecinos[] =[]; 
  private cdr=inject(ChangeDetectorRef);

 @Input() Id:any; 

 @Output() EliminarFamClicked: EventEmitter<number> =   new EventEmitter<number>();

  familia="@perez.es";
 
  onChange(){ 

    //if (this.vecinosList.length>0) window.location.reload(); // Refresh
    let currentUrl = this.router.url;
    this.router.navigate([currentUrl, { "refresh": (new Date).getTime() }] );

  }

  constructor() {
  
      
        this.vecinosService.getAll().then((datos: any) => {                    
            var DatosVecinos=JSON.parse(datos).vecinos.records;  
            for (var i = 0; i < DatosVecinos.length; i++) {
              if (DatosVecinos[i][1] == this.Id) {
                var vecino:Vecinos = {
                  id:DatosVecinos[i][0],
                  idlocation:DatosVecinos[i][1], 
                  nombre: DatosVecinos[i][2],
                  apellido: DatosVecinos[i][3],
                  email: DatosVecinos[i][4],
                };
                this.vecinosList.push(vecino);
              }
            }
        });
  } 

  refresh(){
    window.location.reload(); //Refresh !!
  }

  delete_all() {

    var NumEliminados=0;

    for(var i=0;i<this.vecinosList.length;i++){
      if (this.vecinosList[i].email.includes(this.familia)) {
          console.log("Eliminamos el vecino: "+this.vecinosList[i].id);
          this.delete(this.vecinosList[i].id);
          NumEliminados++;
      }
    }
    this.EliminarFamClicked.emit(NumEliminados);    
   
  }
  
  delete(id: number) {
   
    this.vecinosService.delete(id).then((OK) =>{       

        // Si s'ha eliminat el veí 
        //if (OK) {            
          this.housingLocation.availableUnits += 1;
          var urlfoto= this.housingLocation.photo;
          this.housingLocation.photo = this.foto;
          this.housingService.update(this.housingLocation);
          this.housingLocation.photo = urlfoto;

        //}
        // window.location.reload(); //Refresh !!
         

        
    })
}

  
}