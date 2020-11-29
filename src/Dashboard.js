import React, { Component } from "react";
class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      dashboard: [],
      name: "",
      task: [],
      id: null
    };
  }
  componentDidMount() {
    this.getAllData();
    let token = localStorage.getItem("x-auth-token");
    // Simple GET request using fetch
    fetch("http://localhost:8000/dashboard", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    })
      .then(response => response.json())
      .then(response => {
        console.log("response", response);
        this.setState({
          dashboard: response
        });
      });
  }
  getAllData() {
    let token = localStorage.getItem("x-auth-token");
    fetch("http://localhost:8000/tasks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    })
      .then(response => response.json())
      .then(response => {
        // console.log("response", response)
        this.setState({
          task: response
        });
      });
  }
  addTask() {
    let token = localStorage.getItem("x-auth-token");
    fetch("http://localhost:8000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        name: this.state.name
      })
    })
      .then(response => response.json())
      .then(response => {
        console.log("responsessss", response);
        this.setState({
          name: response.name
        });
        this.getAllData();
      });
  }
  deleteTask(id) {
    let token = localStorage.getItem("x-auth-token");
    fetch("http://localhost:8000/tasks/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    })
      .then(response => response.json())
      .then(response => {
        console.log("delete", response);
        this.getAllData();
      });
  }
  updateTask(id) {
    let token = localStorage.getItem("x-auth-token");
    fetch("http://localhost:8000/tasks/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    })
      .then(response => response.json())
      .then(response => {
        console.log("update", response);
        this.getAllData();
        // this.setState({
        //   id: response.id
        // });
      });
  }
  logout() {
    //window.localStorage.removeItem("x-auth-token");
    window.localStorage.clear();
    this.props.history.push("/");
  }
  render() {
    const { dashboard } = this.state;
    const { task } = this.state;
    const { name } = this.state;
    const { id } = this.state;
    console.log("id", id);
    console.log("name", name);
    console.log("task", task);
    return (
      <div>
        <div className="container">
          <h1>Dashboard</h1>
          {dashboard.map((dashboardDetails, i) => (
            <div className="row" key={i}>
              <div className="col-sm-4">Latest Task:{dashboard[0].tasksCompleted}</div>
              <div className="col-sm-4">totalTasks:{dashboard[0].totalTasks}</div>
              <div className="col-sm-4">LatestTask:{dashboard[0].latestTasks[0].name}</div>
            </div>
          ))}
        </div>
        <div className="container">
          <table className="table">
            <tbody>
              {task.map((taskDetails, i) => (
                <tr key={i}>
                  <td>
                    {taskDetails.name}
                    {taskDetails.id}
                  </td>
                  <td>{taskDetails.id}</td>
                  <td
                    onClick={() => {
                      this.updateTask(taskDetails.id);
                    }}
                  >
                    Edit
                  </td>
                  <td
                    onClick={() => {
                      this.deleteTask(taskDetails.id);
                    }}
                  >
                    DELETE
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h1>Add New Task</h1>
          <input
            type="text"
            onChange={event => {
              this.setState({ name: event.target.value });
            }}
          />
          <button
            onClick={() => {
              this.addTask();
            }}
          >
            New Task
          </button>
          <button className="btn btn-primary" onClick={this.logout}>
            Logout
          </button>
        </div>
      </div>
    );
  }
}

export default Dashboard;
