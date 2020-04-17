import { Repo } from './../../Classes/repo';
import { User } from './../../Classes/user';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from './../../Service/profile.service';
import { Component, OnInit } from '@angular/core';




@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  providers: [ProfileService],
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  searchUsers = true;

  user:User;
  repo:Repo;
  username :string;

  constructor(private profileService:ProfileService, private httpClient:HttpClient) { }

    getProfile(){
      this.profileService.getUsername(this.username);
      this.profileService.userInfo();
      this.user = this.profileService.user;

      this.profileService.getRepos(this.username);
    this.repo = this.profileService.repo;
    console.log(this.repo);
    }

    switchSearch() {
      this.searchUsers = !this.searchUsers;
    }
  
  ngOnInit() {

    this.profileService.userInfo();
    this.user = this.profileService.user;

    this.profileService.getRepos(this.username);
    this.repo = this.profileService.repo; 
  }

}
