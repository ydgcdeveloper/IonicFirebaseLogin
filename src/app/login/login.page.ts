import {Component, OnInit} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import {Router} from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/store/AppState";
import { hide, show } from "src/store/loading/loading.actions";
import { LoginPageForm } from "./login.form.page";

@Component({selector: "app-login", templateUrl: "./login.page.html", styleUrls: ["./login.page.scss"]})
export class LoginPage implements OnInit {

  private spinner: boolean;
  form: FormGroup;

  constructor(private router : Router, private formBuilder: FormBuilder, private store: Store<AppState>) {
    this.spinner = false;
  }

  ngOnInit() {
    this.spinner = false;
    this.form = new LoginPageForm(this.formBuilder).createForm();
  }

  forgotEmailPassword(){
    this.store.dispatch(show());
    
    setTimeout(() => {
      this.store.dispatch(hide())
    }, 2000);
  }

  login() {
    this.spinner = true;
    setTimeout(() => {
      this.router.navigate(["home"]);
    }, 1000);
  }
}
