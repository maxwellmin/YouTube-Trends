import React, { useEffect, useState } from "react";
import http from "../http-common";
import "./videos-list.css";

const CategoryCount = (props) => {
  const [categoryCount, setCategoryCount] = useState([]);
  const [recommendList, setRecommendList] = useState([]);

  useEffect(() => {
    retrieveCategoryCount();
    retrieveRecommendations();
  }, []);

  const retrieveCategoryCount = () => {
    http
      .get(`/videos/categorycount`)
      .then((response) => {
        console.log(response.data);
        setCategoryCount(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveRecommendations = () => {
    http
      .get(`/videos/recommends`)
      .then((response) => {
        console.log(response.data);
        setRecommendList(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
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
                              <th scope="col">Category</th>
                              <th scope="col">Video Count</th>
                            </tr>
                          </thead>
                          <tbody>
                            {categoryCount.map((category) => {
                              return (
                                <tr>
                                  <td>{category.category}</td>
                                  <td>{category.num}</td>
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

      <br></br>

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
                              <th scope="col">Recommendations - Video Title</th>
                              <th scope="col">Channel</th>
                              <th scope="col">Category</th>
                              <th scope="col">View Count</th>
                            </tr>
                          </thead>
                          <tbody>
                            {recommendList.map((item) => {
                              return (
                                <tr>
                                  <td>{item.title}</td>
                                  <td>{item.channelTitle}</td>
                                  <td>{item.category}</td>
                                  <td>{item.viewCountMax}</td>
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

export default CategoryCount;
