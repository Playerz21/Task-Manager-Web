import React, { useEffect, useState } from "react";

function AddTaskPage(props) {
  const [code, setCode] = useState("");
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState({ tasks: [] });
  const [check, setCheck] = useState("");

  const getList = () => {
    fetch(`http://127.0.0.1:8000/api/get-list?code=${code}`)
      .then((response) => response.json())
      .then((data) => {
        setData([data]);
      });
  };

  const addBtnClick = () => {
    if (input !== "") {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: input.toString(),
          code: code,
        }),
      };
      fetch(`http://127.0.0.1:8000/api/add-task`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          setTasks({ tasks: data });
        });
    }
  };

  const getTasks = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: code,
      }),
    };
    fetch(`http://127.0.0.1:8000/api/tasks`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          return [];
        }
        return response.json();
      })
      .then((data) => {
        setTasks({ tasks: data });
      });
  };

  const onCompleteClick = (icode, completed) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: icode,
        completed: completed,
      }),
    };
    fetch(`http://127.0.0.1:8000/api/completed`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setCheck(data.completed);
      });
  };

  const render = () => {
    return data.map((item) => {
      if (item["Invalid Code"] === "To Do List not Found") {
        return (
          <div key={"error"}>
            <h1>Error</h1>
          </div>
        );
      }
      return (
        <div key={code} className="list-group">
          <h1 className="list-group-head">{item.name}</h1>
        </div>
      );
    });
  };

  const renderTasks = () => {
    try {
      return (
        <table className="task-list">
          <tbody>
            <tr>
              <th className="index">Index</th>
              <th>Task</th>
              <th>Completed</th>
              <th>Delete</th>
            </tr>
            {tasks.tasks.map((task, index) => {
              return (
                <tr key={task.code}>
                  <td className="index">{(index + 1).toString()}</td>
                  <td>{task.description}</td>
                  <td className="completed-container">
                    <input
                      type="checkbox"
                      className="completed"
                      id="check"
                      checked={task.completed}
                      onChange={(e) => {
                        onCompleteClick(task.code, !task.completed);
                      }}
                    />
                  </td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => deleteButtonPressed(task.code)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    } catch (err) {
      <h1>Error</h1>;
    }
  };

  const deleteButtonPressed = (code) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: code }),
    };
    fetch("http://127.0.0.1:8000/api/delete-task", requestOptions)
      .then((response) => response.json)
      .then((data) => {
        getTasks();
      });
  };

  useEffect(() => {
    setCode(props.match.params.code);
  }, []);

  useEffect(() => {
    getList();
  }, [code]);

  useEffect(() => {
    getTasks();
  }, [code]);

  return (
    <div className="addtask-page">
      {render()}
      <div className="add_task-grp">
        <div className="input-field-add_task">
          <input
            id="name-text"
            type="text"
            placeholder="Name"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <button className="add-btn" onClick={addBtnClick}>
            Add
          </button>
        </div>
      </div>
      <div className="container">{renderTasks()}</div>
    </div>
  );
}

export default AddTaskPage;
