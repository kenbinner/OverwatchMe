import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GetStatsService {
  private headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
  constructor(private http: HttpClient) { }

  getStats(platform: string, playerId: string): Observable<any> {
    let url: string = "http://localhost:8080/api/getStats/" + platform + "/" + playerId; // prevent CORS issue by checking url is correct
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err)
    let errMsg: string = '';

    if (err.status == 400) {
      errMsg = "The request can not be processed at the moment. Please try again later or connect with admin!";
    } else if (err.status == 404) {
      
      errMsg = "The resources you are looking for is not available. Please try again later or connect with admin!";
    } else {
      if (err.error instanceof Error) {

        errMsg = err.error.message;

        console.log(errMsg)
      }
      else if (typeof err.error === 'string') {
        alert("I am in error")
        errMsg = JSON.parse(err.error).message
      }
      else {
        if (err.status == 0) {
          errMsg = "A connection to back end can not be established.";
        } else {
          errMsg = err.error.message;
        }
      }
    }
    return throwError(errMsg);
  }
}
