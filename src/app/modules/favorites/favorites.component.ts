import { Component, inject, OnInit } from '@angular/core';
import { TopbarComponent } from "../topbar/topbar.component";
import { FavoriteEmptyComponent } from "../favorite-empty/favorite-empty.component";
import { MatDialog } from '@angular/material/dialog';
import { FavoriteDialogComponent } from '../dialogs/favorite-dialog/favorite-dialog.component';
import { RecipeHttpService } from '../../services/recipe.service';
import { Recipe } from '../../interfaces/recipe.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [TopbarComponent, FavoriteEmptyComponent, RouterLink],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent implements OnInit {
  favoritedRecipes: any[] = []

  readonly dialog = inject(MatDialog);
  readonly recipeService = inject(RecipeHttpService);
  
  async ngOnInit(): Promise<void> {
    const response = await this.recipeService.findAllFavorites()

    response.subscribe( (data) => {
      this.favoritedRecipes = data.recipes
    })
    
  }
  
  openDialog(recipe: any, enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(FavoriteDialogComponent, {
      data: recipe,
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
