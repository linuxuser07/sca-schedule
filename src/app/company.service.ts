import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';




@Injectable()
export class CompanyService {
  loading: Boolean;
  private facilityApi = 'http://scadevjobs.com/api/';
  constructor(private _http: HttpClient) {
  }

  getFacilities(): Observable<any>{
    return this._http.get(this.facilityApi + 'Locations');
  }

  getSchedule(facilityId: string, day: string): Observable<any> {
    return this._http.get(this.facilityApi + 'Schedules' + '/' + facilityId + '/' + day);
  }

}
