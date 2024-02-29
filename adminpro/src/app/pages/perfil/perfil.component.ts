import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit{

  public profileForm!: FormGroup;
  public usuario:Usuario;
  public imagenSubir!:File;

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
        },
        error: error => console.log(error)
      });
  }

  cambiarImagen( event:any ){
    this.imagenSubir = event.target.files[0];
  }

  subirImagen(){
    this.fileUploadService
      .actualizarFoto( this.imagenSubir, 'usuarios', this.usuario.uid! )
      .then( img => console.log(img) )
  }

}
