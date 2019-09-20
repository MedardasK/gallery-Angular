import { ICategory } from './../../models/category.model';
import { GalleryService } from './../../services/gallery.service';
import { IPhoto } from './../../models/photo.model';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  tags: string[];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  search: string;
  searchString = '';
  tagsArray = [];
  categoriesIds = [];


  constructor(private gallery: GalleryService,
              private router: Router,
              private auth: AuthService,
              private snackBar: MatSnackBar) { }

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

    // add tag
    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
    this.searchCombination('tags', this.tags);
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
    this.searchCombination('tags', this.tags);
  }
  // chip-end

  initSearch(e: string): void {
    if (e.length > 2) {
      this.searchCombination('search', e);
    }
  }

  filterByCategories(categories: number[]) {
    this.searchCombination('categories', categories);
  }

  searchCombination(param: string, value: any) {
    if (param === 'search') {
      this.searchString = value;
    }
    if (param === 'categories') {
      this.tagsArray = value;
    }
    if (param === 'categories') {
      this.categoriesIds = value;
    }

    this.gallery.getImagesBySearch(this.searchString, this.tagsArray, this.categoriesIds)
    .then(data => {
      this.photos = data;
      this.isLoaded = true;
      this.resCount = data.length;
    });
  }

  checkCookie(): void {
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

  loginOrOut(): void {
    if (this.isLoggedIn) {
      this.auth.logout();
      this.isLoggedIn = false;
      this.loginString = 'LOGIN';
      this.loginIcon = 'account_box';
      this.snackBar.open('Successfully logged out!', '', {
        duration: 3000
      });
    } else {
    this.loginString = 'LOGOUT';
    this.loginIcon = 'directions_run';
    this.router.navigate(['login']);
    }
  }

}
