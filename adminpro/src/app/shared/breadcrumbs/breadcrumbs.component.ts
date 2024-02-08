import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription, filter, map } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy{

  public titulo: string = '';
  public tituloSub$: Subscription;

  constructor( private router:Router ){

    this.tituloSub$ = this.getArgumentoRuta()
                            .subscribe( ({titulo}) => {
                              this.titulo = titulo;
                              document.title = `Administrador - ${titulo}`;
                            });

  }

  ngOnDestroy(): void {
    this.tituloSub$.unsubscribe();
  }

  getArgumentoRuta(){

    return this.router.events
                        .pipe(
                          filter( event => event instanceof ActivationEnd && event.snapshot.firstChild === null ),
                          map( (event: any) => event.snapshot.data )
                        );

  }

}
