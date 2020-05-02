import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import {AuthService,AthResponseData} from './auth.service';
import {Observable} from 'rxjs'
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent  {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  constructor(private authSvc:AuthService, private router:Router ) { }

  onHandleError()
  {
    this.error = null;
  }

   onSwitchMode()
   {
      this.isLoginMode = !this.isLoginMode; //reverses the boolean state
   }

   onSubmit(form:NgForm)
   {
      this.error = '';

      if(!form.valid){ return;}

      const email = form.value.email;
      const password = form.value.password;

      let authObs:Observable<AthResponseData>

      this.isLoading = true;

      if(this.isLoginMode)
      {
        authObs = this.authSvc.login(email,password);
      }
      else
      {
        authObs = this.authSvc.signUp(email,password)

      }
      //cleaner way of wiring up the observable to reuse it for (n) of conditions
      //place the subscribe in an observable
      authObs.subscribe(
        resData => {
          console.log(resData);
          this.isLoading = false;
          this.router.navigate(['./recipes'])
        },
        erroMessage => {
          console.log(erroMessage);
          this.error = erroMessage;
          this.isLoading = false;
        }
      )

      form.reset();
   }

  }
