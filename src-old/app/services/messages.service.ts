import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messages: string[] = [];

  constructor() { }
 
  get():string[] { return this.messages  } 

  Exist():number {return this.messages.length};

  add(message: string) {
    this.messages.push(new Date().toUTCString()+" ->"+message);
  }

  clear() {
    this.messages = [];
  }
}
