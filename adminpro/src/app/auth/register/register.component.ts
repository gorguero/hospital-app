import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public registerForm = this.fb.group({
    nombre: [ 'Joao', [Validators.required, Validators.min(3)] ],
    email: [ 'testpro@gmail.com', [Validators.required, Validators.email] ],
    password: [ '123456789', Validators.required ],
    password2: [ '123456789', Validators.required ],
    terminos: [ false, Validators.required ]
  });

  constructor( private fb: FormBuilder ){}

  registrarUsuario(){
    console.log(this.registerForm.value)
  }

}
