import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { UserToken } from '../../models/user-token.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly cookieServive = inject(CookieService);
  private readonly router = inject(Router);

  register(data:object):Observable<any>{
    return this.httpClient.post(environment.baseUrl + 'auth/signup', data);
  }
  login(data:object):Observable<any>{
    return this.httpClient.post(environment.baseUrl + 'auth/signin', data);
  }
  logOut():void{
    if(this.cookieServive.get('token') && (this.cookieServive.get('token') != null)){
      // delete token
      this.cookieServive.delete('token');
    }
    // navigate to login page
    this.router.navigate(['/login']);
  }
 decodeToken():UserToken {
  return jwtDecode(this.cookieServive.get('token'));
 }

 // forgot password
 verifyUserEmail(data:object):Observable<any> {
  return this.httpClient.post(environment.baseUrl + `auth/forgotPasswords`,
    data
  )
 }
  verifyUserResetCode(data:object):Observable<any> {
  return this.httpClient.post(environment.baseUrl + `auth/verifyResetCode`,
    data
  );
 }
 resetUserPassword(data:object):Observable<any> {
  return this.httpClient.put(environment.baseUrl + `auth/resetPassword`,
    data
  );
 }

 // update user password
 updateUserPassword(data:object):Observable<any>{
  return this.httpClient.put(environment.baseUrl + 'users/changeMyPassword',
    data
  )
 }



 // User addresses
}
