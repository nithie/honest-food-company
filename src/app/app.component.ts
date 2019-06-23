import { Component } from '@angular/core';
import { GeocodeService } from './geocode.service';
import { mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  address;
  location;

  constructor(private geocodeService: GeocodeService) {}

  search() {
    if (!this.isButtonEnabled) { return false; }
    this.address = undefined;
    this.geocodeService.searchAddress(this.address).pipe(
      mergeMap(response => {
        if (response.status === 'OK') {
           return this.geocodeService.getDeliverySector(response.results[0].geometry.location);
        } else if (response.status  === 'ZERO_RESULTS') {
          return of (false);
        }
      })
    ).subscribe(data => {
      if (data.status === 200) {
        this.location = data.data;
      }
    });
  }

  isButtonEnabled(): boolean {
    return this.address && this.address.length;
  }
}
