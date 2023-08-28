import React, { useEffect, useState } from "react";
import http from "../http-common";

const UserInfoSummary = (props) => {
  const [historys, setHistorys] = useState([]);
  const [summarys, setSummarys] = useState([]);

  useEffect(() => {
    getSearchHistory(props.match.params.id);
    getPopularCategory();
  }, [props.match.params.id]);

  const getSearchHistory = (id) => {
    http
      .get(`/users/searchhistory/${id}`)
      .then((response) => {
        console.log(response.data);
        setHistorys(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getPopularCategory = (id) => {
    http
      .get(`/users/summary`)
      .then((response) => {
        console.log(response.data);
        setSummarys(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <div className="row pb-1">
        <table>
          <thead>The top three favorite categories across all users are:</thead>
          <tbody>
            {summarys.length > 0 ? (
              summarys.map((summary) => {
                return (
                  <tr>
                    <td>{summary.category}</td>
                  </tr>
                );
              })
            ) : (
              <div>
                <p>No records.</p>
              </div>
            )}
          </tbody>
        </table>
      </div>

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
                              <th scope="col">Search Time</th>
                              <th scope="col">Keywords</th>
                            </tr>
                          </thead>
                          <tbody>
                            {historys.length > 0 ? (
                              historys.map((history) => {
                                return (
                                  <tr>
                                    <td>{history.searchTime}</td>
                                    <td>{history.keywords}</td>
                                  </tr>
                                );
                              })
                            ) : (
                              <div>
                                <p>No History Recorded.</p>
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
  );
};

export default UserInfoSummary;
