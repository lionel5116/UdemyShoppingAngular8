import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import {DataStorageService} from '../shared/data-storage-service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dataStorageSvc:DataStorageService) { }

  ngOnInit() {
  }

  onSaveData()
  {
    this.dataStorageSvc.storeRecipes();
  }

  onFetchData()
  {
    this.dataStorageSvc.fetchRecipes().subscribe();
  }



}
