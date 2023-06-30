import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { IUser } from 'src/app/models/IUser';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  userSelectedImg = "";

  constructor(
    private apiService: ApiService, 
    private router: Router,
    private formBuilder: FormBuilder,
    private messageService: MessageService
    ) { }

  ngOnInit(): void {
    this.initRegisterForm();
  }

  initRegisterForm(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      userImg: ['']
    });
  }

  onFileChange(e:any){    
    this.userSelectedImg = e.target.files[0];
  }

  submitRegister(){

    if (!this.userSelectedImg) {
      this.registerForm.patchValue({userImg: null});
      return this.sendForCreation();
    }

    let fd = new FormData();
    fd.append("file", this.userSelectedImg);

    this.apiService.post('/upload', fd).subscribe(
      (response) => {

        this.registerForm.patchValue({userImg: response});
        this.sendForCreation();
      },
      (error) => {
        console.log(error);
        this.registerForm.patchValue({userImg: null});
        this.sendForCreation();
      }
    );
    
  }

  sendForCreation(){
    console.log(" No creat ",this.registerForm.value);


    this.apiService.post('/auth/register', this.registerForm.value).subscribe(
      (response) => {

        this.messageService.add({
          severity: 'success',
          detail: 'Compte crée effectué avec succès',
        });
        this.registerForm.reset()
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log(error);

        if (error == undefined ) {
          this.messageService.add({
            severity: 'success',
            detail: 'Compte crée effectué avec succès',
          });
          this.router.navigate(['/login']);
        }
        
      }
    );
  }

}
