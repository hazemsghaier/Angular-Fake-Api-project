import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService {
  
  constructor(private http:HttpClient) { }
   getAllProducts(currentPage:number=0){
    return this.http.get("https://fakestoreapi.com/products?limit="+String(currentPage+15))
   }
   getProduct(id:number){
    return this.http.get("https://fakestoreapi.com/products/"+String(id))
   }
   getAllCategories(){
    return this.http.get("https://fakestoreapi.com/products/categories")
   }
   getProductsByCategory(category:string){
    return this.http.get(`https://fakestoreapi.com/products/category/${category}`)
   }
   
}
