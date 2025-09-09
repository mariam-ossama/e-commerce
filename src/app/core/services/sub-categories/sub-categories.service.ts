import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SubCategoriesService {
  private readonly httpClient = inject(HttpClient);

  //! get all subcategories of specific category 
  getSubcategoriesOfCategory(categoryId:string|null):Observable<any> {
    return this.httpClient.get(environment.baseUrl + `categories/${categoryId}/subcategories`);
  }
}
