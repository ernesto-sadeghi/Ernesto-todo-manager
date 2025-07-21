'use client'
import axios from "axios";

import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { StatusFilters } from "./filterSlice";
import { logout } from "./userSlice";


export const fetchTodo = createAsyncThunk("todos/fetchtodo", async (id) => {
  const response = await axios.get(`http://localhost:5000/get-todos?userId=${id}`)
  return response.data
})
export const addTodo = createAsyncThunk("todos/addtodo", async (todo) => {
  
  const response = await axios.post('http://localhost:5000/todo-add', {
    ...todo, completed: false
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
export const setTodoColor = createAsyncThunk("todos/ChangeColor", async ({id,color}) => {
  console.log(id,color);
  
  const response = await axios.patch(`http://localhost:5000/todo-change-color/${id}`,{color});
  return response.data;
});




const todoAdapter = createEntityAdapter({ selectId: (todo) => todo._id, sortComparer: (a, b) => b._id.localeCompare(a._id) })


export const {
  selectById: selectTodoById,
  selectIds: selectTodoIds
} = todoAdapter.getSelectors(state => state.todos)
const initialState = todoAdapter.getInitialState({

  status: 'idle',
  toggleStatus: 'idle',
  error: null
})

const todoSlice = createSlice({
  name: "todos", initialState, reducers: {
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
      .addCase(setTodoColor.pending, (state) => {
        state.toggleStatus = 'loading';
      })
      .addCase(setTodoColor.fulfilled, (state, action) => {
        state.toggleStatus = 'idle';
        console.log(action.payload);
        
        todoAdapter.updateOne(state, {
          id: action.payload._id, 
          changes: {
            color: action.payload.color
          }
        });
      })
      .addCase(setTodoColor.rejected, (state, action) => {
        state.toggleStatus = 'error';
        state.error = action.payload;
      })
      .addCase(deleteTodo.pending, (state) => {
        state.toggleStatus = 'loading';
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.toggleStatus = 'idle';
        
        todoAdapter.removeOne(state,action.payload.deletedTodoId);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.toggleStatus = 'error';
        state.error = action.payload;
      })
      .addCase(logout, () => initialState);
  }
}
)

export default todoSlice.reducer


 const selectTodoEntities = state => state.todos.entities

export const selectTodos = createSelector(
    selectTodoEntities,
    (todoEntities) => Object.values(todoEntities)
)

const selectFilteredTodos = createSelector(selectTodos, state => state.filter,
    (todos, filters) => {
       
        const { filterStatus } = filters
        const showAll = filterStatus === StatusFilters.All
        if (showAll) {
            return todos  // Return all todos when no filters are applied
        }

        const showCompleted = filterStatus === StatusFilters.Completed
        return todos.filter(todo => {
            const statusMatches = showAll || (showCompleted && todo.completed) || (!showCompleted && !todo.completed)
         
            return statusMatches
        })
    }

)

export const selectSortedFilteredTodos = createSelector(
  selectFilteredTodos,
  (todos) =>
    todos
      .slice()
      .sort((a, b) => {
        const aTime = new Date(a.deadline);
        const bTime = new Date(b.deadline);

        // Handle missing deadlines (put at end)
        if (!a.deadline) return -1;
        if (!b.deadline) return -1;

        return aTime - bTime; 
      })
);
export const sortedFilteredTodoIds = createSelector(
  selectSortedFilteredTodos,
  (todos) => todos.map(todo => todo._id)
);