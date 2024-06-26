import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  public usuario:Usuario;
  public menuItems:any[];

  constructor( public sidebarService:SidebarService, private usuarioService:UsuarioService ){
    console.log(sidebarService.menu)
    this.menuItems = sidebarService.menu;
    this.usuario = usuarioService.usuario;
  }

}
