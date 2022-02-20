import { Injectable } from '@angular/core';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ModuleUtilsService {

  setProperty(event: { value: any; },idProperty: any, object: any, property: any){
    const value = event.value;
    if(value){
      object[property] = value[idProperty];
    } else{
      object[property] = null;
    }
  }

  generateId(): string{
    return uuid.v4();
  }
}
