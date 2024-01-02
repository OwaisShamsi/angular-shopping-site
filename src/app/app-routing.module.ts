import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { ProductDetailGuard } from './guards/product-detail.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((mod) => mod.HomeModule),
  },
  {
    path: 'products/:id',
    loadChildren: () =>
      import('./products/product-detail/product-detail.module').then(
        (mod) => mod.ProductDetailModule
      ),
    canActivate: [ProductDetailGuard],
  },
  {
    path: 'category',
    loadChildren: () =>
      import('./products/product-category/product-category.module').then(
        (mod) => mod.ProductCategoryModule
      ),
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./products/search-product/search-product.module').then(
        (mod) => mod.SearchProductModule
      ),
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent,
    loadChildren: () =>
      import('./page-not-found/page-not-found.module').then(
        (mod) => mod.PageNotFoundModule
      ),
  },
  {
    path: '**',
    redirectTo: 'page-not-found',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // enableTracing: true,
      scrollPositionRestoration: 'enabled',
    }),
  ],
  // imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
