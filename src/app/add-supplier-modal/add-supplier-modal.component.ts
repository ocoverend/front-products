// add-supplier.component.ts
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService, Supplier } from '../product.service';
import { Input } from '@angular/core';


@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier-modal.component.html',
  styleUrls: ['./add-supplier-modal.component.css'],
})
export class AddSupplierModalComponent implements OnInit {
  addSupplierForm!: FormGroup;
  suppliers: Supplier[] = [];
  //modalRef.componentInstance.productId = this.productId;
  @Input() productId!: number;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) {}
  
  ngOnInit(): void {
    this.addSupplierForm = this.formBuilder.group({
      supplierId: ['', Validators.required],
      supplierProductKey: ['', Validators.required],
      supplierCost: ['', Validators.required],
    });
  
    this.loadSuppliers();
  }
  

  onSubmit(): void {
    if (this.addSupplierForm.valid) {
      const formData = new FormData();
      formData.append('productId', this.productId.toString());
      formData.append(
        'supplierId',
        this.addSupplierForm.value.supplierId.toString()
      );
      formData.append(
        'supplierProductKey',
        this.addSupplierForm.value.supplierProductKey
      );
      formData.append(
        'supplierCost',
        this.addSupplierForm.value.supplierCost.toString()
      );

      this.productService.assignSupplier(formData).subscribe((response) => {
        this.activeModal.close('Supplier added successfully');
      });



      this.activeModal.close('Supplier added successfully');
    }
  }

  loadSuppliers(): void {
    this.productService.getSelectSuppliers().subscribe((suppliers) => {
      this.suppliers = suppliers;
    });
  }
}
