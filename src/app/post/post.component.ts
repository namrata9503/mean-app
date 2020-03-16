import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']

})
export class PostComponent implements OnInit {
  posts: Array<Post>;
  postForm: FormGroup;

  constructor(private _postService:PostService,
    private router: Router,
    fb:FormBuilder
    ) { 

      this.postForm=fb.group({
        'title': [null, Validators.compose([Validators.required,Validators.minLength(5), Validators.maxLength(500)])],
        'url':[null, Validators.required],
        'description': [null, Validators.compose([Validators.required,Validators.minLength(20), Validators.maxLength(500)])],

      })
    }
    ngOnInit() {
      this._postService.getPosts()
        .subscribe(res => this.posts = res);
    }
  
    addPost(post: Post) {
      this._postService.insertPost(post)
        .subscribe(newPost => {
          this.posts.push(newPost);
          this.router.navigateByUrl('/');
        })
    }

}
