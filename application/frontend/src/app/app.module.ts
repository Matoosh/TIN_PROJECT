import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NebularThemeModule } from './nebular-theme/nebular-theme.module';
import { NbDatepickerModule, NbMenuModule, NbThemeModule, NbToastrModule, NbWindowModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './home-page/home-page.component';
import { BooksPageComponent } from './books-page/books-page.component';
import { BookPageComponent } from './book-page/book-page.component';
import { AuthorPageComponent } from './author-page/author-page.component';
import { AuthorsPageComponent } from './authors-page/authors-page.component';
import { CommentsComponent } from './comments/comments.component';
import { HttpClientModule } from '@angular/common/http';
import { NbPasswordAuthStrategy, NbAuthModule, NbAuthJWTToken } from '@nebular/auth';
import { NbSecurityModule } from '@nebular/security';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    BooksPageComponent,
    BookPageComponent,
    AuthorPageComponent,
    AuthorsPageComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NbThemeModule.forRoot({ name: 'corporate' }),
    NbMenuModule.forRoot(),
    NebularThemeModule,
    NbWindowModule.forRoot(),
    NbDatepickerModule.forRoot(),
    ReactiveFormsModule,
    NbToastrModule.forRoot(),
    HttpClientModule,
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          baseEndpoint: 'http://localhost:1337',
              login: {
                endpoint: '/api/auth/login',
                method: 'post',
                redirect: {
                  success: '/home',
                  failure: null
                }
              },
              register: {
                endpoint: '/api/auth/register',
                method: 'post',
              },
              logout: {
                endpoint: '/api/auth/logout',
                method: 'post',
              },
              token: {
                class: NbAuthJWTToken,
                key: 'token'
              }
        }),
      ],
      forms: {
        login:{
          showMessages: {
            success: true,
          }
        }
      },
    }), 
    NbSecurityModule.forRoot({
      accessControl: {
        guest: {
          view: ['home', 'books', 'book', 'authors', 'author'],
        },
        user: {
          parent: 'guest',
          create: 'comments',
        },
        admin: {
          parent: 'user',
          create: '*',
          remove: '*',
        },
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
