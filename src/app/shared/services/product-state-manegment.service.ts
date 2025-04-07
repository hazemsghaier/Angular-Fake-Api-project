import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductStateManegmentService {
  lastId:number=0
   categoryFilter=signal("")
   isAuthentificated:boolean=false
   newusersDatabase:any={users:[]}
  constructor() { 

  }
  setCategoryFilter(selectedCategory:any){
    this.categoryFilter.set(selectedCategory)
  }
  addUserId(){
    this.lastId=this.lastId+1;
    return this.lastId;
  }
  login(email:String,password:String){
    const found = this.newusersDatabase.users.some((user: any) =>{
      return user.email === email && user.password === password
    }
      
    );

    // on met à jour le flag d'authentification
    this.isAuthentificated = found;

    return found;
  }
 
}
