import { Repo } from './../Classes/repo';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { User } from '../Classes/user'
import { environment } from './../../environments/environment';
import  'rxjs/add/operator/map'



@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  user: User; 
  repo :Repo;
  private userName: string;
  apiKey:string = environment.apiKey


  constructor(private http:HttpClient) {


    this.user = new User ('', '', '', '', 0, 0, 0);
    this.repo = new Repo('', '', '');
    this.userName = 'saa-lem';
  }

  // getting profile info including the username, followers and following and the profile picture
  userInfo(){
    interface ApiResponse{
      login: string;
      public_repos: number;
      avatar_url : any;
      html_url: string;
      name : string;
      following : number;
      followers : number;
    }

    let promise = new Promise((resolve,reject)=>{
      this.http.get<ApiResponse>('https://api.github.com/users/' + this.userName + '?access_token='+ this.apiKey).toPromise().then(res =>{
        this.user.login = res.login;
        this.user.avatar_url = res.avatar_url;
        this.user.html_url = res.html_url;
        this.user.name = res.name;
        this.user.followers = res.followers;
        this.user.following = res.following;
        this.user.public_repos = res.public_repos;

        resolve()
      }, error =>{
        this.user.name = "User name cannot be found"
        this.user.avatar_url= "Can't load image"
        this.user.html_url = "404 page not found"
        this.user.followers = 0
        this.user.following = 0

        reject(error)
      })
      
    })
    return promise
  }

  // getting repo info

  getRepos(username:any) {

    interface ApiResponse {
      name: string;
      html_url: string;
      description: string;
    }

    const promise = new Promise(((resolve, reject) => {
      this.http.get<ApiResponse>('https://api.github.com/users/' + this.userName + '/repos?access_token=' + this.apiKey )
        .toPromise()
        .then(res => {
          this.repo = res;
    }, error => {

      reject(error);
    });
  }));
    return promise;
  }
  getUsername(username:string){
    this.userName = username;
  }

  }


