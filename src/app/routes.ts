import { Routes } from '@angular/router';
import { CartComponent } from './pages/cart/cart.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductsComponent } from './pages/products/products.component';
import { AuthComponent } from './pages/auth/auth.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'account/:type', component: AuthComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  { path: 'products/:category', component: ProductsComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: '**', redirectTo: 'home' },
];
