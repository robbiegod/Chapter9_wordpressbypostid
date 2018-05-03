import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class WordPressService {

  constructor(private _http: Http) {

  }

  getWordPressData(_endPoint) {
    return this._http.get('http://www.cdnmediahub.com/wp-json/wp/v2/' + _endPoint + '/')
      .pipe(map( res => res.json() ),
      catchError(error => of(null))
    );
  }

  getWordPressDataByPostId(_postID) {
    return this._http.get('http://www.cdnmediahub.com/wp-json/wp/v2/posts/' + _postID)
      .pipe(map( res => res.json() ),
      catchError(error => of(null))
    );

  }

}
