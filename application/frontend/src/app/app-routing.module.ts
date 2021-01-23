import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { BooksPageComponent } from './books-page/books-page.component';
import { AuthorsPageComponent } from './authors-page/authors-page.component';
import { BookPageComponent } from './book-page/book-page.component';
import { AuthorPageComponent } from './author-page/author-page.component';
import { NbAuthComponent, NbLoginComponent, NbRegisterComponent, NbLogoutComponent, NbRequestPasswordComponent } from '@nebular/auth';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch:'full'},
  {path: 'home',component:HomePageComponent},
  // {path: 'book',component:BookPageComponent},
  {path: 'book/:id',component:BookPageComponent},
  {path: 'books',component:BooksPageComponent},
  // {path: 'author',component:AuthorPageComponent},
  {path: 'author/:id',component:AuthorPageComponent},
  {path: 'authors',component:AuthorsPageComponent},
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: NbLoginComponent,
      },
      {
        path: 'login',
        component: NbLoginComponent,
      },
      {
        path: 'register',
        component: NbRegisterComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: NbRequestPasswordComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
