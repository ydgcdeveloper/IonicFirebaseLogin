import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({selector: "app-login", templateUrl: "./login.page.html", styleUrls: ["./login.page.scss"]})
export class LoginPage implements OnInit {
  private spinner: boolean;

  constructor(private router : Router) {
    this.spinner = false;
  }

  ngOnInit() {
    this.spinner = false;
  }

  login() {
    this.spinner = true;
    setTimeout(() => {
      this.router.navigate(["home"]);
    }, 1000);
  }
}
