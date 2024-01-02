import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { PageNotFoundComponent } from './page-not-found.component';
import { PageNotFoundRoutingModule } from './page-not-found.routing.module';

console.warn('page not found module loaded');

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [CommonModule, SharedModule, PageNotFoundRoutingModule],
})
export class PageNotFoundModule {}
