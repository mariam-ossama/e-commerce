import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly httpClient = inject(HttpClient);
  countNumber:BehaviorSubject<number> = new BehaviorSubject(0);

  addProductToCart(pid:string):Observable<any> {
    return this.httpClient.post(environment.baseUrl + `cart`,
      {
    "productId": pid
}
    );
  }
  getLoggedUserCart():Observable<any> {
    return this.httpClient.get(environment.baseUrl + "cart");
  }
  updateItemQuantity(pid:string, count:number):Observable<any>{
    return this.httpClient.put(environment.baseUrl + `cart/${pid}`, 
      {
    "count": count
}
    )
  }
  deleteCartItem(pid:string):Observable<any> {
    return this.httpClient.delete(environment.baseUrl + `cart/${pid}`);
  }
  clearCart():Observable<any> {
    return this.httpClient.delete(environment.baseUrl + 'cart');
  }
}
