import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {IPosts} from '../posts.model';

@Component({
  selector: 'app-test-http',
  templateUrl: './test-http.component.html',
  styleUrls: ['./test-http.component.css']
})
export class TestHTTPComponent implements OnInit {
  loadedPosts = [];
  angForm: FormGroup;

  constructor(private fb: FormBuilder,private http: HttpClient) { }

  ngOnInit() {
    this.createForm();
  }


  createForm() {
    this.angForm = this.fb.group({
        Name: ['', Validators.required],
        Content: ['', Validators.required ],
    });
  }



  onSendPost(postData: {title:string; content:string})
  {
    console.log(postData);
    this.http.post(
            'https://angularcomplete2020.firebaseio.com/posts.json',
            postData).subscribe(responseData => {
               console.log(responseData);
            });
  }

  onFetchPosts()
  {
    this.http
     .get<{[key:string] : IPosts}>(
      'https://angularcomplete2020.firebaseio.com/posts.json')
      .pipe(
        map(responseData => {
        const postsArray: IPosts[] =[];
        for (const key in responseData)
        {
           if(responseData.hasOwnProperty(key)) {
             postsArray.push({...responseData[key], id: key});
           }
        }
        return postsArray;
      }))
      .subscribe(responseData => {
         console.log(responseData);
         this.loadedPosts = responseData;
      });
}


  onClearPosts()
  {

  }


}
