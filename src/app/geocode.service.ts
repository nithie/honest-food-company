import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GeocodeService {

  url = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
  api = '/api/v1/delivery-sector';
  key = 'AIzaSyDG5OG5isVr959pyK1VShphU7mjVi4f6Q8';
  area;
  cordinates;

  constructor(private http: HttpClient) { }

  searchAddress(text: string ): Observable<any> {
    console.log(`${this.url}${text}&key=${this.key}`);
    if (text && this.key) {
      return this.http.get(`${this.url}${text}&key=${this.key}`).pipe(take(1));
    }
  }

  getDeliverySector(data: { lat: number, lng: number }): Observable<any> {
    return this.http.post(this.api, data).pipe(take(1));
  }
}
