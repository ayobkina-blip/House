import { Component, inject }  from '@angular/core';
import { MessagesService } from '../services/messages.service';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [],
  template: `
     
      @if(messageService.Exist() ) {
          <button  class="primary" type="button" (click)='StopTimer()'>Desactivar</button>
          <h2>Mensajes</h2>          
          @for (message of messageService.get(); track messageService.get()) {
              <div>{{message}} <br></div>
          }
      }
  `,
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
  messageService: MessagesService = inject(MessagesService);
  EliminaMsj:ReturnType<typeof setTimeout> ;

  constructor(){
    this.EliminaMsj = setInterval(() => {      
        this.messageService.clear();        
    },60*1000) // Cada 60 segundos borra los mensajes !!  

    // setTimeout(() => clearInterval(this.EliminaMsj), 60*1000)  // Para parar automáticamente a 60 seg
  }

  StopTimer(){
    clearInterval(this.EliminaMsj)
  }

}
