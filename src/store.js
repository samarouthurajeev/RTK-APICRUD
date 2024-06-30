import { configureStore } from "@reduxjs/toolkit";
import RegistrationSlice from "./RegistrationSlice";
const store = configureStore({
    reducer : {
        registrations: RegistrationSlice
    }
})

export default store;