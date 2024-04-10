import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu = JSON.parse( localStorage.getItem('menu')! ) || [];

  // cargarMenu(){
  //   this.menu = JSON.parse( localStorage.getItem('menu')! ) || [];
  // }

}
