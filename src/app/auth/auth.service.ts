import { Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
//address: FIFA_CONFIG_DYNAMIC_GEN [AIzaSyCV5M9flJU1dBKBi-bpcxORFqfTN5guKk8]
//these were taken from the website - firebase, for the response payload
export interface AthResponseData {
  idToken:	string;
  email:	string;
  refreshToken : string;
  expiresIn	 : string;
  localId : string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService
{
  constructor(private http: HttpClient) {}

  signUp(email: string, password: string)
  {
       return this.http.post<AthResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]',
          {
            email:email,
            password: password,
            returnSecureToken: true
          }
        )
        .pipe(catchError(this.handleError));
   }

   login(email:string , password: string)
   {

     return this.http.post<AthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]',
     {
       email:email,
       password: password,
       returnSecureToken: true
     })
     .pipe(catchError(this.handleError));
   }

   private handleError(errorResp: HttpErrorResponse){
    let erroMessage = 'An unknown error occured';
      if (!errorResp.error || !errorResp.error.error)
      {
        return throwError(erroMessage);
      }

      switch(errorResp.error.error.message) {
        case 'EMAIL_EXISTS':
          erroMessage = 'This email exists already';
          break;
        case 'INVALID_PASSWORD':
          erroMessage = 'Invalid Password entered!!!';
          break;
          case 'USER_DISABLED':
            erroMessage = 'User account disabled!!!';
            break;
        default:
          erroMessage = 'An occured!!!!';
      }
    return throwError(erroMessage);
   }

}
