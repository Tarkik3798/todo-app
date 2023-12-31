import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Todo {
  id: string;
  title: string;
  description: string;
  timestamp?: string;
  userId: string;
}

interface TodosState {
  todos: Todo[];
}

const initialState: TodosState = {
  todos: [],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<Todo>) {
      state.todos.push(action.payload);
    },
    editTodo(state, action: PayloadAction<Todo>) {
      const { id, title, description, userId } = action.payload;
      const todoIndex = state.todos.findIndex((todo) => todo.id === id);
      if (todoIndex !== -1) {
        state.todos[todoIndex] = { id, title, description, userId };
      }
    },
    removeTodo(state, action: PayloadAction<string>) {
      const todoId = action.payload;
      state.todos = state.todos.filter((todo) => todo.id !== todoId);
    },
  },
});

export const { addTodo, editTodo, removeTodo } = todosSlice.actions;

export default todosSlice.reducer;
