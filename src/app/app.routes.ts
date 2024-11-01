import { Routes } from '@angular/router';
import { HomeMainComponent } from './home-main/home-main.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';

import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: "", component: HomeMainComponent },
    { path: "A", component: HomeComponent },

    { path: 'products/:id', component: ProductDetailComponent },
    { path: "cart", component: CartComponent },
    
];
