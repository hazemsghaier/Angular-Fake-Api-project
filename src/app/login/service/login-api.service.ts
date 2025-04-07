import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginAPIService {
   http=inject(HttpClient)
   apiUrl="api/login"
  constructor() { }
  login(userName:string|null,password:string|null):Observable<HttpResponse<any>>{
    return this.http.post<any>(this.apiUrl,{userName:userName,password:password},{observe:"response"})
  }

}
