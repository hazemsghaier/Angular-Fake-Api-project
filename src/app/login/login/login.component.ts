import { Component, inject, OnDestroy } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginAPIService } from '../service/login-api.service';
import { Subscription, take } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProductStateManegmentService } from '../../shared/services/product-state-manegment.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  implements OnDestroy{
 
   userName=new FormControl('',{ validators:[Validators.required,Validators.email],
    updateOn:"blur"
   })
   password=new FormControl("",{validators:[Validators.required,
    Validators.minLength(8),
    Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/) ],
    updateOn:'blur'
  })
  rememberMe=new FormControl("")

  loginService=inject(LoginAPIService)
  router=inject(Router)
  sharedStates=inject(ProductStateManegmentService)
  loginSubscribtion:Subscription|undefined
  errorMessage:string=""


   submit(event:Event){
    event.preventDefault()
    if(this.userName.valid && this.password.valid){
      this.loginSubscribtion=this.loginService.login(this.userName.value,this.password.value).subscribe((value:HttpResponse<any>)=>{
        if(value.status==200){
          localStorage.setItem("accessToken",value.body.accessToken)
          localStorage.setItem("refreshToken",value.body.accessToken)
          this.sharedStates.isAuthentificated=true

          this.router.navigate(["/"])
        }else{
          this.errorMessage="votre creadential sont invalide verifier le"
        }
  
      })
    }
   
   }
   hasError(input:string){
    if(input==="password"){
      return this.password.invalid &&( this.password.touched && this.password.dirty)
    }
    if(input=="userName"){
      return this.userName.invalid &&( this.userName.touched && this.userName.dirty)
    }
    return false
   }
   getMessageError(input:string):string|null{
       if(input=="password"){
        return this.getPasswordMessageError()
       }
       if(input=="userName"){
        return this.getUserNameMessageError()
       }
       return null
   }
   private getPasswordMessageError(){
    if(this.password.errors?.["required"]){
      return "Ce champ est requis."
    }
    if(this.password.errors?.["pattern"]){
      return "Le format du password est invalide ,il faut avoir une lettre majuscule, charachtere special,un numéro"
    }
    if(this.password.errors?.["minLength"]){
      return "le longeur du password doit etre plus long ou egale a 8"
    }
    return "probleme in code"
   }
   private getUserNameMessageError(){
    if(this.userName.errors?.["required"]){
      return "Ce champ est requis."
    }
    if(this.userName.errors?.["email"]){
      return "Le format du email est invalide "
    }
    return "probleme in code"
   }
   ngOnDestroy(): void {
    this.loginSubscribtion?.unsubscribe()
   }
}
