import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateReportService {

  constructor(
    private http : HttpClient
  ) { }

  getStateRepo() : Observable <any>
  {
    return this.http.get('https://covid19.mathdro.id/api/countries/india/deaths')
  }

  getStateTotal(): Observable<any>
  {
    return this.http.get('https://api.covid19india.org/state_test_data.json')
  }
}
