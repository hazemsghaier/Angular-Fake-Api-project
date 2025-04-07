import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { registeDTO } from '../DTO/registerDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  http=inject(HttpClient)
  constructor() { }
  register(data:registeDTO):Observable<HttpResponse<any>>{
    return this.http.post<any>("api/register",{data},{observe:"response"})
  }
  
}
