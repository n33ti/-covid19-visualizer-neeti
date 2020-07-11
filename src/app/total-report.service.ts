import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class TotalReportService {

  constructor(private http: HttpClient) {

   }
   getTotal()
   {
     return this.http.get('https://covid19.mathdro.id/api/countries/india')
   }
   getDailyCases()
   {
     return this.http.get('https://api.covid19india.org/data.json')
   }
  
}
