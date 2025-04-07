import { Injectable } from '@angular/core';
import { cartItemDto } from '../DTO/cartItemDTO';
import { ProductDTO } from '../../products/DTO/productDTO';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  totalPriceOfCard:number=0.0
  card:[cartItemDto]|undefined

  constructor() { }
  addCardItem(product:ProductDTO,numOfProducts:number){
    
  }
}
