import { Component } from '@angular/core';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css']
})
export class ModalImagenComponent {

  public ocultarModal: boolean = false;

  cerrarModal(){
    this.ocultarModal = true;
  }

}
