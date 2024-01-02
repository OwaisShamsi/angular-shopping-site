import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventEmitterService {
  // searchInitial = new EventEmitter();
  private subject = new Subject<void>();
  public footer = new EventEmitter<any>();
  subs: Subscription | undefined;
  constructor() {}

  sendClickEvent() {
    this.subject.next();
  }

  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }

  // onSearch() {
  //   this.searchInitial.emit();
  // }
}
