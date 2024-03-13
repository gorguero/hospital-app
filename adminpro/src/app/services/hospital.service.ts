import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';
import { CargarHospitales } from '../interfaces/cargar-hospitales.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor( private http:HttpClient ) { }

  get token():string{
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  cargarHospitales( desde:number = 0 ){
    const url = `${base_url}/hospital?desde=${desde}`;
    return this.http.get<CargarHospitales>(url, this.headers)
      .pipe(
        map(resp => {
          return {
            total: resp.totalHospitales,
            hospitales: resp.hospitales
          }
        } )
      );
  }

  crearHospital( nombre:string ){
    const url = `${base_url}/hospital`;
    return this.http.post( url, {nombre}, this.headers );
  }

  actualizarHospital( _id:string, nombre:string ){
    const url = `${base_url}/hospital/${ _id }`;
    return this.http.put( url, {nombre}, this.headers );
  }

  borrarHospital( _id:string ){
    const url = `${base_url}/hospital/${_id}`;
    return this.http.delete( url, this.headers );
  }

}
