import { Component, effect, inject, OnDestroy, OnInit } from '@angular/core';
import {MatCard} from "@angular/material/card"
import { CategorySelectorComponent } from '../category-selector/category-selector.component';
import { ItemCardComponent } from '../item-card/item-card.component';
import { ProductsServiceService } from '../services/products-service.service';
import { ProductDTO } from '../DTO/productDTO';
import { PagginationComponent } from '../paggination/paggination.component';
import { ProductStateManegmentService } from '../../shared/services/product-state-manegment.service';
@Component({
  selector: 'app-products',
  imports: [PagginationComponent,CategorySelectorComponent,ItemCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
   productService=inject(ProductsServiceService)
   products:ProductDTO[]|undefined
   sharedService:ProductStateManegmentService=inject(ProductStateManegmentService)
   category:string=this.sharedService.categoryFilter()
   constructor(){
    effect(()=>{
      if(this.category!=this.sharedService.categoryFilter()){
          this.category=this.sharedService.categoryFilter()
          this.getProductsByCategory(this.category)
      }

    })
   }
   ngOnInit(): void {

    if(this.category!=""){
        this.getProductsByCategory(this.category)
    }else{
      this.getAllProduts()
    }
       
   }

   getAllProduts(){
    return this.productService.getAllProducts().subscribe((res:any)=>{
      this.products=res;
    })
   }
   getProductsByCategory(category:string){
    this.productService.getProductsByCategory(category).subscribe((res:any)=>{
      this.products=res
    })
   }


}
