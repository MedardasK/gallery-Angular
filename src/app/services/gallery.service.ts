import { ITag } from './../models/tag.model';
import { ICategory } from './../models/category.model';
import { IPhoto } from './../models/photo.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class GalleryService {

  constructor(private http: HttpClient) { }

  getPhotos(): Promise<IPhoto[]> {
    return this.http.get<IPhoto[]>('http://localhost:8080/images/').toPromise();
  }

  getPhotoById(id: number): Promise<IPhoto> {
    return this.http.get<IPhoto>('http://localhost:8080/images/image/' + id).toPromise();
  }

  getCategories(): Promise<ICategory[]> {
    return this.http.get<ICategory[]>('http://localhost:8080/categories').toPromise();
  }

  getTags(): Promise<ITag[]> {
    return this.http.get<ITag[]>('http://localhost:8080/tags/').toPromise();
  }

  uploadImage(file: any): void {
    this.http.post('http://localhost:8080/images/', file);
  }

  getImagesByCategories(ids: number[]): Promise<IPhoto[]> {
    console.log(ids);
    return this.http.get<IPhoto[]>('http://localhost:8080/imagesByCategories/' + ids).toPromise();
  }
}
