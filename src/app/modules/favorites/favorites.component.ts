import { Component, inject } from '@angular/core';
import { TopbarComponent } from "../topbar/topbar.component";
import { FavoriteEmptyComponent } from "../favorite-empty/favorite-empty.component";
import { MatDialog } from '@angular/material/dialog';
import { FavoriteDialogComponent } from '../dialog/favorite-dialog/favorite-dialog.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [TopbarComponent, FavoriteEmptyComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {
  readonly dialog = inject(MatDialog);
  
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(FavoriteDialogComponent, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
