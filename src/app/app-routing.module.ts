import { NgModule } from '@angular/core';
import { flush } from '@angular/core/testing';
import { RouterModule, Routes } from '@angular/router';
import { FacebookComponent } from './facebook/facebook.component';
import { ShopifyComponent } from './shopify/shopify.component';

const routes: Routes = [
  {
    path: 'shopify',
    component: ShopifyComponent,
  },
  {
    path: 'facebook',
    component: FacebookComponent
  },
  {
    path: '',
    redirectTo: 'shopify',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
