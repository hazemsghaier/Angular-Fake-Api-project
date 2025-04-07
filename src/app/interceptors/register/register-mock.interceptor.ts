import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { registeDTO } from '../../register/DTO/registerDTO';

import { of } from 'rxjs';
import { inject } from '@angular/core';
import { ProductStateManegmentService } from '../../shared/services/product-state-manegment.service';

function verifyEmailUnicity(usersDatabase:any,email:string):boolean{
  let users=usersDatabase.users
  for (let i = 0; i < users.length; i++) {
    if(users[i].email==email){
      return false;
    }
}
  
    return true;

}
export const registerMockInterceptor: HttpInterceptorFn = (req, next) => {
  if(req.url=="api/register" && req.method=="POST"){
    const data:any=req.body;
    //verifier qu elle n existe pas dans le fichier
    let usersDatabase=inject(ProductStateManegmentService)
    let valid:boolean=verifyEmailUnicity(usersDatabase.newusersDatabase,data.email)
    if(valid){
      const newUser={id:usersDatabase.addUserId(),...data}
      usersDatabase.newusersDatabase.users.push(newUser)


      return of(new HttpResponse<any>({ status:200,
        body:{
          accessToken:"2345",
          refreshToken:"12345"
        }
      }))
    }else{
      return of(new HttpResponse({status:400,body:{
        message:"this user name already exist"
      }}))
    }
     
  }
  return next(req);
};

