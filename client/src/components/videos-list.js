import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from "../http-common";
import "./videos-list.css";

const VideosList = (props) => {
  const time = new Date();
  const initialQueryState = {
    keyword: "",
    startDate: "2019-12-31",
    endDate: "2023-12-31",
    viewCount: 0,
  };

  const [query, setQuery] = useState(initialQueryState);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    retrieveVideos();
  }, []);

  const retrieveVideos = () => {
    http
      .get(`/videos`)
      .then((response) => {
        console.log(response.data);
        setVideos(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const find = () => {
    http
      .get(
        `/videos?keyword=${query.keyword}&startDate=${query.startDate}&endDate=${query.endDate}&viewCount=${query.viewCount}`
      )
      .then((response) => {
        console.log(response.data);
        setVideos(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const addToHistory = () => {
    if (props.user) {
      const body = {
        searchTime: time.toLocaleString(),
        userID: props.user,
        keywords: query.keyword,
      };

      http
        .post(`/users/searchhistory`, body)
        .then((response) => {
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const addToWatchLater = (video) => {
    const body = {
      videoID: video.videoID,
      userID: props.user,
      title: video.title,
      publishedAT: video.publishedAT,
      channelTitle: video.channelTitle,
      categoryID: video.categoryID,
      tags: video.tags,
      thumbnail_link: video.thumbnail_link,
      description: video.description,
    };
    http
      .post(`/users/watchlater`, body)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <div className="row pb-1">
        <div className="input-group col-lg-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by keyword"
            value={query.keyword}
            onChange={(e) => {
              setQuery({ ...query, keyword: e.target.value });
            }}
          />
        </div>
        <div className="input-group col-lg-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by start date YYYY-MM-DD"
            onChange={(e) => {
              setQuery({ ...query, startDate: e.target.value });
            }}
          />
        </div>
        <div className="input-group col-lg-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by end date YYYY-MM-DD"
            onChange={(e) => {
              setQuery({ ...query, endDate: e.target.value });
            }}
          />
        </div>
        <div className="input-group col-lg-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by view count (above)"
            onChange={(e) => {
              setQuery({ ...query, viewCount: e.target.value });
            }}
          />
        </div>
        <div className="input-group col-1">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => {
              find();
              addToHistory();
            }}
          >
            Search
          </button>
        </div>
        <div className="input-group col-1">
          <Link to="/category/count">
            <button className="btn btn-outline-secondary" type="button">
              Category Count
            </button>
          </Link>
        </div>
      </div>

      <section className="intro">
        <div className="bg-image h-100" style={{ backgroundColor: "#f5f7fa" }}>
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
                              <th scope="col">Add</th>
                              <th scope="col">Video Title</th>
                              <th scope="col">Channel</th>
                              <th scope="col">Published Date</th>
                              <th scope="col">Trending Date</th>
                              <th scope="col">View Count</th>
                              <th scope="col">Likes</th>
                              <th scope="col">Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            {videos.map((video) => {
                              return (
                                <tr>
                                  <th scope="row">
                                    <div className="form-check">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        defaultChecked={false}
                                        onClick={
                                          props.user
                                            ? () => {
                                                addToWatchLater(video);
                                              }
                                            : () => {}
                                        }
                                        id="flexCheckDefault1"
                                      />
                                    </div>
                                  </th>
                                  <td>{video.title}</td>
                                  <td>{video.channelTitle}</td>
                                  <td>{video.publishedAT}</td>
                                  <td>{video.trending_date}</td>
                                  <td>{video.view_count}</td>
                                  <td>{video.likes}</td>
                                  <td>{video.description}</td>
                                </tr>
                              );
                            })}
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
  );
};

export default VideosList;
