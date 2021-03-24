import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {VakatMOdel} from './models/vakat.model';

@Injectable({
  providedIn: 'root'
})
export class VaktijaService {

  constructor(
    private http: HttpClient
  ) { }

  getVrijeme(broj: number, mjesec: number, godina: number): Observable<VakatMOdel> {
    return this.http.get('https://api.vaktija.ba/vaktija/v1/' + broj + '/' + godina + '/' + mjesec);
  }
}
