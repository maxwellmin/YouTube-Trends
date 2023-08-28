import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import http from "../http-common";

const Update = () => {
  const [video, setVideo] = useState({
    id: -1,
    title: "",
    watchcount: null,
  });

  const [videoOrig, setVideoOrig] = useState({
    title: null,
    watchcount: null,
  });

  const [error, setError] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const videoId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await http.get(`videos/${videoId}`);
        setVideoOrig(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchVideo();
  }, [videoId]);

  const handleChange = (e) => {
    setVideo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      console.log(video);
      await http.put(`videos/${videoId}`, video);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Update the Video</h1>
      <input type="text" value={videoId} name="id" onChange={handleChange} />
      <input
        type="text"
        defaultValue={videoOrig.title}
        name="title"
        onChange={handleChange}
      />
      <input
        type="text"
        defaultValue={videoOrig.watchcount}
        name="watchcount"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Update</button>
      {error && "Something went wrong!"}
      <Link to="/">See all videos</Link>
    </div>
  );
};

export default Update;
