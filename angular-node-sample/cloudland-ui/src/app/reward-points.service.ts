import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class RewardPointsService {

  private cloudLandRewardPointsURL = "http://localhost:3000/user/rewardpoints";

  constructor(private http: HttpClient) { }

  getCloudLandRewardPoints() : Observable<number> {
    return this.http.get(this.cloudLandRewardPointsURL, {withCredentials: true}).map((res:Response) => res['points']);
  }

}
