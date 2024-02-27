import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginForm } from 'src/app/interfaces/login-form.interface';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit{

  @ViewChild('googleBtn') googleBtn!: ElementRef;
  public formSubmitted = false;

  public loginForm = this.fb.group({
    email: [ localStorage.getItem('email') || '', [Validators.required, Validators.email] ],
    password: [ '', Validators.required ],
    remember: [false]
  });

  constructor(
    private router:Router, 
    private fb: FormBuilder,
    private usuarioService:UsuarioService
    ) {
    
  }
  ngAfterViewInit(): void {
    
    this.googleInit();
    
  }

  googleInit(){
    google.accounts.id.initialize({
      client_id: "1081815535305-i6s5sfqs1ukivs7njvqlr3sl9fh5skh6.apps.googleusercontent.com",
      callback: this.handleCredentialResponse
    });
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse( response:any ){
    console.log("Encoded JWT ID token: " + response.credential);
  }

  login(){

    this.usuarioService.login( this.loginForm.value as LoginForm )
      .subscribe({
        next: resp => {
          
          if( this.loginForm.get('remember')?.value ){
            localStorage.setItem('email', this.loginForm.get('email')?.value || ''); 
          }else{
            localStorage.removeItem('email');
          }
          
        },
        error: err => {
          Swal.fire('Error', err.error.msg, 'error');
        }
      })

    // this.router.navigateByUrl('/')
  }

}
