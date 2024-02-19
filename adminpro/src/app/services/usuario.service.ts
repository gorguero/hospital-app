import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( private http: HttpClient ) { }

  registrarUsuario( formData: RegisterForm ){
    return this.http.post(`${base_url}/usuarios`, formData);
  }

  login( formData: LoginForm ){
    return this.http.post(`${base_url}/login`, formData);
  }

}
