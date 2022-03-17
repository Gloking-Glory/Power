import { HttpErrorResponse, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ServiceService } from '../service.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor(public auth: ServiceService) { }

  intercept (req: HttpRequest<any>, next: HttpHandler) {
    let token = localStorage.getItem('token');
    req = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + token)});
    req = req.clone({headers: req.headers.set('Content-Type', 'application/json')});
    req = req.clone({headers: req.headers.set('Accept', 'application/json')});

    return next.handle(req)

    .pipe(catchError ((err: HttpErrorResponse)=> {
      if (err && err.status == 401) {
        this.auth.logOut();
      }

      return throwError(err);
    }))
  }
}
