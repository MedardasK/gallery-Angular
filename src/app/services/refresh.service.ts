import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {
  Subject: any;

  constructor() { }

  private customSubject = new Subject<any>();
  customObservable = this.customSubject.asObservable();

  callComponentMethod(): void {
    this.customSubject.next();
    }

}
