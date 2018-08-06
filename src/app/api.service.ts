import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Product {
  name: string;
  id: number;
}

export interface ProductResponse {
  type: string;
  value: Array<Product>;
}

const API_ENDPOINT = 'https://horecacity-testing.azurewebsites.net/api/Product';
const CACHE_SIZE = 1;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private cache$: Observable<Array<Product>>;
  constructor(private _http: HttpClient) { }

  get productos() {
     if (!this.cache$) {
       this.cache$ = this.requestProducts().pipe(
         shareReplay(CACHE_SIZE)
       );
     }
     return this.cache$;
  }

  private requestProducts() {
    return this._http.get<ProductResponse>(API_ENDPOINT).pipe(
      map(resp => resp.value)
    );
  }
}
