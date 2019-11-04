import "./App.css";
import React, { Component } from "react";
import ListElement from "./components/ListElement";
import { connect } from "react-redux";

//shortid
//npm i shortid
// id = shortid.generate()
//devono avere il tipe type: ""
const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  // l'oggetto che passo a dispatch è la mia azione che verrà presa dal reducer
  addTask: task => dispatch({ type: "ADD_TASK", payload: task }),
  setCompleted: index => dispatch({ type: "SET_COMPLETED", index: index }), //è un action
  toggleVisibility: () => dispatch({ type: "TOGGLE_SHOW_ALL" })
});

//const task = [1,2,3,4]
//var myObj = {task} => console.log(myObj) => {task: [1,2,3,4] }
//var myObj = {mioTask: task}
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: {
        text: "",
        completed: false
      }
    };
  }

  handleChange = event => {
    this.setState({
      task: {
        completed: false,
        text: event.target.value
      }
    });
  };

  handleDelete = index => {
    this.props.setCompleted(index);
  };

  handleShowVisibility = e => {
    this.props.toggleVisibility();
  };

  /*  handleAdd= () => {
    var toSend = {...this.state.task, id:shortid.gen()}
    this.props.addTask(toSend)
  } */

  render() {
    return (
      <div className="App-header">
        <div className="container" style={{ marginTop: "20vh" }}>
          <div className="row no-gutters">
            <div className="col-md-6 offset-md-2">
              <input
                className="py-1 w-100 px-2"
                type="text"
                value={this.state.task.text}
                //document.querySelector("input").addEventLister("change", myFunc)
                onChange={this.handleChange}
                name="task"
                label="task"
                placeholder="Insert a task"
              />
            </div>
            <div className="col-md-2">
              <button
                //docount.getElemetById("mioId").addEventLister("click", myFunc)
                onClick={() => {
                  this.setState({
                    task: {
                      text: "",
                      completed: false
                    }
                  });
                  this.props.addTask(this.state.task);
                }}
                className="btn btn-info btn-lg w-100"
              >
                ADD A TASK
              </button>
            </div>
          </div>
          {this.props.taskList.length > 0 && (
            <div className="row no-gutters">
              <div className="col-md-10 offset-md-2 d-flex justify-content-start align-items-baseline">
                <label for="checkbox1">Show Completed</label>
                <div class="form-check">
                  <input
                    id="checkbox1"
                    onChange={this.handleShowVisibility}
                    type="checkbox"
                    className="px-5"
                    defaultChecked
                  />
                </div>
              </div>
              {this.props.visibilityFilter.SHOW_ALL
                ? this.props.taskList.map((current, index) => (
                    <ListElement
                      key={index}
                      deleteTask={this.handleDelete}
                      task={current}
                      currentIndex={index}
                    />
                    //APP.JS passa delle props al figlio
                    //dal figlio passo delle props al padre
                  ))
                : this.props.taskList
                    .filter(current => !current.completed)
                    .map((current, index) => (
                      <ListElement
                        key={index}
                        deleteTask={this.handleDelete}
                        task={current}
                        currentIndex={index}
                      />
                      //APP.JS passa delle props al figlio
                      //dal figlio passo delle props al padre
                    ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
