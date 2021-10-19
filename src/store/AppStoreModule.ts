import { StoreModule } from "@ngrx/store";
import { loadingreducer } from "./loading/loading.reducer";

export const AppStoreModule = [
    StoreModule.forRoot([]),
    StoreModule.forFeature("loading", loadingreducer)
]