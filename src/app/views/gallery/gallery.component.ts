import { ITag } from './../../models/tag.model';
import { ICategory } from './../../models/category.model';
import { GalleryService } from './../../services/gallery.service';
import { IPhoto } from './../../models/photo.model';
import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})

export class GalleryComponent implements OnInit {
  categoryControl = new FormControl();
  photos: IPhoto[] = [];
  isLoaded = false;
  resCount = 0;
  sortObj = { sortBoolean: true,
    buttonString: 'keyboard_arrow_up' };
  categories: ICategory[] = [];
  search = '';
  tags: ITag[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  categoriesArray: ICategory[] = [];
  categoriesIds: number[] = [];


  constructor(private gallery: GalleryService) { }

  ngOnInit() {
    this.loadPhotos();
    this.loadCategories();
    this.loadTags();
  }

  loadPhotos(): void {
    this.gallery.getPhotos()
      .then(data => {
        this.photos = data;
        this.isLoaded = true;
        this.resCount = data.length;
      });
  }

  loadCategories(): void {
    this.gallery.getCategories()
    .then(data => {
      this.categories = data;
    });
  }

  loadTags(): void {
    this.gallery.getTags()
    .then(data => {
      this.tags = data;
    });
  }

  sortByDate(): void {
    if (this.sortObj.sortBoolean) {
      this.sortObj.buttonString = 'keyboard_arrow_down';
      this.sortObj.sortBoolean = false;
    } else {
      this.sortObj.buttonString = 'keyboard_arrow_up';
      this.sortObj.sortBoolean = true;
    }
  }

  // paduodam category id
  // patikrinam ar tuscias array ir ar toks id yra, jei ne, pridedam
  // ismetam reikiamsus paveiksliukus
  // pats paskutinis checkas ar nera tuscias array
  // po idejimu ir jei tuscias - metam visus pav
  filterByCategories(category: ICategory): void {
    console.log('categories paimta ' + category.id + category.name);
    console.log('kai nieko ner indexas' + this.categoriesArray.indexOf(category));

    this.categoriesIds.push(category.id);
    console.log(this.categoriesIds);

    if (this.categoriesArray.indexOf(category) < 0) {
      console.log('antras if ' + this.categoriesArray.indexOf(category));
      this.categoriesArray.push(category);
      this.gallery.getImagesByCategories(this.categoriesIds)
      .then(data => {
        this.photos = data;
        this.isLoaded = true;
      });
    }

    if (this.categoriesArray.indexOf(category) > 0) {
      let categoryIndex = this.categoriesArray.indexOf(category);
      console.log('indexas' + categoryIndex);
      console.log('pirmas if pries atemima ' + this.categoriesArray.indexOf(category));
      this.categoriesArray.splice(categoryIndex, categoryIndex + 1 );
      console.log('po atemimo ' + this.categoriesArray.indexOf(category));
    }

    console.log('gale length ' + this.categoriesArray.length);
    if (this.categoriesArray.length === 0) {
      console.log('patenka i paskutini if ' + this.categoriesArray.length);
      this.loadPhotos();
    }
  }

  // chip-tags
  // visible = true;
  // selectable = true;
  // removable = true;
  // addOnBlur = true;
  // fruits: Fruit[] = [
  //   {name: 'Lemon'},
  //   {name: 'Lime'},
  //   {name: 'Apple'},
  // ];
// chip-tags
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    //add tag
    if ((value || '').trim()) {
      // pakeist id is tags?
      this.tags.push({id: 5, name: value.trim(), date: 'asd'});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag: ITag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
  // chip-end

  initSearch(e: string) {
    if (e.length > 2) {
      console.log('sending request...');
    }
  }

}
