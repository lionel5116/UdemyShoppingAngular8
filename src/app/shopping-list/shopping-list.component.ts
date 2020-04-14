import { Component, OnInit, OnDestroy } from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit ,OnDestroy{  //////used with subject/subscription - onDestroy
   ingredients:  Ingredient[] = [];
   private isChangedSub: Subscription;  //used with subject/subscription


  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    //now subscribe to emmiter in service to listen for changes in
    //the ingredients array
   this.isChangedSub =  this.shoppingListService.ingredientsChagned
    .subscribe((ingredients: Ingredient[]) =>{
        this.ingredients = ingredients;
      }
    );
  }

  //used with subject/subscription
  ngOnDestroy():void{
    this.isChangedSub.unsubscribe();
  }

}
