import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { EventEmitterService } from 'src/app/service/event-emitter.service';
import { AddProductComponent } from 'src/app/products/add-product/add-product.component';
import { UpdateProductComponent } from 'src/app/products/update-product/update-product.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  routerLink: string = '';
  searchQuery: string = '';
  showSearch!: boolean;
  constructor(
    private _dialog: MatDialog,
    private _router: Router,
    private eventEmitter: EventEmitterService,
    private _snackBar: MatSnackBar
  ) {
    // this.router.events.subscribe((val) => {
    //   if (val instanceof NavigationEnd) {
    //     if (val.url == '/' || val.url == '/category') {
    //       this.showSearch = false;
    //     } else {
    //       this.showSearch = true;
    //     }
    //   }
    // });
    // this.routerLink = this.Location.path();
    // console.log('router link ' + this.Location.path());
  }

  ngOnInit(): void {}
  public _listFilter: string = '';
  @Output() public sidenavToggle = new EventEmitter();

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  };

  // onSubmit() {
  //   this.router.navigate(['/search'], {
  //     queryParams: { q: this._listFilter },
  //   });
  //   // console.log(this._listFilter);
  // }

  searchUpdated(value: Event) {
    console.log(value);

    this.searchQuery = (value.target as HTMLInputElement).value;
    if (this.searchQuery === '') {
      this.openSnackBar();
    } else {
      this._router.navigate(['/search'], {
        queryParams: { s: this.searchQuery },
      });
      this.eventEmitter.sendClickEvent();
    }

    // this.eventEmitterService.onSearch();
    // this.router.navigate([], {
    //   queryParams: { q: (value.target as HTMLInputElement).value },
    // });
    // console.log((value.target as HTMLInputElement).value);
  }

  onAddProduct() {
    this._dialog.open(AddProductComponent);
  }

  onUpdateProduct() {
    this._dialog.open(UpdateProductComponent);
  }

  openSnackBar(this: any) {
    this._snackBar.open('Please enter a Value', 'Dismiss', { duration: 3000 });
  }
}
