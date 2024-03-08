import { Component } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css']
})
export class ModalImagenComponent {

  public imagenSubir!:File;
  public imgTemporal:any = '';

  constructor( public modalImagenService:ModalImagenService, public fileUploadService:FileUploadService ){}

  cerrarModal(){
    this.imgTemporal = null;
    this.modalImagenService.cerrarModal();
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
    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileUploadService
      .actualizarFoto( this.imagenSubir, tipo, id )
        .then( img => {
          Swal.fire('Imagen actualizada', 'Imagen de usuario actualizada', 'success');
          this.modalImagenService.nuevaImagen.emit(img);
          this.cerrarModal();
        })
  }

}
