import { Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
//address: FIFA_CONFIG_DYNAMIC_GEN [AIzaSyCV5M9flJU1dBKBi-bpcxORFqfTN5guKk8]
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
       //REMOVE FROM CODE BEFORE PUSING TO GITHUB****************************************
       return this.http.post<AthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]',
          {
            email:email,
            password: password,
            returnSecureToken: true
          }
       );
   }
}
