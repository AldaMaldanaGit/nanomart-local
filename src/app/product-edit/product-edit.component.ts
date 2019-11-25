import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from '../models/products';
import { ApiService } from '../services/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { numberValidator } from '../validator/custom_validator';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
  providers:[DatePipe]
})
export class ProductEditComponent implements OnInit {

  id:number;
  data:Products;
  productForm = new FormGroup({})
  myDate = new Date();
  myFormatDate = this.datePipe.transform(this.myDate, 'dd/mm/yy', 'id-ID');

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public apiService: ApiService, private datePipe: DatePipe
  ) { 
      this.data = new Products();
      this.productForm = this.editProductFormGroup();
    }

  editProductFormGroup(data?:any){
    return new FormGroup({
      barcode_id: new FormControl(this.data.barcode_id, [Validators.required, numberValidator]),
      name: new FormControl(this.data.name, [Validators.required]),
      description: new FormControl(this.data.description),
      update_at: new FormControl(this.myFormatDate),
      image_url: new FormControl('')
    });
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params["id"];
    //get item details using id
    this.apiService.getItem(this.id).subscribe(response => {
      console.log(response);
      this.data = response;
      this.productForm = this.editProductFormGroup(this.data)
    })
  }

  onSubmit() {
    this.apiService.updateItem(this.id, this.productForm.value).subscribe(response => {
      this.router.navigate(['product-list']);
    })
  }
  update() {
    //Update item by taking id and updated data object
    //console.log(this.data.update_at);
  }

  get barcode_id() {
    return this.productForm.get('barcode_id');
  }

  get name() {
    return this.productForm.get('name');
  }

}
