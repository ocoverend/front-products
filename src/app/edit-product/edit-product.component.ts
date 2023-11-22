// edit-product.component.ts

import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddSupplierModalComponent } from '../add-supplier-modal/add-supplier-modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']  // Corregir 'styleUrl' a 'styleUrls'
})
export class EditProductComponent implements OnInit {

  productId: number = 0;
  product: Product = {
    id: 0,
    name: '',
    price: 0,
    productKey: '',
    typeProduct: '',
    active: false
  };
  
  suppliers: any[] = [];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private modalService: NgbModal,

  ) { 
  }

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getProductById(this.productId).subscribe(
      (product: Product) => {
        this.product = product;
        // load suppliers
        this.loadSuppliers(product.id);
        
      },
      (error) => {
        console.error('Error loading product:', error);
        // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error o redirigir a una página de error.
      }

    );
  }

  loadSuppliers(id: any): void {
    let formData = new FormData();
    // take id 
    formData.append('productId', id);
    this.productService.getSuppliers(formData).subscribe((suppliers) => {
      this.suppliers = suppliers;
    });
  }

  addSupplier(): void {
    // load modal
    const modalRef = this.modalService.open(AddSupplierModalComponent, { size: 'lg' });
    // pass product id
    modalRef.componentInstance.productId = this.productId;

    // Puedes realizar acciones adicionales después de que se cierre el modal
    modalRef.result.then(
      (result) => {
        console.log(`Modal cerrado con resultado: ${result}`);
        // reload suppliers
        this.loadSuppliers(this.productId);
      },
      (reason) => {
        console.log(`Modal descartado con razón: ${reason}`);
      }
    );
    
  }

  updateProduct(): void {
    // alert(JSON.stringify(this.product));
    this.productService.updateProduct(this.product).subscribe((product) => {
      Swal.fire({
        title: 'Producto actualizado',
        text: `El producto ${product.name} ha sido actualizado con éxito`,
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
    });
  }
}
