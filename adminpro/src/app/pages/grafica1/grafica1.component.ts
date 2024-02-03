import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  public title1: string = 'Sales';
  public labelsGraphics1: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
  public data1 = [20, 30, 50];

  public title2: string = 'Compras';
  public labelsGraphics2: string[] = [ 'Pollo', 'Milanesa', 'Empanadas' ];
  public data2 = [10, 60, 30];



}
