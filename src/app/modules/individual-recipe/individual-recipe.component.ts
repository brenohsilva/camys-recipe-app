import { Component, OnInit } from '@angular/core';
import { TopbarComponent } from '../topbar/topbar.component';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RecipeHttpService } from '../../services/recipe.service';
import { Recipe } from '../../interfaces/recipe.interface';

@Component({
  selector: 'app-individual-recipe',
  standalone: true,
  imports: [TopbarComponent, FormsModule],
  templateUrl: './individual-recipe.component.html',
  styleUrl: './individual-recipe.component.scss',
})
export class IndividualRecipeComponent implements OnInit {
  constructor(private activatedRoute : ActivatedRoute, private recipeService: RecipeHttpService) { }
  recipeId!: any
  recipe:Recipe = {
    id: 0,
    users_id: 0,
    name: '',
    users: ',',
    image: '',
    description: '',
    type: 0,
    time: 0,
    portions: 0,
    ingredients: [],
    steps: [],
    categories_selected: [],
  }


  async ngOnInit(): Promise<void> {
    this.recipeId = this.activatedRoute.snapshot.paramMap.get("id");
    const response = await this.recipeService.getOneRecipe(this.recipeId)

    response.subscribe((recipe)=> {
      this.recipe = recipe
    })
  }

  get doughIngredients() {
    return this.recipe.ingredients.filter(i => i.type === 'massa');
  }

  get fillingIngredients() {
    return this.recipe.ingredients.filter(i => i.type === 'recheio');
  }

  get doughSteps() {
    return this.recipe.steps.filter(i => i.type === 'massa');
  }

  get fillingSteps() {
   
    return this.recipe.steps.filter(i => i.type === 'recheio');
  }

  

}
