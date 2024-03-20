import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';

import { Medico } from 'src/app/models/medico.model';

import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy{

  public cargando:boolean = true;
  public totalMedicos:number = 0;
  public medicos:Medico[] = [];
  public medicosTemporales:Medico[] = [];
  public desde:number = 0;
  private imgSubs!:Subscription;

  constructor(
    private medicoService:MedicoService, 
    private modalImagenService:ModalImagenService,
    private buscarService:BusquedasService
  ){}

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }
  ngOnInit(): void {
    this.cargarMedicos();
    
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe( delay(100) )
      .subscribe( img => this.cargarMedicos() );
  }
  
  cargarMedicos(){
    this.cargando = true;
    this.medicoService.cargaMedicos(this.desde)
      .subscribe({
        next: ({total, medicos}) => {
          this.cargando = false;
          this.medicos = medicos;
          this.medicosTemporales = medicos;
          this.totalMedicos = total;
        }
      })
  }

  cambiarPagina( valor:number ){
    this.desde += valor;

    if( this.desde < 0 ){
      this.desde = 0;
    }else if( this.desde >= this.totalMedicos ){
      this.desde -= valor;
    }

    this.cargarMedicos();
  }

  abrirModal(medico:Medico){
    this.modalImagenService.abrirModal('medicos', medico.uid!, medico.img );
  }

  buscar(termino: string) {

    if (termino.length === 0) {
      return this.medicos = this.medicosTemporales;
    }

    this.buscarService.buscar('medicos', termino)
      .subscribe({
        next: (resultado:any) => {
          this.medicos = resultado;
        }
      })

    return;
  }

}
