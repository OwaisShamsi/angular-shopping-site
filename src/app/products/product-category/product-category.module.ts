import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ProductCategoryComponent } from './product-category.component';
import { ProductCategoryRoutingModule } from './product-category-routing.module';
import { HomeModule } from 'src/app/home/home.module';

console.warn('product category module loaded');
@NgModule({
  declarations: [ProductCategoryComponent],
  imports: [SharedModule, ProductCategoryRoutingModule, HomeModule],
})
export class ProductCategoryModule {}
