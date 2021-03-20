import React from "react";
import "./App.css";
import { Form, Input, Button, Divider } from "antd";
import axios from "axios";
import swal from "sweetalert";

type Numbers = {
  number1: number;
  number2: number;
  sum: number;
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function App() {
  const [state, setState] = React.useState<Numbers>({
    number1: 0,
    number2: 0,
    sum: 0,
  });

  const handleChange = (fieldName: keyof Numbers) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setState({ ...state, [fieldName]: e.currentTarget.value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!state.number1 && !state.number2) {
      swal("Error", "All Fields Required!", "error");
    } else {
      axios
        .post("/sum", {
          number1: state.number1,
          number2: state.number2,
        })
        .then((response) => {
          setState({
            ...state,
            sum: response.data.data,
          });
        })
        .catch((error) => {
          swal("Error", "Missing required fields number1 or number2!", "error");
        });
    }

    console.log("submit", state);
  };
  return (
    <>
      <div className="App">
        <div className="app-header">
          <div>Calculator</div>
        </div>
        <div className="container">
          <Form {...layout}>
            <p className="title">Enter the numbers</p>
            <Form.Item name="number1">
              <Input
                className="input-number"
                placeholder="number 1"
                value={state.number1}
                onChange={handleChange("number1")}
              />
            </Form.Item>

            <Form.Item name="number2">
              <Input
                className="input-number"
                placeholder="number 2"
                value={state.number2}
                onChange={handleChange("number2")}
              />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </Form.Item>
          </Form>
          <Divider className="divider" />
          {/* <hr className="divider"></hr> */}
          <div className="result">
            <p className="title">Result</p>
            <div>
              <p>{state.sum}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
