import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';

export const loginInterceptor: HttpInterceptorFn = (req, next) => {
  if(req.method=="POST"  && req.url==="api/login"){
    const body=req.body  as { userName: string; password: string };
    if(body.userName==="hazem@gmail.com" && body.password==="Hazem2002@"){
      return of(new HttpResponse({status:200,body:{accessToken:"{123}",refreshToken:"{321}"}}))
    }
    if(body.userName==="admin" && body.password==="Hazem2002@"){
      return of(new HttpResponse({status:200,body:{accessToken:"{123}",refreshToken:"{321}"}}))
     }
     return of(new HttpResponse({ status: 401, body: { error: 'Invalid credentials' } }));


  }
  return next(req);
};
