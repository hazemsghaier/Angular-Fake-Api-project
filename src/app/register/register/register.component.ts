import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { registeDTO } from '../DTO/registerDTO';
import { Subscribable, Subscriber, Subscription } from 'rxjs';
import { RegisterService } from '../service/register.service';
import { ProductStateManegmentService } from '../../shared/services/product-state-manegment.service';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
function passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value; // Récupérer la valeur de 'password'
  const confirmPassword = control.get('confirmPassword')?.value; // Récupérer la valeur de 'confirmPassword'

  if (password && confirmPassword && password !== confirmPassword) {
    return { mismatch: true }; // Retourner une erreur si les valeurs ne correspondent pas
  }

  return null; // Sinon, retourner null (aucune erreur)
}
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  formGroup:FormGroup
  registerService:RegisterService=inject(RegisterService)
  sharedState:ProductStateManegmentService=inject(ProductStateManegmentService)
  router=inject(Router)
  registerSubscribe:Subscription|undefined
  submitError:string|undefined
  constructor(){
    this.formGroup=new FormGroup({
      nom:new FormControl("",{validators:[Validators.required,Validators.pattern(/^[A-Za-z]+$/)],updateOn:"blur"}),
      prenom:new FormControl("",{validators:[Validators.required,Validators.pattern("^[A-Za-z]+$")],updateOn:"blur"}),
      email:new FormControl("",{validators:[Validators.required,Validators.email],updateOn:'blur'}),
      password:new FormControl("",{validators:[Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/) ],updateOn:"blur"}),
        confirmPassword:new FormControl("",{validators:[Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)],updateOn:"blur"}),
        age:new FormControl("",{validators:[Validators.pattern(/^[0-9]+$/),Validators.min(0)],updateOn:"blur"})
    },{validators:passwordsMatchValidator})
  }
  hasError(input:string){
      const nom =this.formGroup.controls[input]
      return nom?.invalid  && nom.dirty && nom.touched
  }
  submit(event:any){
    event.preventDefault()
    console.log("hhhhhhhhhhh")
    if(this.formGroup.valid){
      const data:registeDTO={
        nom:this.formGroup.controls["nom"].value,
        prenom:this.formGroup.controls["prenom"].value,
        password: this.formGroup.controls["password"].value,
        age:this.formGroup.controls["age"].value,
        email:this.formGroup.controls["email"].value
      }
      this.registerSubscribe=this.registerService.register(data).subscribe((next:HttpResponse<any>)=>{
        if(next.status==200){
          localStorage.setItem("accessToken",next.body.accessToken)
          localStorage.setItem("refreshToken",next.body.refreshToken)
          this.sharedState.isAuthentificated=true
          this.router.navigate(["/"])
        }else{
            this.submitError=next.body.message
        }
      })


      //send request
    }
  }
  getErrorMessage(input:string){
    const FormControl=this.formGroup.controls[input];
    if(FormControl?.errors?.["required"]){
        return "this field is required"
    }
    if(FormControl?.errors?.["minLength"]){
      return "this field is have a min length of 8"
    }
    if(FormControl?.errors?.["pattern"]){
      return "this field need to respect the pattern"//specified for every one
    }
    if(FormControl?.errors?.["email"]){
      return "this  is not a valid email"
    } 
    return "lalal"
  }
}
