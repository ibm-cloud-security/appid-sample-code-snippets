import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @Input() displayState: string;
  @Input() userName: string;
  @Input() idToken: string;
  @Input() userData: string;
  tokenContentClass = 'contentHidden';
  tokenButtonClass = 'collapsibleButton';
  tokenImageClass = 'expand';
  infoContentClass = 'contentHidden';
  infoButtonClass = 'collapsibleButton';
  infoImageClass = 'expand';
  tokenState = true;
  infoState = true;
  onTokenClick() {
    if (this.tokenState) {
      this.tokenContentClass = 'contentShown';
      this.tokenButtonClass = 'collapsibleButtonClicked';
      this.tokenImageClass = 'active';
      this.tokenState = false;
    } else {
      this.tokenContentClass = 'contentHidden';
      this.tokenButtonClass = 'collapsibleButton';
      this.tokenImageClass = 'expand';
      this.tokenState = true;
    }
  }
  onInfoClick() {
    if (this.infoState) {
      this.infoContentClass = 'contentShown';
      this.infoButtonClass = 'collapsibleButtonClicked';
      this.infoImageClass = 'active';
      this.infoState = false;
    } else {
      this.infoContentClass = 'contentHidden';
      this.infoButtonClass = 'collapsibleButton';
      this.infoImageClass = 'expand';
      this.infoState = true;
    }
  }
}

