import {
  // AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
  // ViewContainerRef,
} from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
import { InitService } from './init.service';
// import { DirectivesComponent } from './directives/directives.component';
import { LocalStorageToken } from './localstorage.token';
import { ConfigService } from './services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    @Inject(LocalStorageToken) private localstorage: Storage,
    private initService: InitService,
    private configService: ConfigService,
    private router: Router
  ) {
    console.log(initService.config);
  }
  title: string = 'fundamentos de angular';
  loginType: string = 'Admin';

  @ViewChild('name', { static: true }) name!: ElementRef;

  ngOnInit(): void {
    // the router events is an observable
    // this.router.events.subscribe((event) => {
    //   console.log(event);
    // });
    // called when the user click in an url
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((e) => console.log('navigation started', e));

    // called when the page is fully charged
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((e) => console.log('navigation ended', e));

    console.log(this.name);
    this.name.nativeElement.innerText = 'ngOnInit Text';
    this.localstorage.setItem('name', 'Hilton Hotel');
  }

  // @ViewChild('user', { read: ViewContainerRef }) vcr!: ViewContainerRef;
  //
  // ngAfterViewInit(): void {
  //   const componentRef = this.vcr.createComponent(DirectivesComponent);
  //
  //   componentRef.instance.title = 'Dinamic Title';
  // }
}
