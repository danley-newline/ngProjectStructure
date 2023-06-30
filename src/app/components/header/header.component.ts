import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userLoged : any;
  constructor(private router: Router) { }

  ngOnInit(): void {
    const loggedUser = sessionStorage.getItem('logged_user');
    if (loggedUser !== null) {
      this.userLoged = JSON.parse(loggedUser);
    }

    console.log("OK ", this.userLoged);
    
    
  }

  logoutUser(){
    sessionStorage.removeItem('logged_user');
    sessionStorage.removeItem('access_token');
    this.router.navigate(['/login']);

  }

}
