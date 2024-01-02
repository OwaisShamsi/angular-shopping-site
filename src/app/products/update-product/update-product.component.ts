import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ProductService } from 'src/app/service/product-service.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent {
  updateForm: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _service: ProductService,
    private _dialogRef: DialogRef<UpdateProductComponent>
  ) {
    this.updateForm = this._fb.group({
      pno: '',
      title: '',
      brand: '',
      category: '',
      description: '',
      price: '',
      stock: '',
    });
  }

  onFormSubmit() {
    if (this.updateForm.valid) {
      this._service.updateProduct(this.updateForm.value).subscribe({
        next: (val: any) => {
          alert('Updated Successfully');
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
