const { configureStore } = require("@reduxjs/toolkit");
import filterSlice from "./filterSlice";
import todoSlice from "./todoSlice";
import userSlice from "./userSlice";

export const store = configureStore({
    reducer: {
        todos: todoSlice,
        filter:filterSlice
        ,user:userSlice
    }
})
