import { Component, OnInit, Input } from '@angular/core';

@Component({
  templateUrl: 'loader-spinner.component.html',
  styleUrls: ['loader-spinner.component.scss']
})
export class LoaderSpinnerComponent implements OnInit {

  @Input() public showSpinner = false;
  @Input() public message: string = 'Loading...';

  constructor() { }

  ngOnInit() {
  }
}
