import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouteReuseStrategy} from "@angular/router";

import {IonicModule, IonicRouteStrategy} from "@ionic/angular";

import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app-routing.module";

import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "src/environments/environment";
import { AppStoreModule } from "src/store/AppStoreModule";
import { StoreDevtools, StoreDevtoolsModule } from "@ngrx/store-devtools";
import { LoadingComponent } from "./loading/loading.component";

@NgModule({
  declarations: [AppComponent, LoadingComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    ...AppStoreModule,
    StoreDevtoolsModule.instrument({maxAge: 25}),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig))
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
