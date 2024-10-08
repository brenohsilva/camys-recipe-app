import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { RecipeHttpService } from '../../../services/recipe.service';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.scss',
})
export class DeleteDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public recipe: any,
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    private recipeService: RecipeHttpService
  ) {}
  id = 0;

  ngOnInit(): void {
    this.id = this.recipe.id
  }

  async removeUserRecipe(){
    const response = await this.recipeService.removeRecipe(String(this.id))
    response.subscribe((data) =>{
    })
  }
}
