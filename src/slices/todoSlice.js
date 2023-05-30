import { createSlice } from '@reduxjs/toolkit';

const getInitialTodo = () => {
  const localTodoList = window.localStorage.getItem('todoList');

  if (localTodoList) {
    return JSON.parse(localTodoList);
  }
  window.localStorage.setItem('todoList', JSON.stringify([]));
  return [];
};

const initialValue = {
  todoList: getInitialTodo(),
};

export const todoSilce = createSlice({
  name: 'todo',
  initialState: initialValue,
  reducers: {
    addTodo: (state, action) => {
      state.todoList.push(action.payload);
      const todoList = window.localStorage.getItem('todoList');
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.push({
          ...action.payload,
        });
        window.localStorage.setItem('todoList', JSON.stringify(todoListArr));
      } else {
        window.localStorage.setItem('todoList', [{ ...action.payload }]);
      }
    },
  },
});

export const { addTodo } = todoSilce.actions;
export default todoSilce.reducer;
