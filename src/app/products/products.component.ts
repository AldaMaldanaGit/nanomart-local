import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers:[DatePipe]
})
export class ProductsComponent implements OnInit {

  productsData:any;
  public search:any = '';
    
  constructor(public apiService: ApiService, private datePipe: DatePipe) { this.productsData = []; }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    //Get saved list of students
    this.apiService.getList().subscribe(response => {
      console.log(response);
      this.productsData = response;
    })
  }

  delete(item) {
    if(window.confirm('Are sure you want to delete this item ?')){
      //Delete item in Student data
      this.apiService.deleteItem(item.id).subscribe(Response => {
        //Update list after delete is successful
        this.getAllProducts();
      });
     }
  }

}
