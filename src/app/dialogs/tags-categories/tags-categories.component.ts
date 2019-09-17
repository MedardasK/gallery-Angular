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

  createTag(): void {
    this.tagData.append('name', this.tags.value);
    this.tagString = this.tags.value;
    this.tag = this.tags.value;
    console.log(this.tags.value);
    this.galleryService.saveTag(this.tagString).subscribe(events => {
      this.snackBar.open('New tag was successfully created!', '', {
        duration: 3000
      });
    });
  }

  createCategory(): void {
    this.categoryData.append('name', this.categories.value);
    this.galleryService.saveCategory(this.categories.value).subscribe(events => {
      this.snackBar.open('New category was successfully created!', '', {
        duration: 3000
      });
    });;
  }

}
