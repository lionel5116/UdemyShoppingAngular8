import { Component, OnInit,EventEmitter,Output, OnDestroy } from '@angular/core';
import {DataStorageService} from '../shared/data-storage-service';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private dataStorageSvc:DataStorageService, private authsrv: AuthService) { }

  ngOnInit() {
    this.userSub = this.authsrv.user.subscribe( user => {
       //this.isAuthenticated = !user ? false : true;  //if null when we subscribe after logging in, false, else if not null, true
       this.isAuthenticated = !!user;  //new shortcut way (means the same as above) true/falss notation
    }); //grab any changes from the observable when the state changes for the user object
  }

  ngOnDestroy()
  {
    this.userSub.unsubscribe();
  }

  onSaveData()
  {
    this.dataStorageSvc.storeRecipes();
  }

  onFetchData()
  {
    this.dataStorageSvc.fetchRecipes().subscribe();
  }

  onLogout()
  {
    this.authsrv.logOut();
  }



}
