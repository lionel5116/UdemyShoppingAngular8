import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {RecipeStartComponent} from './recipes/recipe-start/recipe-start.component';
import {RecipeDetailComponent} from './recipes/recipe-detail/recipe-detail.component';



const routes: Routes = [
  {path:'', pathMatch:  "full", redirectTo: 'recipes'},
  {path: 'recipes',component:RecipesComponent, children: [
    {path:'',component:RecipeStartComponent},
    {path:':id',component:RecipeDetailComponent}
  ]},
  {path:'shopping-list', component:ShoppingListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
