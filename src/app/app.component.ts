import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationStart,
  Route,
  Router,
} from '@angular/router';
import { timeout } from 'rxjs';
import { EventEmitterService } from './service/event-emitter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Smart Buy';
  isLoaded: boolean = false;
  constructor(private router: Router) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this.showFooter();
      }
    });
  }

  showFooter() {
    this.isLoaded = false;
    setTimeout(() => {
      this.isLoaded = true;
    }, 1000);
  }
}
