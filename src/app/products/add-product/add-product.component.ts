import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ProductService } from 'src/app/service/product-service.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  addForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _service: ProductService,
    private _dialogRef: DialogRef<AddProductComponent>
  ) {
    this.addForm = this._fb.group({
      title: '',
      brand: '',
      category: '',
      description: '',
      price: '',
      stock: '',
    });
  }

  onFormSubmit() {
    if (this.addForm.valid) {
      this._service.addProduct(this.addForm.value).subscribe({
        next: (val: any) => {
          alert('Added Successfully');
          this._dialogRef.close();
          console.log(val);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  }

  onCancel() {
    this._dialogRef.close();
  }
}
