import { Injectable,EventEmitter } from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService{
  //ingredientsChagned = new EventEmitter<Ingredient[]>();
  ingredientsChagned = new Subject<Ingredient[]>();
  private ingredients:  Ingredient[] = [
    new Ingredient('Apples',5),
    new Ingredient('tomatos',40)
  ];


  addIngredient(indredient:Ingredient)
  {
    this.ingredients.push(indredient);
    //when this emits, it is subscribed to in the shopping-list component
    //in the ngOnIt() that listens for changes to update the ingredients array
    //this.ingredientsChagned.emit(this.ingredients.slice());
    this.ingredientsChagned.next(this.ingredients.slice());
  }

  getIngredients()
  {
    return this.ingredients.slice();
  }

  addIngredients(ingredients: Ingredient[]) {
     this.ingredients.push(...ingredients);
     //this.ingredientsChagned.emit(this.ingredients.slice());
     this.ingredientsChagned.next(this.ingredients.slice());
  }

}
