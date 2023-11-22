import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AddProductModalComponent } from './add-product-modal/add-product-modal.component';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'edit-product/:id', component: EditProductComponent },
  { path: 'add-product', component: AddProductModalComponent },
  { path: 'product-list', component: ProductListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
