import { Component } from '@angular/core';
import { NbMenuItem, NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(private sidebarService: NbSidebarService) {
  }

  
  toggleCompact() {
    this.sidebarService.toggle(true, 'left');
  }

  title = 'frontend';
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
      link: '/login' 
    },
    { 
      title: 'Register',
      link: '/register'  
    }
  ]; 
}
