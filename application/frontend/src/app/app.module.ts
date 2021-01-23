import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NebularThemeModule } from './nebular-theme/nebular-theme.module';
import { NbDatepickerModule, NbMenuModule, NbThemeModule, NbToastrModule, NbTooltipModule, NbWindowModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './home-page/home-page.component';
import { BooksPageComponent } from './books-page/books-page.component';
import { BookPageComponent } from './book-page/book-page.component';
import { AuthorPageComponent } from './author-page/author-page.component';
import { AuthorsPageComponent } from './authors-page/authors-page.component';
import { HttpClientModule } from '@angular/common/http';
import { NbPasswordAuthStrategy, NbAuthModule, NbAuthJWTToken } from '@nebular/auth';
import { NbRoleProvider, NbSecurityModule } from '@nebular/security';
import { RoleProvider } from './role/role.provider';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { AuthorFormComponent } from './components/author-form/author-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterPipe } from './pipes/filter.pipe'; 

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    BooksPageComponent,
    BookPageComponent,
    AuthorPageComponent,
    AuthorsPageComponent,
    CommentFormComponent,
    BookFormComponent,
    AuthorFormComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbTooltipModule,
    NbThemeModule.forRoot({ name: 'corporate' }),
    NbMenuModule.forRoot(),
    NebularThemeModule,
    NbWindowModule.forRoot(),
    NbDatepickerModule.forRoot(),
    ReactiveFormsModule,
    NbToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          token: {
            class: NbAuthJWTToken,
            key: 'token'
          },
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
            method: 'post'
          },
          logout: {
            endpoint: '/api/auth/logout',
            method: 'post'
          },
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
          view: ['home'],
        },
        user: {
          parent: 'guest',
          create: 'comments',
        },
        admin: {
          parent: 'user',
          create: 'admin',
          remove: '*',
        },
      },
    }),
  ],
  providers: [
    {
      provide: NbRoleProvider,
      useClass: RoleProvider
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
