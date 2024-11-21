import { Routes } from '@angular/router';
import { HomeMainComponent } from './home-main/home-main.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SucessComponent } from './sucess/sucess.component';
import { CancelComponent } from './cancel/cancel.component';


export const routes: Routes = [
    { path: "dashboard", component: HomeMainComponent },
    { path: 'products/:id', component: ProductDetailComponent },
    { path: "cart", component: CartComponent },
    {path:'',component:LoginComponent},
    {path:'signup',component:SignupComponent},
    {path:'checkout', component:CheckoutComponent},
    {path:'success',component:SucessComponent},
    {path:'cancel',component:CancelComponent}
]