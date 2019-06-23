import { TestBed } from '@angular/core/testing';

import { GeocodeService } from './geocode.service';
import { HttpClient } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';


describe('GeocodeService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let geocodeService: GeocodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        GeocodeService
      ]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    geocodeService = TestBed.get(GeocodeService);

  });

  it('should be created', () => {
    const service: GeocodeService = TestBed.get(GeocodeService);
    expect(service).toBeTruthy();
  });

  it('searchAddress should return status 200', () => {
    const testData = {
      lat: 48.1949526,
      lng: 16.3431347
    };
    geocodeService.getDeliverySector(testData).subscribe(data => {
      expect(data).toEqual({
        status: 200,
        data: 'au_vienna_schoenbrunnerstr'
      });
    });
    const req = httpTestingController.expectOne('/api/v1/delivery-sector');
    expect(req.request.method).toEqual('POST');
    req.flush(testData);
    httpTestingController.verify();
  });


});
