import {Component, OnDestroy, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastController} from "@ionic/angular";
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs";
import {AppState} from "src/store/AppState";
import {hide, show} from "src/store/loading/loading.actions";
import {login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess} from "src/store/login/login.actions";
import {LoginState} from "src/store/login/LoginState";
import {AuthService} from "../services/auth/auth.service";
import {LoginPageForm} from "./login.form.page";

@Component({selector: "app-login", templateUrl: "./login.page.html", styleUrls: ["./login.page.scss"]})
export class LoginPage implements OnInit,
OnDestroy {
  form: FormGroup;
  loginStateSubscription: Subscription;

  constructor(private router : Router, private formBuilder : FormBuilder, private authService : AuthService, private toastController : ToastController, private store : Store<AppState>) {}

  ngOnInit() {
    this.form = new LoginPageForm(this.formBuilder).createForm();

    this.loginStateSubscription = this.store.select("login").subscribe((loginState) => {
      this.onIsRecoveredPassword(loginState);
      this.onIsRecoveringPassword(loginState);
      this.onIsRecoverPasswordFail(loginState);

      this.onIsLoggingIn(loginState);

      this.toggleLoading(loginState);
    });
  }

  ngOnDestroy() {
    if (this.loginStateSubscription) {
      this.loginStateSubscription.unsubscribe();
    }
  }

  private toggleLoading(loginState : LoginState) {
    if (loginState.isLoggingIn || loginState.isRecoveringPassword) {
      this.store.dispatch(show());
    } else {
      this.store.dispatch(hide());
    }
  }

  private onIsRecoveringPassword(loginState : LoginState) {
    if (loginState.isRecoveringPassword) {
      this.authService.recoverEmailPassword(this.form.get("email").value).subscribe(() => {
        this.store.dispatch(recoverPasswordSuccess());
      }, (error) => {
        this.store.dispatch(recoverPasswordFail({error}));
      });
    }
  }

  private async onIsRecoveredPassword(loginState : LoginState) {
    if (loginState.isRecoveredPassword) {
      const toaster = await this.toastController.create({position: "bottom", message: "Recovery email sent", color: "success"});
      toaster.present();
    }
  }

  private async onIsRecoverPasswordFail(loginState : LoginState) {
    if (loginState.error) {
      const toaster = await this.toastController.create({position: "bottom", message: loginState.error.message, color: "danger"});
      toaster.present();
    }
  }

  forgotEmailPassword() {
    this.store.dispatch(recoverPassword());
  }

  login() {
    this.store.dispatch(login());
  }

  private async onIsLoggingIn(loginState : LoginState) {
    if (loginState.isLoggingIn) {
      const email = this.form.get("email").value;
      const password = this.form.get("password").value;
      this.authService.login(email, password).subscribe((user) => {
        this.store.dispatch(loginSuccess({user}));
      }, error => {
        this.store.dispatch(loginFail({error}))
      });
    }
  }
}
