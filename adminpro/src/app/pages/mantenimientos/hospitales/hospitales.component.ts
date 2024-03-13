import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit{

  public totalHospitales:number = 0;
  public hospitales: Hospital[] = [];
  public cargando: boolean = true;
  public desde:number = 0;

  constructor(private hospitalService:HospitalService){}

  ngOnInit(): void {

    this.cargarHospitales();
    this.hospitalService.cargarHospitales()
        .subscribe( resp => {
          console.log(resp)
        })

  }

  cargarHospitales(){
    this.cargando = true;
    this.hospitalService.cargarHospitales(this.desde)
      .subscribe({
        next: ({total, hospitales}) => {
          this.cargando = false;
          this.hospitales = hospitales;
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

}
