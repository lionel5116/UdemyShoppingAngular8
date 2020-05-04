import { Component, OnInit, OnDestroy } from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';
import {Subscription,Observable} from 'rxjs';
import {Store} from '@ngrx/store';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit ,OnDestroy{  //////used with subject/subscription - onDestroy
   //ingredients:  Ingredient[] = [];   -- --CHANGED FOR NGRX WIREUP ******
   ingredients: Observable<{ingredients: Ingredient[]}>;
   private isChangedSub: Subscription;  //used with subject/subscription


  constructor(private shoppingListService: ShoppingListService,
              private store: Store<{shoppingList:{ingredients:Ingredient[]}}>
    ) { }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');

   /* -- --CHANGED FOR NGRX WIREUP ******
   this.ingredients = this.shoppingListService.getIngredients();
   this.isChangedSub =  this.shoppingListService.ingredientsChagned
    .subscribe((ingredients: Ingredient[]) =>{
        this.ingredients = ingredients;
      }
    );
   */
  }

  //used with subject/subscription
  ngOnDestroy():void{
    //this.isChangedSub.unsubscribe();    -- --CHANGED FOR NGRX WIREUP ******
    //this.shoppingListService.startedEditing.unsubscribe();
  }

  onEditItem(index:number)
  {
     this.shoppingListService.startedEditing.next(index);
  }

}
