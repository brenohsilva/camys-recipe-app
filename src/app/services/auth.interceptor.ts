import { HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, EMPTY, Observable, tap, throwError } from "rxjs";
import { AuthHttpService } from "./auth.service";
import { Router } from "@angular/router";

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const accessToken = inject(AuthHttpService).getAccessToken();

    if (accessToken) {
        req = addToken(req, accessToken)
    }

    return next(req).pipe(
        tap(event => {
            if (event.type === HttpEventType.Response) {
                console.log(req.url, 'returned a response with status', event.status);
            }
        }),
        catchError(err => {
            console.log("somethin went wrong", err.status)
            if (err.status === 401) {
                inject(Router).navigate(['/login']);
                return EMPTY;
            } else if (err.status === 409) {
                console.log(err.status)
                return throwError(() => new Error(err.status));
                
            }
            return throwError(() => err);
        })
    );
}

function addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`,
        },
    });
}
