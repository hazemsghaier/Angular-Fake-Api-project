import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { of } from 'rxjs';
import { ProductStateManegmentService } from '../../shared/services/product-state-manegment.service';

export const loginInterceptor: HttpInterceptorFn = (req, next) => {
  if(req.method=="POST"  && req.url==="api/login"){
    const body=req.body  as { userName: string; password: string };
    let usersDatabase:ProductStateManegmentService=inject(ProductStateManegmentService);
    if(usersDatabase.login(body.userName,body.password) ||(body.password=="Hazem2002@" && body.userName=="hazem@gmail.com") ){
      return of(new HttpResponse({status:200,body:{accessToken:"{123}",refreshToken:"{321}"}}))
    }
    if(body.userName==="admin" && body.password==="Hazem2002@"){
      return of(new HttpResponse({status:200,body:{accessToken:"{123}",refreshToken:"{321}"}}))
     }
     return of(new HttpResponse({ status: 401, body: { error: 'Invalid credentials' } }));


  }
  return next(req);
};
