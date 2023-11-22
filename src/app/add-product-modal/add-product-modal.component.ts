// add-product-modal.component.ts
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

import { ProductService, ProductType } from '../product.service';

@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.css']
})
export class AddProductModalComponent {
  addProductForm: FormGroup;
  productTypes:  ProductType[] = [];
  selectedType: number = 1;

  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private productService: ProductService,
              private router: Router
    ) {
    this.addProductForm = this.formBuilder.group({
      name: '',
      description: '',
      price: 0,
      productKey: '',
      type: 1
    });

    this.loadProductsByType();
  }

  onSubmit(): void {
    // Process checkout data here
    let product = {
      name: this.addProductForm.value.name,
      price: this.addProductForm.value.price,
      productKey: this.addProductForm.value.productKey,
      typeProduct: {
          id: this.addProductForm.value.type
      }
    };

    this.productService.createProduct(product).subscribe((product) => {
      this.activeModal.close('Close click');
      // SWEET ALERT
      swal.fire({
        title: 'Producto creado',
        text: `El producto ${product.name} ha sido creado con éxito`,
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
      // redirect to product list
      this.router.navigate(['']);
    });

  }

  loadProductsByType(): void {
    this.productService.getTypes().subscribe((types: ProductType[]) => {
      this.productTypes = types;
    });
  }
}
