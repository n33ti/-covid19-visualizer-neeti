import { Component, OnInit } from '@angular/core';
import {StateReportService} from '../state-report.service'
import { ChartType, ChartDataSets, ChartOptions } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';
import {Chart} from 'chart.js'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  reports=[]
 show = false
 data;
 event;
 totaltested
 

chart: any



  barChartLabels: Label[] =['negative', 'positive']
  barChartData: ChartDataSets[] =[{data: [], label: 'test results'}]
  barChartType: ChartType = 'bar'
  barChartLegend  = true
  barColors: Color[]=[
    { // dark grey
         backgroundColor: 'white',
         borderColor: 'teal'
       
       },
       { // dark grey
        borderColor: 'teal',
         backgroundColor: 'red'
        
       }]

  constructor(private service : StateReportService) { }


   compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const tc1 = a.confirmed
    const tc2 = b.confirmed
  
    let comparison = 0;
    if (tc1 < tc2) {
      comparison = 1;
    } else if (tc1 < tc2) {
      comparison = -1;
    }
    return comparison;
  }
  

  ngOnInit(): void {
    this.show = false
    this.service.getStateRepo().subscribe(
      (data)=>{
    //    console.log(data)
       
        for(let i = 0; i<data.length; i++)
        {
       
        this.reports.push(data[i])
        }
      //  console.log(this.reports)
      }
    )



  }

  showGraph()
  {
    this.show = true
   //console.log(event)
   this.event = event
   var sname = this.event.target.textContent.split(/\s+/).join('')
  // console.log(sname.split(/\s+/).join('').length)
   this.service.getStateTotal().subscribe(
    (data)=>
    {
      var k = 0
     // console.log(data.states_tested_data[9])
      for(let i = 0; i< data.states_tested_data.length; i++)
      {
        var pname = data.states_tested_data[i].state.split(/\s+/).join('')
     //  console.log(pname + " "+ pname.length)
        if(pname === sname)
        {
       //   console.log(pname + " "+ sname)

           while(i <data.states_tested_data.length && data.states_tested_data[i].state.split(/\s+/).join('') === sname)
           {
           // pname = data.states_tested_data[i].state.split(/\s+/).join('')
             k = i;
             i++;
           }
           break;
          
        }

      }
     
 //console.log(data.states_tested_data[k])
 this.barChartData[0].data = []
 this.barChartData[0].data.push(data.states_tested_data[k].negative)
 this.barChartData[0].data.push(data.states_tested_data[k].positive)
    this.totaltested = data.states_tested_data[k].totaltested
    }
  )

  var orange = 0, red = 0, green = 0
  
  this.service.getDistrict().subscribe(
    (data )=> {
     // console.log(data.zones)

      var k = 0
     // console.log(data.states_tested_data[9])
      for(let i = 0; i< data.zones.length; i++)
      {
        var pname = data.zones[i].state.split(/\s+/).join('')
     //  console.log(pname + " "+ pname.length)
        if(pname === sname)
        {
       //   console.log(pname + " "+ sname)

           while(i <data.zones.length && data.zones[i].state.split(/\s+/).join('') === sname)
           {
           // pname = data.states_tested_data[i].state.split(/\s+/).join('')
             if(data.zones[i].zone ==="Red")
             red ++;
             else  if(data.zones[i].zone ==="Green")
             green ++;
             else
             orange++
             i++;
           }
           break;
          
        }

    }


    this.chart = new Chart('canvas', {
      type: 'doughnut',
      data: {
        labels: ['red zone','orange zone', 'green zone'],
        datasets: [
          { 
            data: [red, orange, green],
            backgroundColor: ['rgb( 255, 0, 1)','rgb(255,128,0)', 'rgb(0,128, 0)'],
            fill: true
          },
        ]
      },
      options: {
        legend: {
          display: true
        },
        tooltips:{
          enabled:false
        }
      }
    });

   // console.log(red)
  }
  )




  }

}
