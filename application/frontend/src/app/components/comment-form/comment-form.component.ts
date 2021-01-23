import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { NbToastrService } from '@nebular/theme';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {
  book_id:any;

  commentForm = new FormGroup({
    commentText: new FormControl('')
  }) 
  constructor(
    private route: ActivatedRoute,
    private toastrService: NbToastrService,
    private api: ApiService,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    let comment:any = {};
    comment.book_id = this.route.snapshot.paramMap.get('id');
    comment.book_id = comment.book_id != null ? parseInt(comment.book_id) : null;
    comment.comment = this.commentForm.value.commentText;
    this.api.createComment(comment).then((res:any)=> {
      this.showToast('bottom-right', 'success', res.message, "Success");
    })
    if(this.commentForm.value.commentText == "") {
      this.showToast('bottom-right', 'danger', "Field is empty!", "Error");
    }
    // this.commentForm.value.commentText = null;
  }


  showToast(position:any, status:any, msg:string, title:string) {
    this.toastrService.show(
      msg,
      title,
      { 
        position,
        status,
        duration: 1500
      }
      );
  }

}
