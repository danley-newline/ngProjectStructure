import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    return;
    
    if (this.userForm.valid) {
      const user: IUser = this.userForm.value;
      // Utilisez l'objet 'user' pour effectuer des opérations supplémentaires (par exemple, envoyer une requête HTTP, etc.)
    }
  }


}
