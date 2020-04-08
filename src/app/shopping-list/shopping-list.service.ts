import { Injectable,EventEmitter } from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService{
  ingredientsChagned = new EventEmitter<Ingredient[]>();
  private ingredients:  Ingredient[] = [
    new Ingredient('Apples',5),
    new Ingredient('tomatos',40)
  ];


  addIngredient(indredient:Ingredient)
  {
    this.ingredients.push(indredient);
    this.ingredientsChagned.emit(this.ingredients.slice());
  }

  getIngredients()
  {
    return this.ingredients.slice();
  }

}
