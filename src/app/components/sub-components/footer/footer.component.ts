import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
isMobile: boolean = false;
getIsMobile(): boolean {
  const w = document.documentElement.clientWidth;
  const breakpoint = 992;
  if (w < breakpoint) {
    return true;
  } else {
    return false;
  }
}
  constructor() { }

  ngOnInit(): void {
    this.isMobile = this.getIsMobile();
  }
  
}
