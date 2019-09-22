import { ICategory } from './../../models/category.model';
import { ITag } from './../../models/tag.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GalleryService } from '../../services/gallery.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tags-categories',
  templateUrl: './tags-categories.component.html',
  styleUrls: ['./tags-categories.component.scss']
})
export class TagsCategoriesComponent implements OnInit {
  tags: FormGroup;
  categories: FormGroup;
  tagString: string;
  tag: ITag;
  categoryObj: ICategory;
  tagData = new FormData();
  categoryData = new FormData();

  constructor(private fb: FormBuilder,
              private galleryService: GalleryService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm(): void {
    this.tags = this.fb.group({
      tag: ['', [Validators.required, Validators.minLength(1)]]
    });
    this.categories = this.fb.group({
      category: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  createCategory(): void {
    this.galleryService.saveCategory(this.categories.get('category').value).subscribe(() => {
      this.snackBar.open('New category was successfully created!', '', {
        duration: 3000
      });
    });
  }

  createTag(): void {
    this.galleryService.saveTag(this.tags.get('tag').value).subscribe(() => {
      this.snackBar.open('New tag was successfully created!', '', {
        duration: 3000
      });
    });
  }

}
