import { Routes } from '@angular/router';
import { HomeMainComponent } from './home-main/home-main.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';


export const routes: Routes = [
    { path: "dashboard", component: HomeMainComponent },
    { path: 'products/:id', component: ProductDetailComponent },
    { path: "cart", component: CartComponent },
    {path:'',component:LoginComponent},
    {path:'signup',component:SignupComponent},
]