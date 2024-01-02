import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../../home/home.component';
import { ProductCategoryComponent } from '../product-category/product-category.component';

const routes: Routes = [{ path: '', component: ProductCategoryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductCategoryRoutingModule {}
