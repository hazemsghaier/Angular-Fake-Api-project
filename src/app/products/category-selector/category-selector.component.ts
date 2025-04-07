import { Component, inject, OnInit } from '@angular/core';
import {MatFormField,MatLabel,MatSelect,MatOption} from "@angular/material/select"
import { ProductsServiceService } from '../services/products-service.service';
import { ProductStateManegmentService } from '../../shared/services/product-state-manegment.service';
@Component({
  selector: 'app-category-selector',
  imports: [MatFormField,MatLabel,MatSelect,MatOption],
  templateUrl: './category-selector.component.html',
  styleUrl: './category-selector.component.css'
})
export class CategorySelectorComponent implements OnInit{
  ngOnInit(): void {
  this.getAllCtegorys()  
}
  
  sharedState:ProductStateManegmentService=inject(ProductStateManegmentService)
  categories:any;
  productService:ProductsServiceService=inject(ProductsServiceService)
  getAllCtegorys(){
    this.productService.getAllCategories().subscribe((res:any)=>{
      this.categories=res;
    })
  }
  selectCategory($event:any){
    this.sharedState.setCategoryFilter($event.value)
  }


}
