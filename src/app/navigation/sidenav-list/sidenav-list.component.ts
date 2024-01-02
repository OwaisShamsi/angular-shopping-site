import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AddProductComponent } from 'src/app/products/add-product/add-product.component';
import { UpdateProductComponent } from 'src/app/products/update-product/update-product.component';
import { EventEmitterService } from 'src/app/service/event-emitter.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css'],
})
export class SidenavListComponent {
  constructor(
    private _dialog: MatDialog,
    private _router: Router,
    private eventEmitter: EventEmitterService
  ) {}
  @Output() sidenavClose = new EventEmitter();
  public onSidenavClose = () => {
    this.sidenavClose.emit();
  };

  searchUpdated(value: Event) {
    if ((value.target as HTMLInputElement).value === '') {
      this.openSnackBar();
    } else {
      this._router.navigate(['/search'], {
        queryParams: { s: (value.target as HTMLInputElement).value },
      });
      this.eventEmitter.sendClickEvent();
    }
  }

  onAddProduct() {
    this._dialog.open(AddProductComponent);
    this.onSidenavClose();
  }

  onUpdateProduct() {
    this._dialog.open(UpdateProductComponent);
    this.onSidenavClose();
  }

  openSnackBar(this: any) {
    this._snackBar.open('Please enter a Value', 'Dismiss', { duration: 3000 });
  }
}
