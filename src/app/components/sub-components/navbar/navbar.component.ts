import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/model/user';
import { AuthService } from 'src/app/shared/services/auth.service';





@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: any;
  logeado: boolean = false;
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


  constructor(private authService: AuthService,private router: Router) { }

  ngOnInit(): void {
    this.isMobile = this.getIsMobile();
    this.isLoggedIn();
    this.user = this.authService.userData();
    console.log(this.user.photoURL)
    window.onresize = () => {
      this.isMobile = this.getIsMobile();
    };
  }
  isLoggedIn() {
    this.logeado = this.authService.isLoggedIn()
  }

  logout(): void {
    this.authService.logoutservice();
    this.isLoggedIn();
    this.router.navigate(['/']);
  }
  login(): void{
    this.authService.googleAuth().then(success => {
      this.user = this.authService.userData();
      this.isLoggedIn();
    }).catch(error => {
      console.log("Dale NO", error);
    });
  }

  @Output()
  sendEvent: EventEmitter<string> = new EventEmitter<string>();
  idioma(lenguaje: string): void {
    this.sendEvent.emit(lenguaje);
  }

}
