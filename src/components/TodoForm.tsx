import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { addTodo, editTodo, Todo } from '../store/todosSlice';
import { RootState } from '../store/store';

const TodoForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useNavigate();
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const username = useSelector((state: RootState) => state.auth.username);
  useEffect(() => {
    if (id) {
      const todo = todos.find((todo) => todo.id === id);
      if (todo) {
        setTitle(todo.title);
        setDescription(todo.description);
      }
    }
  }, [id, todos]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const todo: Todo = {
      id: id ? id : Date.now().toString(),
      title,
      description,
      userId: username
    };
    if (id) {
      dispatch(editTodo(todo));
    } else {
      dispatch(addTodo(todo));
    }
    history('/dashboard');
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h1 className="card-title text-center">
                {id ? 'Edit Todo' : 'Add Todo'}
              </h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    {id ? 'Update' : 'Add'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoForm;
