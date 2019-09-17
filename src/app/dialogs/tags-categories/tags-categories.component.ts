import { ITag } from './../../models/tag.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GalleryService } from '../../services/gallery.service';

@Component({
  selector: 'app-tags-categories',
  templateUrl: './tags-categories.component.html',
  styleUrls: ['./tags-categories.component.scss']
})
export class TagsCategoriesComponent implements OnInit {
  tags: FormGroup;
  categories: FormGroup;
  tag: ITag;
  tagData = new FormData();
  categoryData = new FormData();

  constructor(private fb: FormBuilder,
              private galleryService: GalleryService) { }

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
    this.tag = this.tags.value;
    console.log(this.tag);
    this.galleryService.saveTag(this.tagData);
  }
  createCategory(): void {
    this.categoryData.append('name', this.categories.value);
    // this.tag = this.tags.value;
    // console.log(this.tag);
    this.galleryService.saveCategory(this.categoryData);
  }

}
