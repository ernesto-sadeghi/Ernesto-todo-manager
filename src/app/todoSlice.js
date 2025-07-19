'use client'
import axios from "axios";

import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";

export const fetchTodo = createAsyncThunk("todos/fetchtodo", async () => {
  const response = await axios.get('http://localhost:5000/get-todos?userId=687ac40166e46310b469e92e')
  return response.data
})
export const addTodo = createAsyncThunk("todos/addtodo", async (todo) => {
  const response = await axios.post('http://localhost:5000/todo-add', {
    ...todo, completed: false, user: "687ac40166e46310b469e92e"
  })
  return response.data
})

export const toggleTodo = createAsyncThunk("todos/toggleTodo", async (id) => {
  const response = await axios.patch(`http://localhost:5000/todo-toggle/${id}`);
  return response.data;
});
export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  const response = await axios.delete(`http://localhost:5000/todo-delete/${id}`);
  return response.data;
});



const todoAdapter = createEntityAdapter({ selectId: (todo) => todo._id, sortComparer: (a, b) => b._id.localeCompare(a._id) })


export const {
  selectById: selectTodoById,
  selectIds: selectTodotIds
} = todoAdapter.getSelectors(state => state.todos)
const initialState = todoAdapter.getInitialState({

  status: 'idle',
  toggleStatus: 'idle',
  error: null
})

const todoSlice = createSlice({
  name: "todos", initialState, reducers: {
    // todoAdded(state, action) {
    // const todo = action.payload;
    // todoAdapter.addOne
    // const newId = Object.keys(state.entities).length + 1;
    // state.entities[newId] = {
    //     id: newId,
    //     text: todo, // Ensure text is never undefined
    //     completed: false,
    //     color: todo.color || ''
    // };
    // console.log(Object.values(state.entities));
    // },
    // todoToggled(state, action) {
    //     const toggledTodoId = action.payload
    //     const todoToggled = state.entities[toggledTodoId]
    //     todoToggled.completed = !todoToggled.completed

    // },
    // todoDeleted(state, action) {
    //     const deletedTodoId = action.payload
    //     delete state.entities[deletedTodoId]

    // }
  }, extraReducers: (builder) => {
    builder
      .addCase(fetchTodo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodo.fulfilled, (state, action) => {
        todoAdapter.upsertMany(state, action.payload);
        state.status = 'success';
      })
      .addCase(fetchTodo.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      })
      .addCase(addTodo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.status = 'success';
        console.log(action.payload);
        todoAdapter.addOne(state, action.payload);
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      })
      .addCase(toggleTodo.pending, (state) => {
        state.toggleStatus = 'loading';
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        state.toggleStatus = 'idle';
        console.log(action.payload);
        todoAdapter.updateOne(state, {
          id: action.payload._id, 
          changes: {
            completed: action.payload.completed
          }
        });
      })
      .addCase(toggleTodo.rejected, (state, action) => {
        state.toggleStatus = 'error';
        state.error = action.payload;
      })
      .addCase(deleteTodo.pending, (state) => {
        state.toggleStatus = 'loading';
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.toggleStatus = 'idle';
        console.log(action.payload);
        todoAdapter.removeOne(state,action.payload.deletedTodoId);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.toggleStatus = 'error';
        state.error = action.payload;
      });
  }
}
)

export default todoSlice.reducer









