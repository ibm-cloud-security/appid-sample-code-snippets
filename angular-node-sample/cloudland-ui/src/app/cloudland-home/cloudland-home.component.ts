import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserState } from '../user-state';
import { RewardPointsService } from '../reward-points.service';

@Component({
  selector: 'app-cloudland-home',
  templateUrl: './cloudland-home.component.html',
  styleUrls: ['./cloudland-home.component.css'],
  providers: [RewardPointsService]
})
export class CloudlandHomeComponent implements OnInit {

  constructor(private authService : AuthService, private rewardsService : RewardPointsService) { }

  userState : UserState;
  cloudLandRewardPoints : number;

  ngOnInit() {
    this.getUserInfo();
    this.getCloudLandRewardPoints();
  }


  getUserInfo() {
    this.authService.isAuthenticated()
        .subscribe(user => this.userState = user);
  }

  getCloudLandRewardPoints() {
    this.rewardsService.getCloudLandRewardPoints()
        .subscribe(points => this.cloudLandRewardPoints = points);
  }

}
