import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { NgxSpinnerService } from 'ngx-spinner';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private dashboardService: DashboardService,
    private spinner: NgxSpinnerService
  ) {
  }

  //atributo
  grafico: Chart = new Chart();

  ngOnInit(): void {

    this.spinner.show();

    this.dashboardService.get()
      .subscribe({
        next: (data) => {

          var obj = [...data];
          var array = [];
          for(var i = 0; i < obj.length; i++) {
            array.push([ obj[i].name, obj[i].data ]);
          }

          this.grafico = new Chart({
            chart: {
              type: 'column',
            },
            title: {
              text: 'Gráfico modelo - agenda de contatos'
            },
            subtitle: {
              text: 'Treinamento Angular COTI Informática'
            },
            series: [
              { data: array, type: undefined as any }
            ],
            legend: {
              enabled: false
            },
            credits: {
              enabled: false
            }
          });

        },
        error: (e) => {
          console.log(e.error);
        }
      })
      .add(() => {
        this.spinner.hide();
      });
  }
}