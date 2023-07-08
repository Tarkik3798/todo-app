import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { addTodo, editTodo, Todo } from '../store/todosSlice';
import { RootState } from '../store/store';

const TitleInput: React.FC<{ value: string; onChange: (value: string) => void }> = ({
  value,
  onChange,
}) => (
  <div>
    <input
      type="text"
      className="form-control"
      placeholder="Title"
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
    />
  </div>
);

const DescriptionTextarea: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => (
  <div>
    <textarea
      className="form-control"
      placeholder="Description"
      value={value}
      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
    />
  </div>
);

const TodoForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { todos, username } = useSelector((state: RootState) => ({
    todos: state.todos.todos,
    username: state.auth.username,
  }));
  const [title, setTitle] = useState(() => {
    const todo = todos.find((todo) => todo.id === id);
    return todo ? todo.title : '';
  });
  const [description, setDescription] = useState(() => {
    const todo = todos.find((todo) => todo.id === id);
    return todo ? todo.description : '';
  });
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  useEffect(() => {
    if (id && !todos.find((todo) => todo.id === id)) {
      navigate('/dashboard');
    }
  }, [id, todos, navigate]);

  const validateForm = () => {
    let isValid = true;
    if (title.trim() === '') {
      setTitleError('Title is required');
      isValid = false;
    } else {
      setTitleError('');
    }

    if (description.trim() === '') {
      setDescriptionError('Description is required');
      isValid = false;
    } else {
      setDescriptionError('');
    }

    return isValid;
  };

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!validateForm()) {
        return;
      }

      const todo: Todo = {
        id: id ? id : Date.now().toString(),
        title,
        description,
        userId: username,
      };
      if (id) {
        dispatch(editTodo(todo));
      } else {
        dispatch(addTodo(todo));
      }
      navigate('/dashboard');
    },
    [id, title, description, username, dispatch, navigate]
  );

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h1 className="card-title text-center">{id ? 'Edit Todo' : 'Add Todo'}</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <TitleInput value={title} onChange={setTitle} />
                  {titleError && <div className="text-danger">{titleError}</div>}
                </div>
                <div className="mb-3">
                  <DescriptionTextarea value={description} onChange={setDescription} />
                  {descriptionError && <div className="text-danger">{descriptionError}</div>}
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
  