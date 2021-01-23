import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NbToastrService, NbWindowRef, NbWindowConfig, NbGlobalPhysicalPosition } from '@nebular/theme';
import { ApiService } from 'src/app/api/api.service';

export interface Author{  
  id: number;  
  name: string;  
}  

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})

export class BookFormComponent implements OnInit {
  searchText:any;
  // sizes: String[] = ['Marcin','Tomasz','Mateusz','Robert','Piotr','Maciej','Wojciech','Zbyszek'];
  isEditForm:boolean = false;
  searching:boolean = false;
  choosenAuthor:any;
  submitted = false;

  authorArrays: Author[] = [];
  
  bookForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(4)]),
    description: new FormControl(''),
    releasedate: new FormControl(''),
    author_id: new FormControl('')
  }) 
  
  author_name = new FormControl('');

  constructor(
      private api:ApiService,
      private toastrService: NbToastrService,
      private windowRef: NbWindowRef,
      private windowConfig: NbWindowConfig
    ) { }

  ngOnInit(): void {
    if(this.windowConfig.context?.hasOwnProperty("title")) {
      this.isEditForm = true
      let data:any = this.windowConfig.context
      this.bookForm.setValue({
        title: data?.title || '',
        description: data?.description || '',
        releasedate: data?.releasedate || null,
        author_id: data?.author_id || null
      })
    };    
    this.getAuthors();
  }

  get f() { return this.bookForm.controls; }
  
  onSubmit() {
    this.submitted = true;
    if (this.bookForm.invalid) {
      return;
    }

    if(this.isEditForm) {
      let context:any = this.windowConfig.context
      let data = this.bookForm.value;
      data.id = context.id;
      this.api.updateBook(data).then((res:any) => {
        this.showToast("success", res.message, "Success");
        this.windowRef.close();
      })
    } else {
      let data = this.removeFalsy(this.bookForm.value)
      this.api.createBook(data).then((res:any)=>{
        this.showToast("success", res.message, "Success")
        this.windowRef.close()
      })
    }
  }
  

      
  setAuthor(id:any, name:any) {
      this.searching = false;
      this.bookForm.patchValue({
        author_id: id
      });
  }
  
  showAuthors() { 
    this.searching = true; 
  }

  getAuthors() {
    this.authorArrays.push({id: 0, name: ""});
    this.api.getAuthors().then((res:any) => {
      for(let i = 0; i < res.length; i++) {
        this.authorArrays.push(
          this.buildAuthor({
            id: parseInt(res[i].id),
            name: res[i].last_name + " " + res[i].first_name
          })
          );
        }
      });
  }
  
  buildAuthor(ob: Author) {
    return ob;
  }


  removeFalsy(obj:any){
    let newObj:any = {};
    Object.keys(obj).forEach((prop) => {
      if (obj[prop]) { newObj[prop] = obj[prop]; }
    });
    return newObj;
  };
  
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
      }
    );
  }
}
