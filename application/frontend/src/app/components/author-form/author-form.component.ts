import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NbToastrService, NbWindowRef, NbWindowConfig, NbGlobalPhysicalPosition } from '@nebular/theme';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.scss']
})
export class AuthorFormComponent implements OnInit {
  isEditForm:boolean = false;
  submitted = false;

  authorForm = new FormGroup({
    first_name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    last_name: new FormControl(''),
    birth: new FormControl('')
  }) 

  constructor(
      private api:ApiService,
      private toastrService: NbToastrService,
      private windowRef: NbWindowRef,
      private windowConfig: NbWindowConfig
    ) { }

  ngOnInit(): void {
    if(this.windowConfig.context?.hasOwnProperty("last_name")) {
      this.isEditForm = true
      let data:any = this.windowConfig.context
      this.authorForm.setValue({
        first_name: data?.first_name || '',
        last_name: data?.last_name || '',
        birth: data?.birth || null,
      })
    };    
  }

  get f() { return this.authorForm.controls; }
  

  onSubmit() {
    this.submitted = true;
    if (this.authorForm.invalid) {
      return;
    }

    if(this.isEditForm) {
      let context:any = this.windowConfig.context
      let data = this.authorForm.value;
      data.id = context.id;
      this.api.updateAuthor(data).then((res:any) => {
        this.showToast(res.status, res.message, res.status);
        this.windowRef.close();
      })
    } else {
      let data = this.removeFalsy(this.authorForm.value)
      this.api.createAuthor(data).then((res:any)=>{
        this.showToast(res.status, res.message, res.status)
        this.windowRef.close()
      }).catch((res:any) => {
        this.showToast(res.status, res.message, res.status)
      })
    }
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
