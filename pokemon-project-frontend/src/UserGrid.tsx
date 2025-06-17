import { useState } from "react";
import type { UserForm, UserResponse } from "./interface";
import { submit_user } from "./axiosPokemon";
interface Props {
  user_list: UserResponse[];
  setError: (error: string) => void;
  setClicked: (click: boolean) => void;
}
const UserGrid = ({ user_list, setError, setClicked }: Props) => {
  const initialForm: UserForm = {
    user_name: "",
    email: "",
    first_name: "",
    last_name: "",
  };
  const [form, setForm] = useState(initialForm);

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitUser = () => {
    submit_user(form)
      .then(() => {
        setError("");
        setClicked(true);
        setForm(initialForm);
      })
      .catch((error) => {
        setError(error.response.data);
      });
  };

  return (
    <>
      <p className="fs-2 fw-bold">Users</p>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="string"
                value={form.user_name}
                name="user_name"
                onChange={handleFormChange}
              ></input>
            </td>
            <td>
              <input
                type="email"
                value={form.email}
                name="email"
                onChange={handleFormChange}
              ></input>
            </td>
            <td>
              <input
                type="string"
                value={form.first_name}
                name="first_name"
                onChange={handleFormChange}
              ></input>
            </td>
            <td>
              <input
                type="string"
                value={form.last_name}
                name="last_name"
                onChange={handleFormChange}
              ></input>
            </td>
            <td>
              <button
                className="btn btn-primary"
                onClick={submitUser}
                disabled={
                  form.email == "" ||
                  form.first_name == "" ||
                  form.last_name == "" ||
                  form.user_name == ""
                }
              >
                Submit
              </button>
            </td>
          </tr>
          {user_list.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserGrid;
