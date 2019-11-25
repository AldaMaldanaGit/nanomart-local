import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  //{ path: '', pathMatch: 'full', redirectTo: 'list' },
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'create', component: ProductCreateComponent },
  { path: 'edit/:id', component: ProductEditComponent},
  { path: 'product-list', component: ProductsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
