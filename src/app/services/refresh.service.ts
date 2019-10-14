import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {
  Subject: any;

  constructor() { }

  private customSubject = new Subject<any>();
  customObservable = this.customSubject.asObservable();

  callComponentMethod(): void {
    console.log('servissaas');
    this.customSubject.next();
  }

}
