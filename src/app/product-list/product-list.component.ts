import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'] // Corregir 'styleUrl' a 'styleUrls'
})
export class ProductListComponent {
  products: any[] = [];

  constructor(private productService: ProductService, 
              private router: Router  
    ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  handleSearch(searchTermOrTypeId: string | number): void {
    console.log(searchTermOrTypeId);
    if (typeof searchTermOrTypeId === 'string') {
      this.productService.searchProducts(searchTermOrTypeId).subscribe((products) => {
        this.products = products;
      });
    } else {
      // Si es un número, se trata de la búsqueda por tipo
      this.productService.searchProductsByType(searchTermOrTypeId).subscribe((products) => {
        this.products = products;
      });
    }
  }

  openEditProduct(productId: number): void {
    this.router.navigate([`/edit-product/${productId}`]);
  }

}
