import { Component } from '@angular/core';
import { Observable, interval } from 'rxjs';
import {retry, take, map, filter} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html'
})
export class RxjsComponent {

  constructor(){

    /*this.retonarObservable().pipe(
      retry()
    )
    .subscribe({
      next: (valor) => console.log('Subs:', valor ),
      error: (error) => console.warn('Error: ', error),
      complete: () => console.info('obs terminado')
    });*/

    this.retornaIntervalo()
      .subscribe( console.log )

  }

  retornaIntervalo(): Observable<number>{

    return interval(500)
            .pipe(
              take(10),
              map( valor => valor + 1 ),
              filter( valor => ( valor % 2 === 0 ) ? true : false ),
            );                 

  }

  retonarObservable(): Observable<number>{

    let i = -1;

    return new Observable<number>( observer => {

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
    
  }

}
