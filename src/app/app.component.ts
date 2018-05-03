import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';

import { GitHubService } from './github.service';
import { WordPressService } from './wordpress.service';

@Component({
  selector: 'app-root',
  styles: [`
    .img {
      position:relative;
      float:left;
      width:100px;
      height:100px;
      background-position: 50% 50%;
      background-repeat: no-repeat;
      background-size: cover;
      margin-right:15px;
    }
  `],
  template: `
    <h1>Wordpress All Posts</h1>
    <hr>
    <div *ngIf="isLoading">
      <i class="fa fa-spinner fa-spin fa-3x"></i>
    </div>
    <div *ngFor="let result of results" class="media">
      <div class="media-body">
        <h4 class="media-heading">{{ result.title.rendered }}</h4>
        <div [innerHTML]="result.content.rendered"></div>
      </div>
    </div>
  `,
  providers: [WordPressService]
})
export class AppComponent implements OnInit {

  isLoading = false;

  results = [];

  constructor(private _wordpressService: WordPressService) {
  }

  ngOnInit() {

  this.isLoading = true;

  this._wordpressService.getWordPressData( 'posts' )
    .subscribe(data => {
          this.isLoading = false;
          this.results = data;
    });

  }

}
