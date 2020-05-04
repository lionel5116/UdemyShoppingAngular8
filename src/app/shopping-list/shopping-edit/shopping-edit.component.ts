import { Component, OnInit,OnDestroy, ViewChild } from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import { Store } from '@ngrx/store';
import *  as ShoppingListActions from '../store/shopping-list.actions';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) slForm:NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem:Ingredient;

  constructor(private shoppingListService: ShoppingListService,
              private store: Store<{shoppingList:{ingredients:Ingredient[]}}>) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing
    .subscribe(
      (index:number) => {
         this.editedItemIndex = index;
         this.editMode = true;
         this.editedItem = this.shoppingListService.getIngredient(index);
         this.slForm.setValue({
           name:this.editedItem.name,
           amount:this.editedItem.amount
         })
      }
    );
  }

  //we are using the Angular Template driven approach (as opposed to the Reactive Forms Approach)
  onSubmit(form:NgForm)
  {
     const value = form.value;
     const newIngredient = new Ingredient(value.name,value.amount);

     if(this.editMode)
     {
      this.shoppingListService.updateIngredient(this.editedItemIndex,newIngredient);
     }
     else
     {
        //this.shoppingListService.addIngredient(newIngredient);  -- --CHANGED FOR NGRX WIREUP ******
        this.store.dispatch(new  ShoppingListActions.AddIngredient(newIngredient));

     }
     this.editMode = false;
     form.reset();
  }

  clearForm()
  {
     this.slForm.reset();
     this.editMode = false;
  }

  ngOnDestroy():void{
    this.subscription.unsubscribe();
  }

  onDelete()
  {
     this.shoppingListService.deleteIngredient(this.editedItemIndex);
     this.clearForm();
  }

}
