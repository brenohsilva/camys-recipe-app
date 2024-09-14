import { Component, inject } from '@angular/core';
import { TopbarComponent } from "../topbar/topbar.component";
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';
import { FavoriteEmptyComponent } from "../favorite-empty/favorite-empty.component";
import { EmptyMyRecipesComponent } from "../empty-my-recipes/empty-my-recipes.component";

@Component({
  selector: 'app-my-recipes',
  standalone: true,
  imports: [TopbarComponent, FavoriteEmptyComponent, EmptyMyRecipesComponent],
  templateUrl: './my-recipes.component.html',
  styleUrl: './my-recipes.component.scss'
})
export class MyRecipesComponent {
  readonly dialog = inject(MatDialog)

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DeleteDialogComponent, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
