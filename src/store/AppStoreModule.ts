import { StoreModule } from "@ngrx/store";
import { loadingreducer } from "./loading/loading.reducer";
import { loginReducer } from "./login/login.reducers";

export const AppStoreModule = [
    StoreModule.forRoot([]),
    StoreModule.forFeature("loading", loadingreducer),
    StoreModule.forFeature("login", loginReducer)
]