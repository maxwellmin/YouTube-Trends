import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import http from "../http-common";

const Add = () => {
  const [video, setVideo] = useState({
    id: null,
    title: "",
    watchcount: 0,
  });
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setVideo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await http.post("videos", video);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Add New Video</h1>
      <input
        type="number"
        placeholder="Video ID"
        name="id"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Video title"
        name="title"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Video watchcount"
        name="watchcount"
        onChange={handleChange}
      />

      <button onClick={handleClick}>Add</button>
      {error && "Something went wrong!"}
      <Link to="/">See all videos</Link>
    </div>
  );
};

export default Add;
