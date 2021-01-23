import { Component } from '@angular/core';
import { NbMenuItem, NbSidebarService } from '@nebular/theme';
import { NbAuthJWTToken, NbAuthService, NbAuthToken, NbTokenService } from '@nebular/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showUserIcon: boolean;
  user:any = {};
  items: NbMenuItem[] = [
    {
      title: 'Home',
      link: '/',
      icon: 'home-outline'
    },
    {
      title: 'Books',
      link: 'books',
      icon: 'book-open-outline'
    },
    {
      title: 'Authors',
      link: 'authors',
      icon: 'people-outline'
    }
  ];
  userActions = [
   { 
     title: 'Login',
     link: 'auth/login' 
    },
    { 
      title: 'Register',
      link: 'auth/register'  
    }
  ]; 
    
  title = 'frontend';

  
  
  constructor(
    private sidebarService: NbSidebarService,
    private authService: NbAuthService,
    private nbTokenService: NbTokenService)
    {
      this.showUserIcon = true;

      this.authService.onTokenChange()
      .subscribe((token: NbAuthToken) => {


        if (token.isValid()) {
          this.user = token.getPayload()
          this.showUserIcon = false;
        } else {
          this.showUserIcon = true;
        }
      });
    }

    toggleCompact() {
      this.sidebarService.toggle(true, 'left');
    }

    logout() {}
}
