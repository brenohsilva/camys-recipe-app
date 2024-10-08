import { AfterViewChecked, Component, inject, OnInit } from '@angular/core';
import { TopbarComponent } from "../topbar/topbar.component";
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';
import { FavoriteEmptyComponent } from "../favorite-empty/favorite-empty.component";
import { EmptyMyRecipesComponent } from "../empty-my-recipes/empty-my-recipes.component";
import { RecipeHttpService } from '../../services/recipe.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-recipes',
  standalone: true,
  imports: [TopbarComponent, FavoriteEmptyComponent, EmptyMyRecipesComponent, RouterLink],
  templateUrl: './my-recipes.component.html',
  styleUrl: './my-recipes.component.scss'
})
export class MyRecipesComponent implements OnInit, AfterViewChecked {
  myRecipes: any[] = []
  hasRecipes = false

  readonly dialog = inject(MatDialog)
  readonly recipeService = inject(RecipeHttpService);


  ngAfterViewChecked(){
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  }

  async ngOnInit(): Promise<void> {
    const response = await this.recipeService.getAllUserRecipes();

    response.subscribe( (data) => {
     
      if (data.status_code === 200) {
        if (data.recipes.length != 0) {
          this.myRecipes = data.recipes
          this.hasRecipes = true
        } else {
          this.hasRecipes = false 
        }
      } else {
        this.hasRecipes = false 
      }
    })
    
  }

  openDialog(recipe: any, enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DeleteDialogComponent, {
      data: recipe,
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
