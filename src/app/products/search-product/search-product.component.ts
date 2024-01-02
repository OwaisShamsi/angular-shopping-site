import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { EventEmitterService } from 'src/app/service/event-emitter.service';
import { ProductService } from 'src/app/service/product-service.service';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css'],
})
export class SearchProductComponent implements OnInit, OnChanges, OnDestroy {
  clickEventSubscription: Subscription;
  showLoader: boolean = false;
  squery: string = '';
  errorMessage = null;
  pageTitle = '';
  searchProduct: any[] = [];

  // searchProducts

  constructor(
    private _aroute: ActivatedRoute,
    private productService: ProductService,
    private eventEmitterService: EventEmitterService
  ) {
    this.clickEventSubscription = this.eventEmitterService
      .getClickEvent()
      .subscribe(() => {
        this.searchProducts();
      });

    // if (this.eventEmitterService.subs == undefined) {
    //   this.eventEmitterService.subs =
    //     this.eventEmitterService.searchInitial.subscribe(() => {
    //       this.searchProducts();
    //     });
    // }
  }
  ngOnDestroy(): void {}

  ngOnChanges() {}
  ngOnInit(): void {
    this.searchProducts();
    // throw new Error('Method not implemented.');
  }

  private searchProducts(): void {
    this.showLoader = true;
    this._aroute.queryParams.subscribe((params) => {
      this.squery = params['s'];
    });
    setTimeout(() => {
      this.productService.searchProduct(this.squery).subscribe({
        next: (products) => {
          console.log('search query is ' + this.squery);
          this.searchProduct = products;
          if (this.searchProduct.length <= 0) {
            this.pageTitle = 'No result found for ' + this.squery;
          } else {
            this.pageTitle = 'Search Result for ' + this.squery;
          }
          this.showLoader = false;
          // console.log(this.searchProduct);
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          console.log(this.errorMessage);
        },
      });
    }, 500);

    // this.searchProduct = this.products;

    // this.productService.searchProduct(value).subscribe({
    //   next: (products) => {
    //     this.searchProduct = products;
    //     if (this.searchProduct.length <= 0) {
    //       this.pageTitle = 'No result found for ' + value;
    //     } else {
    //       this.pageTitle = 'Search Result for ' + value;
    //     }
    //     this.showLoader = false;
    //     // console.log(this.searchProduct);
    //   },
    //   error: (err) => (this.errorMessage = err),
    // });

    //   // this.searchProduct = this.products;
    //   // let result = this.searchProduct.filter((s: MProduct) =>
    //   //   s.title.toLocaleLowerCase().includes(value)
    //   // );
    //   // this.searchProduct = result;
    //   // console.log(this.searchProduct);
    //   // console.log('search products called');
    //   // this.doSearch('men');
    //   // this.searchQuery = this.route.snapshot.queryParams['q'];
    //   // console.log(this.route.snapshot.queryParams['q']);
    //   // console.log(this.searchQuery);
    //   // this.route.queryParams.subscribe((queryParam) => {
    //   //   console.log(queryParam);
    //   // });
    //   // this.productService.searchProduct().subscribe({
    //   //   next: (product) => (this.products = product),
    //   //   error: (err) => (this.errorMessage = err),
    //   // });
    //   // console.log(this.searchQuery);
    // }
  }
}
