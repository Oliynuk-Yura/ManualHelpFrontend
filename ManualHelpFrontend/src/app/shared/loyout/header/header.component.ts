import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { locales } from '../../../locales.values';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

   locales = [];
  currentUrl = "";

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private router: Router
  ) { }

  ngOnInit() {

    this.locales = locales;

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentUrl = this.router.url;
      });

  }

}
