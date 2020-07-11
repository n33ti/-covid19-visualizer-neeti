import { Component, OnInit } from '@angular/core';
import { ChartType, ChartDataSets, ChartOptions } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';
import {TotalReportService} from '../total-report.service'

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {

  
data;

  lineChartData: ChartDataSets[] = [
    {data : [], label : 'daily-confirmed'},
    {data: [], label : 'daily-deceased'},
    {data: [], label: 'daily-recovered'}
  ]
  lineChartLabels: Label[] =[]
    lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'transparent',
    },
    {
      borderColor: 'red',
      backgroundColor: 'transparent'
    },
    {
      borderColor: 'teal',
      backgroundColor: 'transparent'
    }
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';


  lineChart2Data: ChartDataSets[] = [
    {data : [], label : 'total-confirmed'},
    {data: [], label : 'total-deceased'},
    {data: [], label: 'total-recovered'}
  ]
  lineChart2Labels: Label[] =[]
    lineChart2Colors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'transparent',
    },
    {
      borderColor: 'red',
      backgroundColor: 'transparent'
    },
    {
      borderColor: 'teal',
      backgroundColor: 'transparent'
    }
  ];

  lineChart2Legend = true;
  lineChart2Plugins = [];
  lineChart2Type = 'line';




  deaths = 0
  recovered = 0
  confirmed = 0
  constructor(private service: TotalReportService) { }

  ngOnInit(): void {
 
    this.service.getTotal().subscribe(
      (data)=>
      {
        this.data = data
        this.deaths = this.data.deaths.value
        this.recovered = this.data.recovered.value
        this.confirmed = this.data.confirmed.value
        //console.log(this.deaths)
      }


    )

    this.service.getDailyCases().subscribe(
      (data) => {
        //console.log(data.cases_time_series[155])
        this.data = data;
        var today = new Date()
        var yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)
      //  console.log(yesterday)
        var i = this.data.cases_time_series.length - 1
        var cd = new Date(this.data.cases_time_series[i].date + ', 2020')
      //  console.log(cd)
     //   console.log(yesterday.getMonth() ===cd.getMonth() && yesterday.getDay() === cd.getDay())
     var k = i
     for(let j = i ; j>i-7;j--)
     {
      // console.log(data.cases_time_series[j])
       this.lineChartLabels.unshift(this.data.cases_time_series[j].date)
       this.lineChartData[0].data.unshift(this.data.cases_time_series[j].dailyconfirmed)
       this.lineChartData[1].data.unshift(this.data.cases_time_series[j].dailydeceased)
       this.lineChartData[2].data.unshift(this.data.cases_time_series[j].dailyrecovered)

       this.lineChart2Labels.unshift(this.data.cases_time_series[k].date)
       this.lineChart2Data[0].data.unshift(this.data.cases_time_series[k].totalconfirmed)
       this.lineChart2Data[1].data.unshift(this.data.cases_time_series[k].totaldeceased)
       this.lineChart2Data[2].data.unshift(this.data.cases_time_series[k].totalrecovered)
       

       k = k -7


     }
     //console.log(this.lineChartLabels)
     //console.log(this.lineChartData)

    // console.log(this.lineChart2Labels)
    // console.log(this.lineChart2Data)
    }
    )



  }

}
