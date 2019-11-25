import { Component, OnInit } from '@angular/core';
import { Products } from '../models/products';
import { Nanomarts } from '../models/nanomart';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { numberValidator } from '../validator/custom_validator';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  
  data:Products;
  databox:Nanomarts;
  nanomartData: any;
  fileData: File = null;

  productForm = new FormGroup({})

  constructor(
    public apiService: ApiService,
    public router: Router, public http: HttpClientModule
  ) 
  { 
    this.data = new Products();
    this.productForm = this.createProductFormGroup();
    this.nanomartData = [];
  }

  ngOnInit() {
    this.getlistNanomartCombo()
  }

  getlistNanomartCombo(){
    //Get saved list of students
    this.apiService.getListNanomart().subscribe(response => {
      console.log(response);
      this.nanomartData = response;
    })
  }

  createProductFormGroup(){
    return new FormGroup({
      barcode_id: new FormControl('', [Validators.required, numberValidator]),
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      image_url: new FormControl('')
    });
  }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
  }

  onSubmit() {
    this.apiService.createItem(this.productForm.value).subscribe((response) => {
      this.router.navigate(['product-list']);
    });
  }
  submitForm() {
    /*this.apiService.createItem(this.data).subscribe((response) => {
      this.router.navigate(['list']);
  });*/
  }

  get barcode_id() {
    return this.productForm.get('barcode_id');
  }

  get name() {
    return this.productForm.get('name');
  }

}
