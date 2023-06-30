import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { IUser } from 'src/app/models/IUser';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userForm!: FormGroup;


  constructor(
    private apiService: ApiService, 
    private router: Router,
    private formBuilder: FormBuilder,
    private messageService: MessageService
    ) { 
    sessionStorage.clear();

  }

  ngOnInit(): void {
    this.initializeLoginForm();
  }

  initializeLoginForm(): void {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submitLogin() {
    console.log("ok");
    this.apiService.post('/auth/login', this.userForm.value).subscribe(
      (response) => {

        console.log(response);


        sessionStorage.setItem('access_token', response.token);
        sessionStorage.setItem('logged_user', JSON.stringify(response));

        
        this.messageService.add({
          severity: 'success',
          detail: 'Connexion effectué',
        });
        this.userForm.reset()
        this.router.navigate(['/']);
      },
      (error) => {
        console.log(error);

      }
    );
  }


}
