import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NbAuthService } from '@nebular/auth';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  api = 'http://localhost:1337/api/'
  constructor(
    private http:HttpClient,
    private authService: NbAuthService
  ) { }

    getAuthors() {
      return this.http.get(this.api+'author').toPromise();
    }

    getAuthor(id:any) {
      return this.http.get(this.api+'author/'+id).toPromise();
    }

    deleteAuthor(author:any) {
      return this.http.delete(this.api+'author/'+author.id).toPromise();
    }
    
    createAuthor(author:any) {
      // let token:any = await this.getToken();
      return this.http.post(this.api+'author', author).toPromise();
    }

    async updateAuthor(author:any) {
      // let token:any = await this.getToken();
      return this.http.put(this.api+'author/'+author.id, author).toPromise();
    }


    getBooks() {
      return this.http.get(this.api+'book').toPromise();
    }

    getBook(id:any) {
      return this.http.get(this.api+'book/'+id).toPromise();
    }

    deleteComment(comment:any) {
      return this.http.delete(this.api+'comment/'+comment.id).toPromise();
    }
    
    deleteBook(book:any) {
      return this.http.delete(this.api+'book/'+book.id).toPromise();
    }

    createBook(book:any) {
      // let token:any = await this.getToken();
      return this.http.post(this.api+'book', book).toPromise();
    }

    async updateBook(book:any) {
      // let token:any = await this.getToken();
      return this.http.put(this.api+'book/'+book.id, book).toPromise();
    }
    
    async createComment(comment:any) {
      let token:any = await this.getToken();
      comment.account_id = token.payload.id;
      return this.http.post(this.api+'comment',comment).toPromise();
    }

    async getRole() {
      let token:any = await this.getToken();
      return token.payload.role;
    }

    getToken(){
      return this.authService.getToken().toPromise()
    }
    
    readUserID() {
      let token:any = this.getToken();
      return token.payload.id;
    }


}
