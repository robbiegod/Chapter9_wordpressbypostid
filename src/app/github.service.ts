import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, of, Subject, throwError} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Injectable()
export class GitHubService {

  constructor(private _http: Http) {

  }

  getGitHubData(_searchTerm) {
    return this._http.get('https://api.github.com/search/users?q=' + _searchTerm)
    .pipe(map( res => res.json() ),
      catchError(error => of(null))
    );
  }

}
