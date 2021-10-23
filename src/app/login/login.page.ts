import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastController} from "@ionic/angular";
import {Store} from "@ngrx/store";
import {AppState} from "src/store/AppState";
import {hide, show} from "src/store/loading/loading.actions";
import {recoverPassword, recoverPasswordSuccess} from "src/store/login/login.actions";
import {LoginState} from "src/store/login/LoginState";
import {AuthService} from "../services/auth/auth.service";
import {LoginPageForm} from "./login.form.page";

@Component({selector: "app-login", templateUrl: "./login.page.html", styleUrls: ["./login.page.scss"]})
export class LoginPage implements OnInit {
  private spinner: boolean;
  form: FormGroup;

  constructor(private router : Router, private formBuilder : FormBuilder, private authService : AuthService, private toastController : ToastController, private store : Store<AppState>) {
    this.spinner = false;
  }

  ngOnInit() {
    this.spinner = false;
    this.form = new LoginPageForm(this.formBuilder).createForm();

    this.store.select("login").subscribe((loginState) => {
      this.onIsRecoveredPassword(loginState);
      this.onIsRecoveringPassword(loginState);
    });
  }

  private onIsRecoveringPassword(loginState : LoginState) {
    if (loginState.isRecoveringPassword) {
      this.store.dispatch(show());

      this.authService.recoverEmailPassword(this.form.get("email").value).subscribe(() => {
        this.store.dispatch(recoverPasswordSuccess());
      });
    }
  }

  private async onIsRecoveredPassword(loginState : LoginState) {
    if (loginState.isRecoveredPassword) {
      this.store.dispatch(hide());
      const toaster = await this.toastController.create({position: "bottom", message: "Recovery email sent", color: "primary"});
      toaster.present();
    }
  }

  forgotEmailPassword() {
    this.store.dispatch(recoverPassword());
  }

  login() {
    this.spinner = true;
    setTimeout(() => {
      this.router.navigate(["home"]);
    }, 1000);
  }
}
