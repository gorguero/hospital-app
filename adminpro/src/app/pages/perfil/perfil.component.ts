import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit{

  public profileForm!: FormGroup;
  public usuario:Usuario;
  public imagenSubir!:File;
  public imgTemporal:any = '';

  constructor( 
    private fb:FormBuilder, 
    private usuarioService:UsuarioService,
    private fileUploadService:FileUploadService 
  ){
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]]
    });
  }

  actualizarPerfil(){
    this.usuarioService.actualizarPerfil(this.profileForm.value)
      .subscribe({
        next: () => {
          const {nombre, email} = this.profileForm.value;
          this.usuario.nombre = nombre;
          this.usuario.email = email;
          Swal.fire('Guardado', 'Los cambios se guardaron exitosamente', 'success');
        },
        error: err => {
          Swal.fire('Error', err.error.msg, 'error');
          console.error(err)
        }
      });
  }

  cambiarImagen( event:any ){
    this.imagenSubir = event.target.files[0];

    if( !event.target.files[0] ) { 
      this.imgTemporal = null;
      return;
    }

    const reader = new FileReader();
    const url64 = reader.readAsDataURL( event.target.files[0] );

    reader.onloadend = () => {
      this.imgTemporal = reader.result;
    }

  }

  subirImagen(){
    this.fileUploadService
      .actualizarFoto( this.imagenSubir, 'usuarios', this.usuario.uid! )
      .then( img => {
        this.usuario.img = img;
        Swal.fire('Imagen actualizada', 'Imagen de usuario actualizada', 'success');
      })
  }

}
