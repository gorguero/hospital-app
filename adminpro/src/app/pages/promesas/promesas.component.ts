import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
})
export class PromesasComponent implements OnInit{


  ngOnInit(): void {
    
    /*Repaso de promesas
    const promesa = new Promise( (resolve, reject) => {
      
      if(false){
        resolve('Hello world');
      }else{
        reject('Algo salio mal')
      }

    });
    
    promesa.then( (mensaje) => {
      console.log(mensaje)
    })
    .catch( error => console.log(error) )

    console.log('Fin del init');*/
    
    this.getUsuarios().then( usuarios => console.log(usuarios) )
    
  }


  getUsuarios(){

    return new Promise( resolve => {
      fetch('https://reqres.in/api/users')
        .then( resp => resp.json() )
        .then( body => resolve( body.data ) )
    })
  
  }


}
