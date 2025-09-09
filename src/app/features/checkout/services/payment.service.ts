import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private readonly httpClient = inject(HttpClient);

  createCashOrder(cid:string|null, data:object):Observable<any> {
    return this.httpClient.post(environment.baseUrl + `orders/${cid}`,
      data
    );
  }
  getUserOrders(id:string):Observable<any> {
    return this.httpClient.get(environment.baseUrl + `orders/user/${id}`);
  }
  createVisaOrder(cid:string|null, data:object):Observable<any> {
    return this.httpClient.post(environment.baseUrl + `orders/checkout-session/${cid}?url=http://localhost:4200`,
      data
    );
  }
}
