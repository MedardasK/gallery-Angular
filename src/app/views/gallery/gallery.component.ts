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
    this.checkCookie();
  }

  private loadPhotos(): void {
    this.gallery.getPhotos()
      .then(data => {
        this.photos = data;
        this.isLoaded = true;
        this.resCount = data.length;
      });
  }

  private loadCategories(): void {
    this.gallery.getCategories()
    .then(data => {
      this.categories = data;
    });
  }

  sortByDate(): void {
    if (this.sortObj.sortBoolean) {
      this.sortObj.buttonString = 'keyboard_arrow_down';
      this.sortObj.sortBoolean = false;
      this.photos.sort(
        (a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
      );
      console.log(this.photos);
    } else {
      this.sortObj.buttonString = 'keyboard_arrow_up';
      this.sortObj.sortBoolean = true;
      this.photos.sort(
        (a, b) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        }
      );
    }
  }

// chip-tags
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    //add tag
    if ((value || '').trim()) {
      // pakeist id is tags?
      this.tags.push({id: 0, name: value.trim()});
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
  filterByCategories(categories: number[]) {

  }

  checkCookie() {
    if (this.auth.loggedIn) {
      this.isLoggedIn = true;
      this.loginString = 'LOGOUT';
      this.loginIcon = 'directions_run';
    } else {
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
