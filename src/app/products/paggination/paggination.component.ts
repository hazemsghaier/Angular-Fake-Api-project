import { Component } from '@angular/core';

@Component({
  selector: 'app-paggination',
  imports: [],
  templateUrl: './paggination.component.html',
  styleUrl: './paggination.component.css'
})
export class PagginationComponent {
  currentPage:number=0;
  next($event:any){
  }



}
