import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ProductStateManegmentService } from '../shared/services/product-state-manegment.service';

export const isLoggedInGuard: CanActivateFn = (route, state) => {
  const sharedState=inject(ProductStateManegmentService)
  const router=inject(Router)
  if(sharedState.isAuthentificated!=true){
    if(localStorage.getItem("acessToken")===null){
      router.navigate(["/login"])
    }
  }
  return true;
};
