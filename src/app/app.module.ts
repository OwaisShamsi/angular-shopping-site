import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './navigation/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { UpdateProductComponent } from './products/update-product/update-product.component';
import { FooterComponent } from './navigation/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

console.warn('app module loaded');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavListComponent,
    AddProductComponent,
    UpdateProductComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
