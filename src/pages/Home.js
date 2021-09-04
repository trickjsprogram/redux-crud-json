import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserStart, loadUsersStart } from "../redux/actions";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const { users, error } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(loadUsersStart());
  }, []);

  useEffect(() => error && toast.error(error), [error]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure that you wanted to delete that user ?")) {
      dispatch(deleteUserStart(id));
      toast.success("User Deleted Successfully");
    }
  };
  return (
    <div style={{ marginTop: "100px" }}>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>ID</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Contact</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {users && users.map((item, index) => {
            return (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>
                  <Link to={`/editUser/${item.id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                  <Link to={`/userInfo/${item.id}`}>
                    <button className="btn btn-view">View</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
