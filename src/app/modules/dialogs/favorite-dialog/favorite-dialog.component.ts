import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { RecipeHttpService } from '../../../services/recipe.service';

@Component({
  selector: 'app-favorite-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './favorite-dialog.component.html',
  styleUrl: './favorite-dialog.component.scss'
})
export class FavoriteDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public recipe: any, 
    public dialogRef: MatDialogRef<FavoriteDialogComponent>,
    private recipeService: RecipeHttpService) { }
    id = 0
    ngOnInit(): void {
      console.log(this.recipe.id)
      this.id = this.recipe.id
    }

 async toggleFavorite() {
    console.log(this.id)
        const response = await this.recipeService.removeFavorite(String(this.id))
        response.subscribe((data)=> {
          console.log(data)
        })

  }
}
