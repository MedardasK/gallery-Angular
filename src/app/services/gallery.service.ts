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

    getPhotoById(id: number): Observable<Blob> {
    return this.http.get('http://localhost:8080/images/image/' + id, { responseType: 'blob' }).pipe(
      catchError(this.handleError)
    );
  }

  getPhotoDetailsById(id: number): Promise<IPhoto> {
    return this.http.get<IPhoto>('http://localhost:8080/images/image/' + id).toPromise();
  }

  getCategories(): Promise<ICategory[]> {
    return this.http.get<ICategory[]>('http://localhost:8080/categories').toPromise();
  }

  getTags(): Promise<ITag[]> {
    return this.http.get<ITag[]>('http://localhost:8080/tags').toPromise();
  }

  getImagesBySearch(searchParams: string): Promise<IPhoto[]> {
    return this.http.get<IPhoto[]>('http://localhost:8080/images/search/' + searchParams).toPromise();
  }

  uploadImage(file: FormData): Observable<any> {
    return this.http.post('http://localhost:8080/images/upload', file).pipe(
      catchError(this.handleError)
    );
  }

  updateImage(id: number, photo: FormData): Observable<any> {
    return this.http.put('http://localhost:8080/images/update/' + id, photo).pipe(
      catchError(this.handleError)
    );
  }

  saveTag(name: FormData): Observable<any> {
    return this.http.post('http://localhost:8080/tags/create', name).pipe(
      catchError(this.handleError)
    );
  }

  saveCategory(name: FormData): Observable<any> {
    return this.http.post('http://localhost:8080/categories/create', name).pipe(
      catchError(this.handleError)
    );
  }

  deleteImage(id: number): Observable<any> {
    return this.http.delete('http://localhost:8080/images/delete/' + id).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: `);
      console.error(error.error);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
