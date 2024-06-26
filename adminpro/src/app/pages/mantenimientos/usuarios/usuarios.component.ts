import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { Usuario } from 'src/app/models/usuario.model';

import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Subscription, delay } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy{

  public totalUsuarios:number = 0;
  public usuarios:Usuario[] = [];
  public usuariosTemp:Usuario[] = [];

  public imgSubs!: Subscription;
  public desde:number = 0;
  public cargando:boolean = true;

  constructor( private usuarioService:UsuarioService, private busquedaService:BusquedasService, private modalImagenService:ModalImagenService ){}
  
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.imgSubs = this.modalImagenService.nuevaImagen
                      .pipe(
                        delay(100)
                      )
                      .subscribe( img => this.cargarUsuarios() );
  }

  cargarUsuarios(){
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde)
      .subscribe({
        next: ({ total, usuarios }) => {
          this.totalUsuarios = total;
          this.usuarios = usuarios;
          this.usuariosTemp = usuarios;
          this.cargando = false;
        }
      });
  }

  cambiarPagina( valor:number ){
    this.desde += valor;

    if( this.desde < 0 ){
      this.desde = 0;
    }else if( this.desde >= this.totalUsuarios ){
      this.desde -= valor;
    }

    this.cargarUsuarios();
  }

  buscar( termino:string ){

    if( termino.length === 0 ){
      return this.usuarios = this.usuariosTemp;
    }
    
    this.busquedaService.buscar( 'usuarios', termino )
      .subscribe({
        next: (resultados:any) => {
          this.usuarios = resultados;
        }
      })

    return;
  }

  eliminarUsuario( usuario:Usuario ){

    if( usuario.uid === this.usuarioService.uid ){
      return Swal.fire('Error', 'No puede eliminarse a si mismo', 'error');
    }
    
    Swal.fire({
      title: "¿Desea borrar el usuario?",
      text: `Esta por borrar a ${usuario.nombre}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Si, borrarlo"
    }).then((result) => {

      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario)
          .subscribe({
            next: resp => {
              Swal.fire({
                title: "Usuario eliminado",
                text: `${usuario.nombre} fue eliminado correctamente.`,
                icon: "success"
              });
              this.cargarUsuarios();
            }
          })
      }

    });
    
    return;
  }
  
  cambiarRole( usuario:Usuario ){
    this.usuarioService.guardarUsuario(usuario)
      .subscribe({
        next: resp => console.log(usuario)
      });
  }

  abrirModal(usuario:Usuario){
    this.modalImagenService.abrirModal('usuarios', usuario.uid!, usuario.img );
  }

}
