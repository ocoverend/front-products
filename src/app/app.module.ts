import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';

import { HttpClientModule,HttpClient } from '@angular/common/http';
import { ProductService } from './product.service';
import { ProductSearchComponent } from './product-search/product-search.component';
import { FormsModule } from '@angular/forms';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AddProductModalComponent } from './add-product-modal/add-product-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ReactiveFormsModule } from '@angular/forms';
import { AddSupplierModalComponent } from './add-supplier-modal/add-supplier-modal.component';



@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductSearchComponent,
    EditProductComponent,
    AddProductModalComponent,
    AddSupplierModalComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule
    
    
  ],
  providers: [
    ProductService,
    HttpClient
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
