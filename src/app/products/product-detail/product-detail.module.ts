import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ProductDetailRoutingModule } from './product-detail-routing.module';
import { ProductDetailComponent } from './product-detail.component';

console.warn('product detail module loaded');
@NgModule({
  declarations: [ProductDetailComponent],
  imports: [SharedModule, ProductDetailRoutingModule],
})
export class ProductDetailModule {}
