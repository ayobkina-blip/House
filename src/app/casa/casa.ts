import { Component, inject, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HouseInterface } from '../house-interface';
import { HouseService } from '../house-service';
import { RouterLink } from "@angular/router";
import { Star } from '../star/star';
import { VecinoInterface } from '../vecino-interface';

@Component({
  selector: 'app-casa',
  imports: [CommonModule, FormsModule, RouterLink, Star],
  templateUrl: './casa.html',
  styleUrl: './casa.css',
})
export class Casa {

  @Input() oneHouse:HouseInterface | any;
  @Output() casaBorrada = new EventEmitter<number>();
  @Output() casaDuplicada = new EventEmitter<HouseInterface>();
  onImageError(event: any) {
    event.target.src = 'casa1.jpg';
  }

  service = inject(HouseService);


  borrarCasa(){
    this.service.deleteHouse(this.oneHouse?.id);
    this.casaBorrada.emit(this.oneHouse.id);
    
  }

  duplicarCasa(){
    this.service.duplicateHouse(this.oneHouse?.id).then(nuevaCasa => {
      this.casaDuplicada.emit(nuevaCasa);
    });
  }

  ClickSobreEstrellas(message: number): void {
    this.oneHouse.rating++;
    if (this.oneHouse.rating > 5) {
      this.oneHouse.rating = 1;
    }
    this.service.updateHouse(this.oneHouse.id, this.oneHouse);
  }

}
