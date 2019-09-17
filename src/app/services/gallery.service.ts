import { ITag } from './../models/tag.model';
import { ICategory } from './../models/category.model';
import { IPhoto } from './../models/photo.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GalleryService {

  constructor(private http: HttpClient) { }

  getPhotos(): Promise<IPhoto[]> {
    return this.http.get<IPhoto[]>('http://localhost:8080/images').toPromise();
  }

  getPhotoById(id: number): Promise<IPhoto> {
    return this.http.get<IPhoto>('http://localhost:8080/images/image/' + id).toPromise();
  }

  getCategories(): Promise<ICategory[]> {
    return this.http.get<ICategory[]>('http://localhost:8080/categories').toPromise();
  }

  getTags(): Promise<ITag[]> {
    return this.http.get<ITag[]>('http://localhost:8080/tags').toPromise();
  }

  uploadImage(file: any): Observable<any> {
    return this.http.post('http://localhost:8080/images/upload', file).pipe(
      catchError(this.handleError)
    );
  }

  updateImage(photo: IPhoto): Observable<any> {
    return this.http.post('http://localhost:8080/images/update', photo).pipe(
      catchError(this.handleError)
    );
  }

  saveTag(tag: any): Observable<any> {
    console.log(tag);
    return this.http.post('http://localhost:8080/tags/create', tag).pipe(
      catchError(this.handleError)
    );
  }

  saveCategory(category: any): Observable<any> {
    console.log(category);
    return this.http.post('http://localhost:8080/categories/create', category).pipe(
      catchError(this.handleError)
    );
  }

  getImagesByCategories(ids: number[]): Promise<IPhoto[]> {
    return this.http.get<IPhoto[]>('http://localhost:8080/imagesByCategories/' + ids).toPromise();
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
