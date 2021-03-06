import {Ingredient} from '../../shared/ingredient.model';
import *  as ShoppingListActions from './shopping-list.actions';


const initialState = {
  ingredients: [
    new Ingredient('Apples',5),
    new Ingredient('tomatos',40)
  ]
};

export function shoppingListReducer(state = initialState,
  action:ShoppingListActions.AddIngredient)
{
   switch(action.type)
   {
     case ShoppingListActions.ADD_INGREDIENT:
       return {
         ...state,
         ingredients: [...state.ingredients,action.payload]
       };
     default:
      return state;
   }
}
