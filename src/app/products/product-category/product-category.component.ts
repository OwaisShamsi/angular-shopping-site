import { Component, OnChanges, OnInit } from '@angular/core';
import { MatChipSelectionChange } from '@angular/material/chips';

import { MProduct } from 'src/app/model/product-model';
import { ProductService } from 'src/app/service/product-service.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css'],
})
export class ProductCategoryComponent implements OnInit, OnChanges {
  pageTitle = 'Category';
  category: MProduct[] = [];
  products: MProduct[] = [];
  searchProduct: MProduct[] = [];
  categoryProduct: MProduct[] = [];
  errorMessage: string = '';
  showLoader = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getAllProducts();
    this.getProductsCategory();

    // this.router.navigate([], { queryParams: {} });
  }

  ngOnChanges(): void {}

  private getAllProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        (this.products = products), (this.searchProduct = products);
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  private getProductsCategory(): void {
    this.productService.getProductsCategory().subscribe((products) => {
      this.category = products;
    });
  }

  selectionChanged(categories: MatChipSelectionChange) {
    if (categories.selected) {
      // console.log('selected');

      // this.router.navigate(['/category'], {
      //   queryParams: { c: categories.source.value },
      // });

      this.showLoader = true;
      this.pageTitle = 'Filtered by ' + categories.source.value;
      this.productService
        .getProductC(categories.source.value)
        .subscribe((products) => {
          this.searchProduct = products;
          this.showLoader = false;
          // console.log(this.filteredProducts);
        });
    } else {
      this.showLoader = true;
      // console.log('unselected');
      // this.router.navigate([], {
      //   queryParams: null,
      // });
      this.pageTitle = 'Category';
      this.productService.getProducts().subscribe((products) => {
        this.searchProduct = products;
        this.showLoader = false;
      });
    }
    // console.log(categories);
    // console.log(this.filteredProducts);
  }
}
