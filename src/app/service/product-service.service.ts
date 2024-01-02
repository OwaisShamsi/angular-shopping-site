import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MProduct } from '../model/product-model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://dummyjson.com/products?limit=100';
  private pageApiUrl = 'https://dummyjson.com/products?limit=';
  private apiCategoryUrl = 'https://dummyjson.com/products/categories';
  private apiInCategoryUrl = `https://dummyjson.com/products/category`;
  private apiSearchUrl = 'https://dummyjson.com/products/search?q=';
  constructor(private http: HttpClient) {}

  getProducts(): Observable<MProduct[]> {
    return this.http
      .get<MProduct[]>(this.apiUrl)
      .pipe(map((data: any) => data.products));
  }

  getPaginateProduct(limit: number, size: number): Observable<MProduct[]> {
    return this.http
      .get<MProduct[]>(`${this.pageApiUrl}` + `${limit}` + `&skip=${size}0`)
      .pipe(map((data: any) => data.products));
  }

  getPaginateCategory(limit: number, size: number): Observable<MProduct[]> {
    return this.http
      .get<MProduct[]>(`${this.pageApiUrl}` + `${limit}` + `&skip=${size}0`)
      .pipe(map((data: any) => data.products));
  }

  getProductsCategory(): Observable<any[]> {
    return this.http.get<MProduct[]>(this.apiCategoryUrl);
    // return this.http.get<any[]>(this.apiUrl).pipe(
    //   map((arr) => {
    //     return arr.map((sub) => {
    //       return {
    //         category: sub.category,
    //       };
    //     });
    //   })
    // );
  }

  // searchProduct(): Observable<MProduct | undefined> {
  //   return this.getProducts().pipe(
  //     map((products: MProduct[]) => products.find((p) => p.title === 'a'))
  //   );
  // }

  getProduct(id: number): Observable<MProduct | undefined> {
    return this.getProducts().pipe(
      map((products: MProduct[]) => products.find((p) => p.id === id))
    );
  }
  getProductImage(id: number): Observable<MProduct | undefined> {
    return this.getProducts().pipe(
      map((products: MProduct[]) =>
        products.find((p) => p.id === id && p.images)
      )
    );
  }

  getProductC(categories: string): Observable<MProduct[]> {
    return this.http
      .get<MProduct[]>(`${this.apiInCategoryUrl}/${categories}`)
      .pipe(map((data: any) => data.products));
  }

  addProduct(data: any): Observable<any> {
    return this.http.post('https://dummyjson.com/products/add', data);
  }

  updateProduct(data: any): Observable<any> {
    return this.http.put(`https://dummyjson.com/products/${data.pno}`, data);
  }

  searchProduct(search: string): Observable<any[]> {
    return this.http
      .get<MProduct[]>(`${this.apiSearchUrl}${search}`)
      .pipe(map((data: any) => data.products));
  }
  filterProduct(brand: string): Observable<MProduct | undefined> {
    return this.getProducts().pipe(
      map((products: MProduct[]) => products.find((p) => p.brand === brand))
    );
  }
}
