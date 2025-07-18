const { configureStore } = require("@reduxjs/toolkit");
import filterSlice from "./filterSlice";
import todoSlice from "./todoSlice";

export const store = configureStore({
    reducer: {
        todos: todoSlice,
        filter:filterSlice
    }
})
