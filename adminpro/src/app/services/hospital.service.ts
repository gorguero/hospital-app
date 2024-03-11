import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';

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

  cargarHospitales( ): Observable<Hospital[]>{
    const url = `${base_url}/hospital`;
    return this.http.get<{ ok: boolean, hospitales: Hospital[] }>(url, this.headers)
      .pipe(
        map(resp => resp.hospitales)
      );
    }

}
