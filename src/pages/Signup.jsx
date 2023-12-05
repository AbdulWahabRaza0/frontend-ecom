import { useMutation } from "@apollo/client";
import { useState } from "react";
import { SIGNUP } from "../gqloperations/mutation";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [SignupUser, { loading, error, data }] = useMutation(SIGNUP);
  if (loading) return <h1>Loading...</h1>;
  if (error) {
    console.log(error);
  }
  if (data) {
    localStorage.setItem("jwt", data.register.jwt);
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

    await SignupUser({
      variables: {
        input: formData,
      },
    });
  };

  return (
    <>
      <div className="container" style={{ maxWidth: "500px" }}>
        {error && <div className="card-panel red">{error.message}</div>}
        <h3>Signup</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="username"
            name="username"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="email"
            name="email"
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
            Signup
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
