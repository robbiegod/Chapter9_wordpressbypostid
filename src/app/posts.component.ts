import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';

import { GitHubService } from './github.service';
import { WordPressService } from './wordpress.service';

@Component({
  selector: 'app-posts',
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
    <h3>Wordpress Single Post</h3>
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
export class PostsComponent implements OnInit {

  isLoading = false;
  _postID = 118;

  results = [];

  constructor(private _wordpressService: WordPressService) {
  }

  ngOnInit() {

  this.isLoading = true;

  this._wordpressService.getWordPressDataByPostId( this._postID )
    .subscribe(data => {
      this.isLoading = false;
      this.results = [data];
    });

  }

}
