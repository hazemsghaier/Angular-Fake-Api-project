import { Component, inject, OnInit } from '@angular/core';
import { ProductsServiceService } from '../../products/services/products-service.service';
import { ActivatedRoute } from '@angular/router';
import { ProductDTO } from '../../products/DTO/productDTO';
import { MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-product-detail',
  imports: [MatCard,MatCardHeader,MatCardTitle,MatCardSubtitle,MatCardContent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  productService:ProductsServiceService=inject(ProductsServiceService)
  router:ActivatedRoute=inject(ActivatedRoute)
  product:ProductDTO|undefined
    ngOnInit(): void {
       let id = this.router.snapshot.paramMap.get("id")
       this.getProductDetail(Number(id))
    }
    getProductDetail(id:number){
        this.productService.getProduct(id).subscribe((res:any)=>{
           this.product=res;
        })
    }
}
