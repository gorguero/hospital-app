import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginForm } from 'src/app/interfaces/login-form.interface';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public formSubmitted = false;

  public loginForm = this.fb.group({
    email: [ 'joao@gmail.com', [Validators.required, Validators.email] ],
    password: [ '123456', Validators.required ],
    remember: [false]
  });

  constructor(
    private router:Router, 
    private fb: FormBuilder,
    private usuarioService:UsuarioService
    ) {
    
  }

  login(){

    // console.log(this.loginForm.value);
    this.usuarioService.login( this.loginForm.value as LoginForm )
      .subscribe({
        next: resp => {
          console.log(resp);          
        },
        error: err => {
          Swal.fire('Error', err.error.msg, 'error');
        }
      })

    // this.router.navigateByUrl('/')
  }

}
