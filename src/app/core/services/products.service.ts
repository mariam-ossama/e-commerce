import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly httpClient = inject(HttpClient);

  getAllProducts(page:number = 1):Observable<any> {
    return this.httpClient.get(environment.baseUrl + `products?page=${page}`)
  }
}
