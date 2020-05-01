import { Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError,tap} from 'rxjs/operators';
import {throwError,Subject,BehaviorSubject} from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
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
  //Behaviour subject is the same as Subject, the only difference is that it allows you take either one subscription or many ongoing subscriptions
  user = new BehaviorSubject<User>(null);
  constructor(private http: HttpClient,private router:Router) {}

  signUp(email: string, password: string)
  {
       return this.http.post<AthResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCV5M9flJU1dBKBi-bpcxORFqfTN5guKk8',
          {
            email:email,
            password: password,
            returnSecureToken: true
          }
        )
        .pipe(catchError(this.handleError),tap(resData => {  //the tap() method allows us to do something else with the response
             this.handleAuthentication(resData.email,
                                       resData.localId,
                                       resData.idToken,
                                       +resData.expiresIn); //the (+) on resData means convert to a number

         })
        );
   }

   login(email:string , password: string)
   {

     return this.http.post<AthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCV5M9flJU1dBKBi-bpcxORFqfTN5guKk8',
     {
       email:email,
       password: password,
       returnSecureToken: true
     })
     .pipe(catchError(this.handleError),tap(resData => {  //the tap() method allows us to do something else with the response
      this.handleAuthentication(resData.email,
                                resData.localId,
                                resData.idToken,
                                +resData.expiresIn); //the (+) on resData means convert to a number

      })
     );
   }

   logOut(){
     this.user.next(null);
     this.router.navigate(['/auth']);
   }

   private handleAuthentication(email: string,userId: string, token:string, expiresIn: number)
   {
      //below converts the current date to milliseconds added to the response expiration that we convert to milliseconds
      const expirationDate = new Date(new Date().getTime() + expiresIn * 1000) //the (+) on resData means convert to a number
      const user = new User(
                    email,
                    userId,
                    token,
                    expirationDate);
          this.user.next(user);  //like observable push, subjects use .next  (set/emit)
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
