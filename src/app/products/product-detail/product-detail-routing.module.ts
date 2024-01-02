import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../../home/home.component';
import { ProductCategoryComponent } from '../product-category/product-category.component';
import { ProductDetailComponent } from './product-detail.component';
import { SearchProductComponent } from '../search-product/search-product.component';

const routes: Routes = [{ path: '', component: ProductDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductDetailRoutingModule {}
