import { Component, inject } from '@angular/core';
import{ MatToolbar } from '@angular/material/toolbar'
import {MatButton} from '@angular/material/button'
import { Router, RouterLink } from '@angular/router';
import { ProductStateManegmentService } from '../services/product-state-manegment.service';
@Component({
  selector: 'app-header',
  imports: [MatToolbar,MatButton,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  sharedState=inject(ProductStateManegmentService)
  private router=inject(Router)
  handelLogoClick($event:any){
    this.router.navigate(["/"])

  }
    
}
