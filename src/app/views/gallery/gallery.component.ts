import { ITag } from './../../models/tag.model';
import { ICategory } from './../../models/category.model';
import { GalleryService } from './../../services/gallery.service';
import { IPhoto } from './../../models/photo.model';
import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})

export class GalleryComponent implements OnInit {
  categoryControl = new FormControl();
  photos: IPhoto[] = [];
  isLoaded = false;
  isLoggedIn = false;
  loginString = 'LOGIN';
  loginIcon = 'account_box';
  resCount = 0;
  sortObj = { sortBoolean: true,
              buttonString: 'keyboard_arrow_up' };
  categories: ICategory[] = [];
  search = '';
  tags: ITag[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  categoriesArray: ICategory[] = [];
  categoriesIds: number[] = [];


  constructor(private gallery: GalleryService,
              private router: Router,
              private auth: AuthService) { }

  ngOnInit() {
    this.loadPhotos();
    this.loadCategories();
    this.loadTags();
    this.checkCookie();
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
      this.tags.push({id: 5, name: value.trim()});
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

  checkCookie() {
    if (this.auth.loggedIn) {
      console.log(this.auth.loggedIn);
      console.log('prisijunges');
      this.isLoggedIn = true;
      this.loginString = 'LOGOUT';
      this.loginIcon = 'directions_run';
    } else {
      console.log(this.auth.loggedIn);
      console.log('ne');
      this.isLoggedIn = false;
      this.loginString = 'LOGIN';
      this.loginIcon = 'account_box';
    }
  }

  loginOrOut() {
    if (this.isLoggedIn) {
      this.auth.logout();
      this.isLoggedIn = false;
      this.loginString = 'LOGIN';
      this.loginIcon = 'account_box';
      return;
    }
    this.loginString = 'LOGOUT';
    this.loginIcon = 'directions_run';
    this.router.navigate(['login']);
  }

}
