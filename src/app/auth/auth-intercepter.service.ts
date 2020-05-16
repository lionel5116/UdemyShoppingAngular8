import { Injectable } from '@angular/core';

import {HttpInterceptor,
         HttpRequest,
         HttpHandler,
         HttpParams} from '@angular/common/http';

import {AuthService} from '../auth/auth.service';
import {take, exhaustMap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthIntercepterService implements HttpInterceptor{
  constructor(private authsrv: AuthService){}

  intercept(req: HttpRequest<any>, next: HttpHandler)
  {
    return  this.authsrv.user.pipe(
     take(1),
     exhaustMap(user => {
      if(!user) {
        return next.handle(req);
      }
      const modifiedReq = req.clone(
       {
         //this intercepts the request and addes the token that firebase needs
         params: new HttpParams().set('auth',user.token)
       }
      );
       return next.handle(modifiedReq);
     })
    );
  }
}
