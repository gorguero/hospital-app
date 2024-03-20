import { Component, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit{

  public totalHospitales:number = 0;
  public hospitales: Hospital[] = [];
  public hospitalesTemporales: Hospital[] = [];
  public cargando: boolean = true;
  public desde:number = 0;
  private imgSubs!:Subscription;

  constructor(
    private hospitalService:HospitalService, 
    private modalImagenService:ModalImagenService,
    private buscarService:BusquedasService
    ){}

  ngOnInit(): void {

    this.cargarHospitales();
    this.hospitalService.cargarHospitales()
        .subscribe( resp => {
          console.log(resp)
        });

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe( delay(100) )
      .subscribe( img => this.cargarHospitales() );

  }

  cargarHospitales(){
    this.cargando = true;
    this.hospitalService.cargarHospitales(this.desde)
      .subscribe({
        next: ({total, hospitales}) => {
          this.cargando = false;
          this.hospitales = hospitales;
          this.hospitalesTemporales = hospitales;
          this.totalHospitales = total;
        }
      })
  }

  cambiarPagina( valor:number ){
    this.desde += valor;

    if( this.desde < 0 ){
      this.desde = 0;
    }else if( this.desde >= this.totalHospitales ){
      this.desde -= valor;
    }

    this.cargarHospitales();
  }
  
  guardarCambios(hospital:Hospital){
    this.hospitalService.actualizarHospital( hospital.uid!, hospital.nombre )
      .subscribe({
        next: resp => {
          Swal.fire( 'Actualizado', hospital.nombre, 'success' );
        },
        error: err => {
          Swal.fire( 'Error', 'Error al actualizar un hospital', 'error' );
        }
      });
  }

  borrarHospital( hospital:Hospital ){
    this.hospitalService.borrarHospital(hospital.uid!)
      .subscribe({
        next: resp => {
          this.cargarHospitales();
          Swal.fire( 'Eliminado', `${hospital.nombre} se elimino correctamente`, 'success' );
        },
        error: err => {
          Swal.fire( 'Error', 'Error al eliminar un hospital', 'error' );
        }
      })
  }

  async abrirSweetAlert(){
    const { value = '' } = await Swal.fire<string>({
      title: "Nuevo Hospital",
      text: "Ingrese nombre del hospital",
      input: "text",
      inputPlaceholder: "Nombre del hospital",
      showCancelButton: true,
    });

    if( value!.trim().length > 0 ){
      this.hospitalService.crearHospital( value! )
        .subscribe({
          next: (resp:any) => {
            this.cargarHospitales();
          }
        })
    }

  }

  abrirModal(hospital:Hospital){
    this.modalImagenService.abrirModal('hospitales', hospital.uid!, hospital.img! );
  }

  buscar(termino:string){
    
    if( termino.length === 0 ){
      return this.hospitales = this.hospitalesTemporales;
    }

    this.buscarService.buscar('hospitales', termino)
      .subscribe({
        next: resutados => {
          this.hospitales = resutados;
        }
      })
    
    return;
  }

}
