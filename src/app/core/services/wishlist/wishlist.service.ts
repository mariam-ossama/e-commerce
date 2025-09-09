import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private readonly httpClient = inject(HttpClient);

  addToWishlist(pid:string):Observable<any> {
    return this.httpClient.post(environment.baseUrl + 'wishlist',
      {
    "productId": pid
}
    );
  }
  removeFromWishlist(pid:string):Observable<any> {
    return this.httpClient.delete(environment.baseUrl + `wishlist/${pid}`)
  }
  getWishlist():Observable<any> {
    return this.httpClient.get(environment.baseUrl + 'wishlist')
  }
}
