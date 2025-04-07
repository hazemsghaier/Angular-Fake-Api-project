import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products/products.component';
import { ProductDetailComponent } from './ProductDetail/product-detail/product-detail.component';
import { CartsComponent } from './carts/carts/carts.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './register/register/register.component';
import { isLoggedInGuard } from './guards/is-logged-in.guard';
//le route va etre un dictionnere composée initialement du cette forme
/*{
page:"mon route",
component :nom du component  
}*/
export const routes: Routes = [
    {path:"products",component:ProductsComponent,canActivate:[isLoggedInGuard]},
    {path:"card",component:CartsComponent,canActivate:[isLoggedInGuard]},
    {path:"products/:id",component:ProductDetailComponent,canActivate:[isLoggedInGuard]},
    {path:"login",component:LoginComponent},
    {path:"register",component:RegisterComponent}
    ,{path:"**",redirectTo:"products",pathMatch:"full"}
];
