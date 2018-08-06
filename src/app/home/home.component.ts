import { ApiService, Product } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

   productos: Observable<Array<Product>>;
  constructor(private _apiService: ApiService) { }

  ngOnInit() {
    this.productos = this._apiService.productos;
    console.log(this._apiService.productos);
  }

}
