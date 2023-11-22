// product-search.component.ts

import { Component, Output, EventEmitter } from '@angular/core';
import { ProductService, ProductType } from '../product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddProductModalComponent } from '../add-product-modal/add-product-modal.component';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent {
  @Output() searchEvent = new EventEmitter<string>();
  selectedType: number = 1;
  productTypes: ProductType[] = [];
  searchTerm: string = '';

  constructor(private productService: ProductService, private modalService: NgbModal
    ) {
    this.productService.getTypes().subscribe((types: ProductType[]) => {
      this.productTypes = types;
    });
  }



  loadProductsByType(): void {
    this.productService.getTypes().subscribe((types: ProductType[]) => {
      this.productTypes = types;
    });
  }

  search(): void {
    this.searchEvent.emit(this.searchTerm);
  }

  // emit event search by type
  searchByType(): void {
    const selectedTypeId = Number(this.selectedType);
    this.searchEvent.emit(selectedTypeId.toString());
  }

  openAddProduct(): void {
    // Abre un modal utilizando el servicio NgbModal
    const modalRef = this.modalService.open(AddProductModalComponent, { size: 'lg' });

    // Puedes realizar acciones adicionales después de que se cierre el modal
    modalRef.result.then(
      (result) => {
        console.log(`Modal cerrado con resultado: ${result}`);
      },
      (reason) => {
        console.log(`Modal descartado con razón: ${reason}`);
      }
    );
  }
}
