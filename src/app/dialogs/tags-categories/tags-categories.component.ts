import { ICategory } from './../../models/category.model';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GalleryService } from '../../services/gallery.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tags-categories',
  templateUrl: './tags-categories.component.html',
  styleUrls: ['./tags-categories.component.scss']
})
export class TagsCategoriesComponent {
  tag = '';
  category = '';

  constructor(private galleryService: GalleryService,
              private snackBar: MatSnackBar) { }

  createCategory(): void {
    this.galleryService.saveCategory(this.category).subscribe(() => {
      this.snackBar.open('New category was successfully created!', '', {
        duration: 3000
      });
    });
  }

  createTag(): void {
    this.galleryService.saveTag(this.tag).subscribe(() => {
      this.snackBar.open('New tag was successfully created!', '', {
        duration: 3000
      });
    });
  }

}
