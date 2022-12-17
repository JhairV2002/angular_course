import {
  // AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
  // ViewContainerRef,
} from '@angular/core';
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
    private configService: ConfigService
  ) {
    console.log(initService.config);
  }
  title: string = 'fundamentos de angular';
  loginType: string = 'Admin';

  @ViewChild('name', { static: true }) name!: ElementRef;

  ngOnInit(): void {
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
