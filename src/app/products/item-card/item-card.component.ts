import { Component, inject, Input } from '@angular/core';
import {MatCardImage,MatCard,MatCardContent,MatCardTitle,MatCardHeader,MatCardSubtitle,MatCardActions} from "@angular/material/card"
import {MatButton,MatFabButton} from "@angular/material/button"
import { Router } from '@angular/router';

import { ProductDTO } from '../DTO/productDTO';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-item-card',
  imports: [MatCardImage,MatCard,MatCardContent,MatCardTitle,MatCardSubtitle,MatCardActions
    ,MatButton,ReactiveFormsModule],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.css'
})
export class ItemCardComponent {
  @Input({
    alias:"product",
    required:true
  }) productUnit:ProductDTO|undefined;
  numberOfItemToAdd=new FormControl(0)
  showCard:boolean=false
  router:Router=inject(Router)
  handelProductClick($event:any){
     this.router.navigate([`/products/${this.productUnit?.id}`])
  }
  handelAddTocardClick(event:any){
      if(this.showCard==false){
        this.showCard=true
      }else{
        this.showCard=false
      }

  }

}
