import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TopbarComponent } from "../topbar/topbar.component";
import { SkeletonComponent } from '../skeleton/skeleton.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { RecipeComponent } from '../recipe/recipe.component';
import { OneRecipeComponent } from '../one-recipe/one-recipe.component';
import { RecipeHttpService } from '../../services/recipe.service';
import { Recipe } from '../../interfaces/recipe.interface';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgClass, TopbarComponent, TopbarComponent, SkeletonComponent, MatButtonModule, MatDialogModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  constructor(private readonly recipeService: RecipeHttpService){}

  currentPage: number = 1;
  itemsPerPage: number = 6;
  isLoading = true
  
  recipes: Recipe[] = [] 

  openDialog(recipe: any) {
    const dialogRef = this.dialog.open(OneRecipeComponent, {
      data: recipe
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
 async ngOnInit(): Promise<void> {
    const response = await this.recipeService.getAllRecipes()
    response.subscribe((recipes)=>{
      this.recipes = recipes
    })
    // setTimeout(() => {
      
    //   this.isLoading = true
    // }, 2000);
  }

  get paginatedRecipes() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.recipes.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.recipes.length / this.itemsPerPage);
  }

  get pagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((_, i) => i + 1);
  }

  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.recipes.length) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
  }
}
