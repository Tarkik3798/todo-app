import React, { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { logout } from '../store/authSlice';
import { Todo, removeTodo } from '../store/todosSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faEdit, faRemove, faTrash } from '@fortawesome/free-solid-svg-icons';

const Dashboard: React.FC = React.memo(() => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const { username } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    dispatch(logout());
    navigate('/');
  }, [dispatch, navigate]);

  const handleEditTodo = useCallback((id: string) => {
    navigate(`/edit/${id}`);
  }, [navigate]);

  const handleRemove = useCallback(
    (todoId: string) => {
      dispatch(removeTodo(todoId));
      navigate('/dashboard');
    },
    [dispatch, navigate]
  );
  const filteredTodos = React.useMemo(
    () => todos.filter((todo: Todo) => todo.userId === username),
    [todos, username]
  );

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h1 className="card-title text-center">Dashboard</h1>
              {isAuthenticated ? (
                <div className="text-end mb-3">
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="text-end mb-3">
                  <Link to="/" className="btn btn-outline-primary">
                    Login
                  </Link>
                </div>
              )}
              {isAuthenticated && (
                <div className="text-center mb-3">
                  <Link to="/add" className="btn btn-outline-primary w-100">
                    <FontAwesomeIcon className='mx-1' icon={faAdd} />
                    Add Todo
                  </Link>
                </div>
              )}
              {isAuthenticated ? (
                <>
                  {filteredTodos.length > 0 ? (
                    <ul className="list-group">
                      {filteredTodos.map((todo: Todo) => (
                        <li className="list-group-item" key={todo.id}>
                          {todo.title}
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-primary float-end"
                            onClick={() => handleEditTodo(todo.id)}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>

                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger float-end mx-2"
                            onClick={() => handleRemove(todo.id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-center">
                      <p>No todos found.</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center">
                  <p>Please log in to view your todos.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Dashboard;
