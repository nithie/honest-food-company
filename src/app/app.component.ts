import { Component, OnDestroy, AfterViewInit } from '@angular/core';
import { GeocodeService } from './services/geocode.service';
import { mergeMap, debounceTime, takeUntil, tap } from 'rxjs/operators';
import { of, fromEvent, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnDestroy {
  address;
  location;
  error;
  showLoading = false;

  readonly errorMessage = 'Something went wrong';
  private destroy$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private geocodeService: GeocodeService) {}

  ngAfterViewInit() {
    const getSearchButton = document.getElementById('search');
    const search$ = fromEvent(getSearchButton, 'click').pipe(
      debounceTime(1000),
      takeUntil(this.destroy$)
    ).subscribe(data => this.search(this.address));
  }

  search(address) {
    this.error = undefined;
    this.showLoading = true;
    if (!this.isButtonEnabled) { return false; }
    this.geocodeService.searchAddress(address).pipe(
      mergeMap(response => {
        if (response.status === 'OK') {
           return this.geocodeService.getDeliverySector(response.results[0].geometry.location);
        } else if (response.status  === 'ZERO_RESULTS') {
          return of (false);
        }
      })
    )
    .pipe(
      tap(data => this.showLoading = false),
      takeUntil(this.destroy$)
    )
    .subscribe(data => {
      if (data.status === 200) {
        this.location = data.data;
      } else {
        this.error = this.errorMessage;;
      }
    });
  }

  isButtonEnabled(): boolean {
    return this.address && this.address.length;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
