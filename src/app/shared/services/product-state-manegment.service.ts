import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductStateManegmentService {
   categoryFilter=signal("")
   isAuthentificated:boolean=false
   newusersDatabase:any={users:[]}
  constructor() { 

  }
  setCategoryFilter(selectedCategory:any){
    this.categoryFilter.set(selectedCategory)
  }
 
}
