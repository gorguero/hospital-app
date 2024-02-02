import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit{

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }

  @Input('valorProgreso') progreso: number = 40;
  @Input() btnClass: string = 'btn-primary';

  @Output() valorSalida: EventEmitter<number> = new EventEmitter();
  

  cambiarValor( valor:number ){

    if( this.progreso >= 100 && valor >= 0 ){
      this.valorSalida.emit(100);
      this.progreso = 100;
    } else if( this.progreso <= 0 && valor < 0 ){
      this.valorSalida.emit(0);
      this.progreso = 0;
    } else{
      this.progreso = this.progreso + valor;
      console.log(this.progreso)
      this.valorSalida.emit( this.progreso );
    }

  }

}
