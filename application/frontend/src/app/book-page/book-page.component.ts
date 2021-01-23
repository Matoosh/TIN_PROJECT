import { Component, OnInit, HostBinding  } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.scss']
})
export class BookPageComponent implements OnInit {
  id:any;
  role:any;
  book:any;
  reversedList: Array<any> = [];
  accountId:any;
  isEditForm:boolean = false;
  commentToEdit:any;
  
  
  commentForm = new FormGroup({
    commentText: new FormControl('')
  }) 
  
  editCommentForm = new FormGroup({
    editCommentText: new FormControl('')
  }) 

  constructor(
      private route: ActivatedRoute,
      private toastrService: NbToastrService,
      private api: ApiService
    ) { 
      this.getRoleFromToken();
    }

  async getRoleFromToken() {
    let token:any = await this.api.getToken();
    this.role = token.payload.role;
  }

  ngOnInit(): void {
    // this.toastrService.setDestroyTimeout(2500);
    this.getCommentAuthorIDFromToken();
    this.getData();
  }

  async getCommentAuthorIDFromToken() {
    let token:any = await this.api.getToken();
    this.accountId = token.payload.id;
  }

  
  onSubmit() {
    let comment:any = {};
    comment.book_id = this.id != null ? parseInt(this.id) : null;
    comment.comment = this.commentForm.value.commentText;
    this.api.createComment(comment).then((res:any)=> {
      this.showToast('success', "Comment was added!", "Success");
      // this.book.comments = this.book.comments.push(res.data);
      
    })
    this.getData();
    if(this.commentForm.value.commentText == "") {
      this.showToast('danger', "Field is empty!", "Error");
    }

  }

  onEdit() {

  }
  getData() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.api.getBook(this.id).then((response:any) => {
      this.book = response;
    });
  }


  showToast(status:any, msg:string, title:string) {
    this.toastrService.show(
      msg,
      title,
      { 
        position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
        status,
        destroyByClick: true,
        preventDuplicates: true,
        duplicatesBehaviour: 'all'  
      });
  }

  isUserOwner(commentOwnerID:any) {
    return this.api.readUserID() == commentOwnerID ? true : false;
  }

  deleteComment(item:any) {
    // console.log([0].comment);
    if(window.confirm('Are you sure?')){
      this.api.deleteComment(item).then((res:any) =>{
        this.showToast(res.status, res.message, res.status);
        this.book.comments = this.book.comments.filter((i:any) => i.id != item.id);
      }).catch((res:any) => {
        this.showToast(res.status, res.message, res.status);
      });
    }
  }

  
  editComment(item:any) {
    this.isEditForm = true;
    this.commentToEdit = this.book.comments.filter((i:any) => i.id == item.id)[0].id;
  }

}
