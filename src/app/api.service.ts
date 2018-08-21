import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { shareReplay, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Item } from './models/item';
import { PaginatedResult } from './models/pagination';

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


  getValues(page?, itemsPerPage?): Observable<PaginatedResult<Item[]>> {
    const paginatedResult: PaginatedResult<Item[]> = new PaginatedResult<Item[]>();
    let params = new HttpParams();
    if (page !== null && itemsPerPage !== null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this._http.get<Item[]>('https://localhost:44348/api/values', { observe: 'response', params })
      .pipe(
        map(resp => {
          paginatedResult.result = resp.body;
          if (resp.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(resp.headers.get('Pagination'));
          }
          return paginatedResult;
        })
      );
  }
}
