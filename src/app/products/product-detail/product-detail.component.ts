import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MProduct } from 'src/app/model/product-model';
import { ProductService } from 'src/app/service/product-service.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Product Title';
  product: MProduct | undefined;
  productImage: any;
  errorMessage = null;
  showLoader = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.getProduct(id);
  }

  getProduct(id: number): void {
    this.showLoader = true;
    this.productService.getProduct(id).subscribe({
      next: (product) => {
        this.product = product;
        this.productImage = product?.images;
        this.showLoader = false;
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage);
      },
    });
  }

  onBack(): void {
    console.log(this.productImage);

    this.router.navigate(['/home']);
  }
}
