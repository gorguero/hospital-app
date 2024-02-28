import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';

import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario!: Usuario;

  constructor( private http: HttpClient, private router: Router ) { }

  registrarUsuario( formData: RegisterForm ){
    return this.http.post(`${base_url}/usuarios`, formData)
      .pipe(
        tap( (resp: any) => {
          localStorage.setItem('token', resp.token)
        } )
      )
  }

  login( formData: LoginForm ){
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap( (resp: any) => {
          localStorage.setItem('token', resp.token)
        } )
      )
  }

  logginGoogle( token:string ){
    return this.http.post(`${base_url}/login/google`, {token})
        .pipe(
          tap((resp: any) => {
            localStorage.setItem('token', resp.token)
          })
        )
  }

  validarToken():Observable<boolean>{

    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      map( (resp: any) => {
        const { email, google, nombre, role, img = '', uid } = resp.usuario;
        this.usuario = new Usuario( nombre, email, '', img, role, google, uid );
        localStorage.setItem('token', resp.token);
        return true;
      }),
      catchError( error => of(false) )
    );

  }

  logout(){

    localStorage.removeItem('token');

    google.accounts.id.revoke('gorgueroo98gamer@gmail.com', () => {
      this.router.navigateByUrl('/login');
    })

  }

}
