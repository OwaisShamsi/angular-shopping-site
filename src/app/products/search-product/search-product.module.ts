import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { SearchProductComponent } from './search-product.component';
import { SearchProductRoutingModule } from './search-product-routing.module';
import { HomeModule } from 'src/app/home/home.module';

console.warn('search product module loaded');
@NgModule({
  declarations: [SearchProductComponent],
  imports: [CommonModule, SharedModule, SearchProductRoutingModule],
})
export class SearchProductModule {}
