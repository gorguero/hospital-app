import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import {retry} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html'
})
export class RxjsComponent {

  constructor(){

    let i = -1;

    const obs$ = new Observable( observer => {

      const intervalo = setInterval( () => {
        
        i++;
        observer.next(i);

        if( i === 4 ){
          clearInterval(intervalo);
          observer.complete();
        }

        if( i === 2 ){
          observer.error('i llego al valor 2');
        }

      }, 1000 )

    });

    obs$.pipe(
      retry()
    )
    .subscribe({
      next: (valor) => console.log('Subs:', valor ),
      error: (error) => console.warn('Error: ', error),
      complete: () => console.info('obs terminado')
    });

  }

}
