import { Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

//these were taken from the website - firebase, for the response payload
interface AthResponseData {
  idToken:	string;
  email:	string;
  refreshToken : string;
  expiresIn	 : string;
  localId : string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService
{
  constructor(private http: HttpClient) {

  }
   signUp(email: string, password: string)
   {
       //API KEY IS FROM FIRBASE-PROJECT SETTINGS - SEE EVERNOTE
       //look at the notes in evernote , it descibes how you need to format the request body payload
       //**************************NEED TO GRAB API KEY FROM TEXT FILE  ****************************************************************
       return this.http.post<AthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=',
          {
            email:email,
            password: password,
            returnSecureToken: true
          }
       );
   }
}
