import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  put(arg0: string) {
    throw new Error('Method not implemented.');
  }
  BASE_URL = environment.apiUrl;
  headers = new HttpHeaders();
  httpOptions: any;
  httpOptionsLogin: any;
  httOptionJson: any;
  httOptionToken: any;

  constructor(
    private http: HttpClient,
    private route: Router,
    private messageService: MessageService
  ) {
    this.httpOptionsLogin = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    this.httOptionJson = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      }),
    };

  }
  login(endPoint: string, data: any): Observable<any> {
    return new Observable((observer) => {
      this.http
        .post(this.BASE_URL + endPoint, data, this.httpOptionsLogin)
        .subscribe(
          (result) => {
            observer.next(result);
          },
          (error: HttpErrorResponse) => {
            if (error.status === 401) {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail:
                  'Login et/ou mot de passe incorrect ou code restaurant erroné',
              });
              observer.error(error);
              this.route.navigate(['/login']);
            } else {
              observer.error(
                error.statusText ? error.error.error.message : error
              );
            }
          },
          () => {
            observer.complete();
          }
        );
    });
  }
  get(endPoint: string): Observable<any> {
    return new Observable((observer) => {
      this.http
        .get(this.BASE_URL + endPoint, this.httOptionJson)
        .subscribe(
          (result) => {
            console.log(result);
            observer.next(result);
          },
          (error: HttpErrorResponse) => {
            if (error.status === 401) {
              this.route.navigate(['/login']);
            } else {
              observer.error(
                error.statusText ? error.error.error.message : error
              );
            }
          },
          () => {
            observer.complete();
          }
        );
    });
  }
  post(endPoint: string, data: any): Observable<any> {
    return new Observable((observer) => {
      this.http
        .post(this.BASE_URL + endPoint, data, this.httOptionJson)
        .subscribe(
          (result) => {
            observer.next(result);
          },
          (error: HttpErrorResponse) => {
            console.log(error);
            if (error.status === 401 && error.statusText !== 'Unauthorized') {
              this.route.navigate(['/login']);
            } else {
              observer.error(error.statusText ? error.error.message : error);
            }
          },
          () => {
            observer.complete();
          }
        );
    });
  }
  putSimple(endpoint: string, data: any): Observable<any> {
    return new Observable((observer) => {
      this.http
        .put(this.BASE_URL + endpoint, data, this.httOptionJson)
        .subscribe(
          (result) => {
            observer.next(result);
          },
          (error: HttpErrorResponse) => {
            console.log(error);
            if (error.status === 401 && error.statusText !== 'Unauthorized') {
              this.route.navigate(['/login']);
            } else {
              observer.error(error.statusText ? error.error.message : error);
            }
          },
          () => {
            observer.complete();
          }
        );
    });
  }
  delete(endPoint: string, data: any) {
    return new Observable((observer) => {
      this.http
        .delete(this.BASE_URL + endPoint + data, this.httOptionJson)
        .subscribe(
          (result) => {
            observer.next(result);
          },
          (error: HttpErrorResponse) => {
            console.log(error);
            if (error.status === 401 && error.statusText !== 'Unauthorized') {
              this.route.navigate(['/login']);
            } else {
              observer.error(error.statusText ? error.error.message : error);
            }
          },
          () => {
            observer.complete();
          }
        );
    });
  }

  IsLoggedIn(){
    return sessionStorage.getItem('access_token')!=null;
  }


}
