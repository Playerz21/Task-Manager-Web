import React, { useState } from "react";

function CreatePage(props) {
  const [input, setInput] = useState("");
  const [desc, setDesc] = useState("");
  const createBtnPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: input,
        description: desc,
      }),
    };
    fetch("http://127.0.0.1:8000/api/create-list", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };
  return (
    <div className="create-div">
      <div>
        <h1 className="create-head">Create a List</h1>
        <div className="input-field">
          <label htmlFor="name-input">Name: </label>
          <input
            className="input"
            id="name-input"
            placeholder="Name"
            value={input}
            onChange={(e) => {
              setInput(e.target.value.toString());
            }}
          />
        </div>
        <div className="input-field">
          <label htmlFor="decription-input">Description: </label>
          <input
            className="input"
            id="decription-input"
            placeholder="Description"
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value.toString());
            }}
          />
        </div>
        <button className="create-btn" onClick={createBtnPressed}>
          Create
        </button>
      </div>
    </div>
  );
}

export default CreatePage;
