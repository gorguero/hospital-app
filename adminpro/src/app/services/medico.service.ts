import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { CargarMedicos } from '../interfaces/cargar-medicos.interface';
import { map } from 'rxjs';
import { Medico } from '../models/medico.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private http:HttpClient) { }

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

  cargaMedicos( desde:number = 0 ){
    const url = `${base_url}/medicos?desde=${desde}`;
    return this.http.get<CargarMedicos>(url, this.headers)
      .pipe(
        map(resp => {
          return {
            total: resp.totalMedicos,
            medicos: resp.medicos
          }
        } )
      );
  }

  obtenerMedicoPorId( id:string ){

    const url = `${base_url}/medicos/${ id }`;
    return this.http.get(url, this.headers)
      .pipe(
        map( (resp:any) => resp.medico )
      );

  }

  crearMedico( medico:{nombre:string, hospital:string} ){
    const url = `${base_url}/medicos`;
    return this.http.post( url, medico, this.headers );
  }

  actualizarMedico( medico:Medico ){
    const url = `${base_url}/medicos/${ medico.uid }`;
    return this.http.put( url, medico, this.headers );
  }

  borrarMedico( _id:string ){
    const url = `${base_url}/medicos/${_id}`;
    return this.http.delete( url, this.headers );
  }

}
