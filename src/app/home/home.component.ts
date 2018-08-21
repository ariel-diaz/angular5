import { ApiService, Product } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../models/item';
import { Pagination, PaginatedResult } from '../models/pagination';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

   productos: Observable<Array<Product>>;
   values: any;
   isLoad: boolean;
   pagination: Pagination;
   isLoadPaginate: boolean;

  constructor(private _apiService: ApiService) { 
    this._apiService.getValues(1,2).subscribe(data => {
      this.values = data.result;
      this.pagination = data.pagination;
      console.log(this.pagination);
      this.isLoad = true;
      this.isLoadPaginate = true;
    });
  }

  ngOnInit() {
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.isLoad = false;
    console.log(this.pagination.currentPage);
    this.loadItems();
  }

  loadItems() {
    this._apiService.getValues(this.pagination.currentPage, this.pagination.itemsPerPage)
    .subscribe((res: PaginatedResult<Item[]>) => {
      this.values = res.result;
      this.pagination = res.pagination;
      console.log("Cambio a true");
      this.isLoad = true;
    });
  }

}
