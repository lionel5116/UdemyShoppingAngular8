import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Params,Router} from '@angular/router';
import { FormGroup,FormControl,FormArray,Validators } from '@angular/forms';
import {RecipeService} from '../recipe.service';
import {Recipe} from '../recipe.model';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id:number;
  editMode = false;
  recipeForm:FormGroup;
  constructor(private route:ActivatedRoute,
              private recipeService:RecipeService,
              private router:Router) {

  }

  ngOnInit() {

    this.route.params
      .subscribe (
        (params:Params) => {
            this.id = params['id'];
            this.editMode = params['id'] != null;
            console.log("Id =" + this.id);
            this.initForm();
        }
      );
  }

  onSubmit()
   {
    /*
    const newRecipe = new Recipe(
       this.recipeForm.value['name'],
       this.recipeForm.value['description'],
       this.recipeForm.value['imagePath'],
       this.recipeForm.value['ingredients']
     );
     */
    //this.recipeForm.value = a recipe object
     if(this.editMode)
     {
       this.recipeService.updateRecipe(this.id,this.recipeForm.value)
     }
     else
     {
      this.recipeService.addRecipe(this.recipeForm.value);
     }
      this.onCancel();
   }

   private initForm() {
       let recipeName = '';
       let recipeImagePath = '';
       let recipeDescription = '';
       let recipeIngredients = new FormArray([]);


       if(this.editMode){
        const recipe = this.recipeService.getRecipe(this.id);
        recipeName = recipe.name;
        recipeImagePath = recipe.imagePath;
        recipeDescription = recipe.description;
          if (recipe['ingredients'])
          {
            for (let indgredient of recipe.ingredients)
            {
              recipeIngredients.push(
                new FormGroup({
                 'name': new FormControl(indgredient.name,Validators.required),
                 'amount': new FormControl(indgredient.amount,
                  [Validators.required,
                   Validators.pattern(/^[1-9]+[0-9]*$/)
                  ])
                })
              )
            };
          }
       }

       this.recipeForm = new FormGroup({
        'name': new FormControl(recipeName,Validators.required),
        'imagePath':new FormControl(recipeImagePath,Validators.required),
        'description':new FormControl(recipeDescription,Validators.required),
        'ingredients': recipeIngredients
      });
   }

   get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient()
  {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null,Validators.required),
        'amount': new FormControl(null, [Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
         ])
       })
    );
  }

  onCancel()
  {
     this.router.navigate(['../'], {relativeTo: this.route}); //go up one level
  }

  onDeleteIngredient(index:number)
  {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onRemoveAllIngredients()
  {
    (<FormArray>this.recipeForm.get('ingredients')).clear();  //this method removes all items from the array
  }

}
