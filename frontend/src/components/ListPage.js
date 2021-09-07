import React, { Component, useEffect, useState } from "react";

function ListPage(props) {
  const [ldata, setData] = useState({ lists: [] });
  const [refresh, setRefresh] = useState("");
  const renderPage = () => {
    fetch("http://127.0.0.1:8000/api/lists")
      .then((res) => res.json())
      .then((data) => {
        setData({ lists: data });
        setRefresh(true);
      });
  };

  const deleteBtnPressed = (code) => {
    fetch("http://127.0.0.1:8000/api/delete-list?code=" + code)
      .then((response) => response.json())
      .then((data) => {
        renderPage();
        setRefresh(false);
      });
  };

  useEffect(() => {
    renderPage();
  }, [refresh]);

  return ldata.lists.length === 0 ? (
    <h1 className="error-head">You have no To Do Lists Create One</h1>
  ) : (
    <div>
      <h2 className="list-page-head">All Your Lists</h2>
      {ldata.lists.map((item) => {
        return (
          <div key={item.code} className="item-div">
            <div className="holder">
              <div
                className="items"
                onClick={() => {
                  props.history.push(`/add/${item.code}`);
                }}
              >
                <p className="item-name">{item.name}</p>
                <div className="desc-div">
                  <p>
                    {item.description != ""
                      ? item.description
                      : "No Description"}
                  </p>
                </div>
              </div>
              <button
                className="delete-btn"
                onClick={() => {
                  deleteBtnPressed(item.code);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ListPage;
