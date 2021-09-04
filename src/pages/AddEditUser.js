import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createUserStart, updateUserStart } from "../redux/actions";
import { toast } from "react-toastify";
import "./AddEditUser.css";

const initialState = {
  name: "",
  email: "",
  phone: "",
};

const AddEditUser = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { users } = useSelector((state) => state.data);
  const [editMode, setEditMode] = useState(false);
  const { name, email, phone } = formValue;
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setEditMode(true);
      const singleUser = users.find((item) => item.id === Number(id));
      setFormValue({ ...singleUser });
    } else {
      setEditMode(false);
      setFormValue({ ...initialState });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name && !email && !phone) {
      toast.error("Please provide value into each input field");
    } else {
      if (!editMode) {
        dispatch(createUserStart(formValue));
        toast.success("User Added Successfully");
        setTimeout(() => history.push("/"), 500);
      } else {
        dispatch(updateUserStart({ id, formValue }));
        setEditMode(false);
        toast.success("User Updated Successfully");
        setTimeout(() => history.push("/"), 500);
      }
    }
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name..."
          value={name || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your Email..."
          value={email || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="contact">Contact</label>
        <input
          type="number"
          id="phone"
          name="phone"
          placeholder="Your Contact No. ..."
          value={phone || ""}
          onChange={handleInputChange}
        />

        <input type="submit" value={id ? "Update" : "Save"} />
      </form>
    </div>
  );
};

export default AddEditUser;
