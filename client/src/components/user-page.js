import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from "../http-common";

const UserPage = (props) => {
  const initialDataState = {
    videoID: null,
    title: "",
    publishedAT: "",
    channelTitle: "",
    categoryID: -1,
    trending_date: null,
    tags: "",
    view_count: 0,
    likes: 0,
    dislikes: 0,
    thumbnail_link: "",
    description: "",
  };

  const [data, setData] = useState(initialDataState);
  const [videos, setVideos] = useState([]);
  const [httpStatus, setHttpStatus] = useState("");

  useEffect(() => {
    getWatchLater(props.match.params.id);
  }, [props.match.params.id]);

  const getWatchLater = (id) => {
    http
      .get(`/users/watchlater/${id}`)
      .then((response) => {
        console.log(response.data);
        setVideos(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const RemoveFromWatchLater = (video) => {
    http
      .delete(`/users/watchlater/${props.match.params.id}/${video.videoID}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const insertVideo = () => {
    const body = {
      videoID: data.videoID,
      title: data.title,
      publishedAT: data.publishedAT,
      channelTitle: data.channelTitle,
      categoryID: data.categoryID,
      trending_date: data.trending_date,
      tags: data.tags,
      view_count: data.view_count,
      likes: data.likes,
      dislikes: data.dislikes,
      thumbnail_link: data.thumbnail_link,
      description: data.description,
    };
    http
      .post(`/videos`, body)
      .then((response) => {
        console.log(response.data);
        setHttpStatus("Video has been added!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateVideo = () => {
    const body = {
      videoID: data.videoID,
      title: data.title,
      publishedAT: data.publishedAT,
      channelTitle: data.channelTitle,
      categoryID: data.categoryID,
      trending_date: data.trending_date,
      tags: data.tags,
      view_count: data.view_count,
      likes: data.likes,
      dislikes: data.dislikes,
      thumbnail_link: data.thumbnail_link,
      description: data.description,
    };
    http
      .put(`/videos/${data.videoID}/${data.trending_date}`, body)
      .then((response) => {
        console.log(response.data);
        setHttpStatus("Video has been updated!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteVideo = () => {
    http
      .delete(`/videos/${data.videoID}/${data.trending_date}`)
      .then((response) => {
        console.log(response.data);
        setHttpStatus("Video has been deleted!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {parseInt(props.user, 10) === 1000 ? (
        <div>
          <div className="row pb-1">
            <div className="input-group col-lg-1">
              <input
                type="text"
                className="form-control"
                placeholder="Video ID"
                onChange={(e) => {
                  setData({ ...data, videoID: e.target.value });
                }}
              />
            </div>
            <div className="input-group col-lg-1">
              <input
                type="text"
                className="form-control"
                placeholder="Title"
                onChange={(e) => {
                  setData({ ...data, title: e.target.value });
                }}
              />
            </div>
            <div className="input-group col-lg-1">
              <input
                type="text"
                className="form-control"
                placeholder="Published date YYYY-MM-DD"
                onChange={(e) => {
                  setData({ ...data, publishedAT: e.target.value });
                }}
              />
            </div>
            <div className="input-group col-lg-1">
              <input
                type="text"
                className="form-control"
                placeholder="Channel Title"
                onChange={(e) => {
                  setData({ ...data, channelTitle: e.target.value });
                }}
              />
            </div>
            <div className="input-group col-lg-1">
              <input
                type="number"
                className="form-control"
                placeholder="Category ID"
                onChange={(e) => {
                  setData({ ...data, categoryID: e.target.value });
                }}
              />
            </div>
            <div className="input-group col-lg-1">
              <input
                type="text"
                className="form-control"
                placeholder="Trending date YYYY-MM-DD"
                onChange={(e) => {
                  setData({ ...data, trending_date: e.target.value });
                }}
              />
            </div>
            <div className="input-group col-lg-1">
              <input
                type="text"
                className="form-control"
                placeholder="Tags"
                onChange={(e) => {
                  setData({ ...data, tags: e.target.value });
                }}
              />
            </div>
            <div className="input-group col-lg-1">
              <input
                type="number"
                className="form-control"
                placeholder="View count"
                onChange={(e) => {
                  setData({ ...data, view_count: e.target.value });
                }}
              />
            </div>
            <div className="input-group col-lg-1">
              <input
                type="number"
                className="form-control"
                placeholder="Likes"
                onChange={(e) => {
                  setData({ ...data, likes: e.target.value });
                }}
              />
            </div>
            <div className="input-group col-lg-1">
              <input
                type="number"
                className="form-control"
                placeholder="Dislikes"
                onChange={(e) => {
                  setData({ ...data, dislikes: e.target.value });
                }}
              />
            </div>
            <div className="input-group col-lg-1">
              <input
                type="text"
                className="form-control"
                placeholder="Thumbnail link"
                onChange={(e) => {
                  setData({ ...data, thumbnail_link: e.target.value });
                }}
              />
            </div>
            <div className="input-group col-lg-1">
              <input
                type="text"
                className="form-control"
                placeholder="Description"
                onChange={(e) => {
                  setData({ ...data, description: e.target.value });
                }}
              />
            </div>
            <div className="input-group col-xl">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={
                  data.videoID && data.trending_date
                    ? insertVideo
                    : () => {
                        setHttpStatus("Please fill out the fields.");
                      }
                }
              >
                Insert
              </button>
            </div>
            <div className="input-group col-xl">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={
                  data.videoID && data.trending_date
                    ? updateVideo
                    : () => {
                        setHttpStatus(
                          "Please fill out the fields (video ID, trending date)."
                        );
                      }
                }
              >
                Update
              </button>
            </div>
            <div className="input-group col-xl">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={
                  data.videoID && data.trending_date
                    ? deleteVideo
                    : () => {
                        setHttpStatus(
                          "Please fill out the fields (video ID, trending date)."
                        );
                      }
                }
              >
                Delete
              </button>
            </div>
            <div className="input-group col-1">
              <Link to={"/users/summary/" + props.match.params.id}>
                <button className="btn btn-outline-secondary" type="button">
                  Users Data Summary
                </button>
              </Link>
            </div>
          </div>

          <div>{httpStatus}</div>
        </div>
      ) : (
        <div>
          <div className="row pb-1">
            <div className="input-group col-1">
              <Link to={"/users/summary/" + props.match.params.id}>
                <button className="btn btn-outline-secondary" type="button">
                  Users Data Summary
                </button>
              </Link>
            </div>
          </div>

          <section className="intro">
            <div
              className="bg-image h-100"
              style={{ backgroundColor: "#f5f7fa" }}
            >
              <div className="mask d-flex align-items-center h-100">
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-12">
                      <div className="card">
                        <div className="card-body p-0">
                          <div
                            className="table-responsive table-scroll"
                            data-mdb-perfect-scrollbar="true"
                            style={{ position: "relative", height: "700px" }}
                          >
                            <table className="table table-striped mb-0">
                              <thead style={{ backgroundColor: "#002d72" }}>
                                <tr>
                                  <th scope="col">Remove</th>
                                  <th scope="col">Video Title</th>
                                  <th scope="col">Channel</th>
                                  <th scope="col">Published Date</th>
                                  <th scope="col">Thumbnail</th>
                                  <th scope="col">Description</th>
                                </tr>
                              </thead>
                              <tbody>
                                {videos.length > 0 ? (
                                  videos.map((video) => {
                                    return (
                                      <tr>
                                        <th scope="row">
                                          <button
                                            type="button"
                                            className="btn btn-info"
                                            onClick={() => {
                                              RemoveFromWatchLater(video);
                                            }}
                                          >
                                            Delete
                                          </button>
                                        </th>
                                        <td>{video.title}</td>
                                        <td>{video.channelTitle}</td>
                                        <td>{video.publishedAT}</td>
                                        <td>{video.thumbnail_link}</td>
                                        <td>{video.description}</td>
                                      </tr>
                                    );
                                  })
                                ) : (
                                  <div>
                                    <p>No Videos Saved.</p>
                                  </div>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default UserPage;
