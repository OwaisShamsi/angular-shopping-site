import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatOptionSelectionChange } from '@angular/material/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable, Subscription } from 'rxjs';

import { MProduct } from '../model/product-model';
import { EventEmitterService } from '../service/event-emitter.service';
import { ProductService } from '../service/product-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy, OnChanges {
  @Input() pageTitle: string = 'Trending Products';
  @Input() isLoading: boolean = false;
  sub!: Subscription;
  @Input() products: MProduct[] = [];
  @Input() searchProduct: MProduct[] = [];
  brands: any[] = [];
  filterBrand: string[] = [];
  errorMessage: any = null;
  searchQuery: string = '';
  @Input() testText: string = 'test';
  @Input() showLoader: boolean = false;
  @ViewChild('content') widgetsContent!: ElementRef;
  datasource: any[] = [];
  dataSource: Observable<MProduct[]> = this.productService.getPaginateProduct(
    10,
    0
  );

  constructor(
    private productService: ProductService,
    private eventEmitterService: EventEmitterService
  ) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllBrands();

    // this.searchProducts();
    // this.router.navigate(['']);
    // console.log(this.products);
    // if (this.eventEmitterService.subs == undefined) {
    //   this.eventEmitterService.subs =
    //     this.eventEmitterService.searchInitial.subscribe((value: string) => {
    //       this.searchProducts(value);
    //     });
    // }
  }
  ngOnChanges(): void {
    this.getAllBrands();
    console.log('on changes called in home component');

    // this.searchProduct = this.products;
  }

  // Code to search in same component

  selectionChanged(event: MatOptionSelectionChange) {
    if (event.isUserInput === true) {
      this.searchProduct = this.products;
      const result = this.searchProduct.filter((s: MProduct) =>
        s.brand.includes(event.source.value)
      );
      this.searchProduct = result;

      // console.log(this.searchProduct);
      // this.searchProduct = this.products;
      //   this.productService.filterProduct(event.source.value).subscribe({
      //     next: (products) => {
      //       this.searchProduct = products;
      //     },
      //   });
      // }
    }
  }

  // private doSearch(value: any): MProduct[] {
  //   return this.searchProduct.filter((searchProduct: MProduct) => {
  //     searchProduct.title.toLocaleLowerCase().includes('');
  //     console.log(this.products);
  //   });

  //   // this.productService.searchProduct().subscribe((searchedProducts) => {
  //   //   // this.products = searchedProducts;
  //   // });
  // }

  private getAllBrands(): void {
    this.filterBrand = this.searchProduct.map((i) => i.brand);
    this.filterBrand = [...new Set(this.filterBrand)];
  }

  private getAllProducts(): void {
    this.showLoader = true;
    this.productService.getProducts().subscribe({
      next: (products) => {
        (this.products = products),
          (this.searchProduct = products),
          (this.brands = products);
        this.showLoader = false;
        this.getAllBrands();
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage);
      },
    });
  }

  onResetFilter() {
    console.log('in reset filter');
    this.searchProduct = this.products;
  }

  leftScroll() {
    this.widgetsContent.nativeElement.scrollLeft -= 400;
  }

  rightScroll() {
    this.widgetsContent.nativeElement.scrollLeft += 400;
  }

  onPaginate(event: PageEvent) {
    console.log(event);
    let page = event.pageIndex;
    page = page;
    console.log(page);

    this.dataSource = this.productService.getPaginateProduct(10, page);
  }
}
