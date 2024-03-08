import { Component } from '@angular/core';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css']
})
export class ModalImagenComponent {

  public imagenSubir!:File;
  public imgTemporal:any = '';

  constructor( public modalImagenService:ModalImagenService ){}

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

}
