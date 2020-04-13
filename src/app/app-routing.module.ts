import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {RecipeStartComponent} from './recipes/recipe-start/recipe-start.component';
import {RecipeDetailComponent} from './recipes/recipe-detail/recipe-detail.component';
import {RecipeEditComponent} from './recipes/recipe-edit/recipe-edit.component';


const routes: Routes = [
  {path:'', pathMatch:  "full", redirectTo: 'recipes'},
  {path: 'recipes',component:RecipesComponent, children: [  //below are child routes of /recipes total of 4
    {path:'',component:RecipeStartComponent},      //recipes
    {path:'new',component:RecipeEditComponent},  //recipes/new - make sure this comes before the 2 route(s) below in the order below
    {path:':id',component:RecipeDetailComponent},  //recipes/0
    {path:':id/edit',component:RecipeEditComponent} //recipes/0/edit
  ]},
  {path:'shopping-list', component:ShoppingListComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
