import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'donut',
  templateUrl: './donut.component.html',
  styles: [
  ]
})
export class DonutComponent implements OnInit
{
  ngOnInit(): void {
    this.doughnutChartData.labels = this.etiquetas;
    this.doughnutChartData.datasets[0].data = this.data;
  }
  
  @Input() graphicTitle:string = 'Sin titulo';
  @Input() etiquetas: string[] = [ 'label1','label2','label3' ];
  @Input() data: number[] = [20, 20, 20];

  public doughnutChartLabels: string[] = this.etiquetas;

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { 
        data: this.data,
        backgroundColor: ['#6857E6', '#009FEE','#F02059'] 
      },
    ],
  };
  public doughnutChartType: ChartType = 'doughnut';

}
