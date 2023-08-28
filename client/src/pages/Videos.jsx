import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from "../http-common";

const Books = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchAllVideos = async () => {
      try {
        const res = await http.get("videos");
        setVideos(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllVideos();
  }, []);

  console.log(videos);

  const handleDelete = async (id) => {
    try {
      await http.delete(`videos/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Youtube trending videos</h1>
      <div className="books">
        {videos.map((video) => (
          <div key={video.id} className="book">
            <h2>{video.title}</h2>
            <p>{video.watchcount}</p>
            <button className="delete" onClick={() => handleDelete(video.id)}>
              Delete
            </button>
            <button className="update">
              <Link
                to={`/update/${video.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Update
              </Link>
            </button>
          </div>
        ))}
      </div>

      <button className="addHome">
        <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
          Add new video
        </Link>
      </button>
    </div>
  );
};

export default Books;
