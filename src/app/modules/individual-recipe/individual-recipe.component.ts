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
  recipeId!: any
  isFavorite: boolean = false;
  favoriteId!: number | string;

  async ngOnInit(): Promise<void> {
    this.recipeId = this.activatedRoute.snapshot.paramMap.get("id");
    await this.recipeService.findOneFavorite(this.recipeId).subscribe((data)=>
      { 
        console.log(data)
        if (data.status_code === 200) {

          this.isFavorite = true
        } else {
          this.isFavorite = false
        }
      })
    const response = await this.recipeService.getOneRecipe(this.recipeId)

    response.subscribe((recipe)=> {
      this.recipe = recipe
    })
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    if (this.isFavorite) {
      const response = this.recipeService.saveFavorite(this.recipeId)
      response.subscribe((data)=>{
        this.favoriteId = data.id
      })
    } 
    if (!this.isFavorite) {
      console.log("Ola amigos")
      if (this.favoriteId) {
        const response = this.recipeService.removeFavorite(String(this.favoriteId))
        response.subscribe((data)=> {
          this.favoriteId = 0
        })
      }
    }
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
