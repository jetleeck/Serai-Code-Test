import Form from "../form/Form";
import Table from "../table/Table";
import "./App.css";
import React from "react";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
  }

  render() {
    return (
      <div >
        <div className="formWrapper">
          <div id="title">Serai Code Test</div>
          <Form newResult={this.newResult}></Form>
        </div>
        <Table ref={this.child}></Table>
      </div>

    );
  }

  newResult = (result) => {
    this.child.current.updateData(result);
  }
}
