import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { logout } from '../store/authSlice';
import { Todo } from '../store/todosSlice';

const Dashboard: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const username = useSelector((state: RootState) => state.auth.username);
  const dispatch = useDispatch();
  const history = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    history('/');
  };

  const handleEditTodo = (id: string) => {
    history(`/edit/${id}`);
  };
  const filteredTodos = todos.filter((todo: Todo) => todo.userId === username);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
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
                  <Link to="/add" className="btn btn-primary">
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
                            className="btn btn-sm btn-primary float-end"
                            onClick={() => handleEditTodo(todo.id)}
                          >
                            Edit
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
};

export default Dashboard;
