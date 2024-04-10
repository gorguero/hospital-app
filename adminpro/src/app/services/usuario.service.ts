import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';

const base_url = environment.base_url;

declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario!: Usuario;

  constructor( private http: HttpClient, private router: Router ) { }

  get token(){
    return localStorage.getItem('token') || '';
  }

  get uid():string{
    return this.usuario.uid || '';
  }

  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  guardarLocalStorage(token:string, menu:any){
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  registrarUsuario( formData: RegisterForm ){
    return this.http.post(`${base_url}/usuarios`, formData)
      .pipe(
        tap( (resp: any) => {
          this.guardarLocalStorage(resp.token, resp.menu);
        } )
      )
  }

  actualizarPerfil( data:{email:string, nombre:string, role:string} ){

    data = {
      ...data,
      role: this.usuario.role!
    };

    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, this.headers);
  }

  login( formData: LoginForm ){
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap( (resp: any) => {
          this.guardarLocalStorage(resp.token, resp.menu);
        } )
      )
  }

  logginGoogle( token:string ){
    return this.http.post(`${base_url}/login/google`, {token})
        .pipe(
          tap((resp: any) => {
            this.guardarLocalStorage(resp.token, resp.menu);
          })
        )
  }

  validarToken():Observable<boolean>{

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map( (resp: any) => {
        const { email, google, nombre, role, img = '', uid } = resp.usuario;
        this.usuario = new Usuario( nombre, email, '', img, role, google, uid );
        this.guardarLocalStorage(resp.token, resp.menu);
        return true;
      }),
      catchError( error => of(false) )
    );

  }

  logout(){

    localStorage.removeItem('token');

    //TODO: borrar menú
    localStorage.removeItem('token');
    localStorage.removeItem('menu');

    google.accounts.id.revoke('gorgueroo98gamer@gmail.com', () => {
      this.router.navigateByUrl('/login');
    })

  }

  cargarUsuarios( desde:number = 0 ){
    const url = `${base_url}/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuario>( url, this.headers)
        .pipe(
          map( resp => {
            const usuarios = resp.usuarios.map(
              user => new Usuario( user.nombre, user.email, '', user.img, user.role, user.google, user.uid )
            );
            return {
              total: resp.totalUsers,
              usuarios
            };
          } )
        );
  }

  eliminarUsuario( usuario:Usuario ){
    
    const url = `${base_url}/usuarios/${usuario.uid}`;
    return this.http.delete( url, this.headers)

  }

  guardarUsuario( usuario:Usuario ){
    return this.http.put(`${base_url}/usuarios/${usuario.uid}`, usuario, this.headers);
  }

}
