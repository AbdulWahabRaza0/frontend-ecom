import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LOGIN_USER } from "../gqloperations/mutation";
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const [loginUser, { loading, error, data }] = useMutation(LOGIN_USER);
  if (loading) return <h1>Loading...</h1>;
  if (error) {
    console.log(error);
  }
  if (data) {
    localStorage.setItem("jwt", data.login.jwt);
    navigate("/");
  }
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    await loginUser({
      variables: {
        input: formData,
      },
    });
  };

  return (
    <>
      <div className="container" style={{ maxWidth: "500px" }}>
        {error && <div className="card-panel red">{error.message}</div>}
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="email or username"
            name="identifier"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="password"
            name="password"
            onChange={handleChange}
            required
          />
          <br />
          <br />
          <button type="submit" className="btn blue">
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
