import { Component } from '@angular/core';
import { NbMenuItem, NbSidebarService } from '@nebular/theme';
import { NbAuthJWTToken, NbAuthService, NbAuthToken } from '@nebular/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user:any = {}
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
    },
    {
      title: 'Book',
      link: 'book',
      icon: 'book-open-outline'
    },
    {
      title: 'Author',
      link: 'author',
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
    private authService: NbAuthService)
    {
      this.authService.onTokenChange()
      .subscribe((token: NbAuthToken) => {

        console.log(token)

        if (token.isValid()) {
          this.user = token.getPayload()
        } 
      })
    }

    toggleCompact() {
      this.sidebarService.toggle(true, 'left');
    }
}
