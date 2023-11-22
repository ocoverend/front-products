// product.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // local host 4000
  private apiUrl = 'http://localhost:4000/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/get-all`);
  }

  searchProducts(searchTerm: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search?search=${searchTerm}`);
  }

  searchProductsByType(typeId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search-type?type=${typeId}`);
  }

  // list types select
  getTypes(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(`${this.apiUrl}/type-products`);
  }

  // get product by id
  getProductById(id: number): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/get-one`, { id });
  }

  // create product
  createProduct(product: any): Observable<Product> {
    return this.http.post<any>(`${this.apiUrl}/create`, product);
  }

  // Load suppliers of product form data
  getSuppliers(formData: FormData): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/suppliers-assigned`, formData);
  }

  // load select suppliers
  getSelectSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(`${this.apiUrl}/suppliers`);
  }

  // assignSupplier
  assignSupplier(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/assign-product-to-supplier`, formData);
  }
  // update product
  updateProduct(product: any): Observable<Product> {
    let productData = {
      id: product.id,
      name: product.name,
      price: product.price,
      productKey: product.productKey,
      typeProduct: {
        id: product.typeProduct.id
      }
    };
    return this.http.post<any>(`${this.apiUrl}/update`, productData);
  }
}

export interface ProductType {
  id: number;
  name: string;
}

export interface Supplier {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  productKey: string;
  typeProduct: string;
  active: boolean;
}
