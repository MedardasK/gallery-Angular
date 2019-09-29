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
  photos: IPhoto[];
  isLoaded = false;
  isLoggedIn = false;
  loginString = 'LOGIN';
  loginIcon = 'account_box';
  resCount = 0;
  sortObj = {
    sortBoolean: true,
    buttonString: 'keyboard_arrow_up'
  };
  categories: ICategory[];
  tags = [];
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
    this.searchCombination();
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
    this.searchCombination();
  }
  // chip-tags end

  filterByCategories(categories: number) {
    if (this.categoriesIds.length === 0) {
      this.categoriesIds.push(categories);
    } else if (!this.categoriesIds.includes(categories)) {
      this.categoriesIds.push(categories);
    } else {
      this.categoriesIds.splice(this.categoriesIds.indexOf(categories), 1);
    }
    this.searchCombination();
  }

  initSearch(e: string): void {
    if (e.length > 2) {
      this.searchString = e;
    } else {
      this.searchString = '';
    }
    this.searchCombination();
  }

  searchCombination() {
    let searchFinal: string;
    let categoriesIdsString = '';
    let tagsNamesString = '';

    if (this.categoriesIds !== []) {
      for (const cat of this.categoriesIds) {
        categoriesIdsString += cat + ',';
      }
    }

    if (this.tags !== []) {
      for (const tag of this.tags) {
        tagsNamesString += tag + ',';
      }
    }

    searchFinal = '?searchParams=categoriesIds:' + categoriesIdsString +
      'tagsNames:' + tagsNamesString + 'searchString:' + this.searchString;
    this.gallery.getImagesBySearch(searchFinal)
      .then(data => {
        this.photos = data;
        this.isLoaded = true;
        this.resCount = data.length;
      });
  }

  checkCookie(): void {
    if (this.auth.loggedIn) {
      this.isLoggedIn = true;
      this.loginOutBox(false);
    } else {
      this.isLoggedIn = false;
      this.loginOutBox(true);
    }
  }

  loginOrOut(): void {
    if (this.isLoggedIn) {
      this.auth.logout();
      this.isLoggedIn = false;
      this.loginOutBox(true);
      this.snackBar.open('Successfully logged out!', '', {
        duration: 3000
      });
    } else {
      this.loginOutBox(false);
      this.router.navigate(['login']);
    }
  }

  loginOutBox(value: boolean): void {
    if (value) {
      this.loginString = 'LOGIN';
      this.loginIcon = 'account_box';
    } else {
      this.loginString = 'LOGOUT';
      this.loginIcon = 'directions_run';
    }
  }

}
