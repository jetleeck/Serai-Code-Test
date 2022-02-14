import "./Form.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import React from "react";

export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: "",
      previousPhones: [],
      email: "",
      previousEmails: [],
    };
  }

  render() {
    return (
      <form>
        <div className="fieldWrapper" style={{ marginRight: 7.5 }}>
          <div className="field">
            <TextField
              label="*Phone no. (number only)"
              variant="standard"
              className="inputField"
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              value={this.state.phoneNumber}
              autoComplete="off"
              onChange={this.handleNumberChanged.bind(this)}
            />
          </div>
          <div className="field">
            <FormControl fullWidth>
              <InputLabel>Previous Phones</InputLabel>
              <Select
                label="Previous Phones"
                value={''}
                onChange={this.handlePhoneSelectChange.bind(this)}
              >
                {this.state.previousPhones?.map((previousSearch, key) => {
                  return (
                    <MenuItem key={key} value={previousSearch}>
                      {previousSearch}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
        </div>

        <div className="fieldWrapper" style={{ marginLeft: 7.5 }}>
          <div className="field">
            <TextField
              label="*Eamil"
              variant="standard"
              className="inputField"
              value={this.state.email}
              autoComplete="off"
              onChange={this.handleEmailChanged.bind(this)}
            />
          </div>
          <div className="field">
            <FormControl fullWidth>
              <InputLabel>Previous Emails</InputLabel>
              <Select
                label="Previous Emails"
                value={''}
                onChange={this.handleEmailSelectChange.bind(this)}
              >
                {this.state.previousEmails?.map((previousSearch, key) => {
                  return (
                    <MenuItem key={key} value={previousSearch}>
                      {previousSearch}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
        </div>

        <div className="field">
          <Button variant="contained" onClick={this.validateClicked}>
            Validate
          </Button>
        </div>
      </form>
    );
  }

  handleNumberChanged(event) {
    let number = event.target.value;
    this.setState({ phoneNumber: number });
  }

  handleEmailChanged(event) {
    let email = event.target.value;
    this.setState({ email: email });
  }

  handlePhoneSelectChange(event) {
    this.setState({ phoneNumber: event.target.value });
  }

  handleEmailSelectChange(event) {
    this.setState({ email: event.target.value });
  }

  handleValidation() {
    let number = this.state.phoneNumber;
    let email = this.state.email;
    let errorMessages = [];

    if (!number) {
      errorMessages.push('Please input phone number');
    }

    if (!email) {
      errorMessages.push('Please input email');
    }

    if(errorMessages.length > 0) {
      alert(errorMessages.join('\r\n'));
      return false;
    }
    else {
      return true;
    }
  }

  setPhoneSelectOptions() {
    if (!this.state.previousPhones.find(a => a === this.state.phoneNumber)) {
      this.state.previousPhones.push(this.state.phoneNumber);
      this.setState({
        previousPhones: this.state.previousPhones,
      });
    }
  }

  setEmailSelectOptions() {
    if (!this.state.previousEmails.find(a => a === this.state.email)) {
      this.state.previousEmails.push(this.state.email);
      this.setState({
        previousEmails: this.state.previousEmails,
      });
    }
  }

  validateClicked = (buttonName) => {
    if (this.handleValidation()) {

      this.setPhoneSelectOptions();
      this.setEmailSelectOptions();

      Promise.all([
        // phone validation
        fetch(
          `${process.env.REACT_APP_SERVER_URL}validatePhoneNumber/${this.state.phoneNumber}`,
          { method: "GET" }
        ),
        // email validation
        fetch(
          `${process.env.REACT_APP_SERVER_URL}validateEmail/${this.state.email}`,
          { method: "GET" }
        )
        // fetch(`${process.env.REACT_APP_SERVER_URL}test`, { method: "GET" }),
        // fetch(`${process.env.REACT_APP_SERVER_URL}test`, { method: "GET" })
      ]).then((responses) => {
        let phoneNumberError = false;
        let emailError = false;

        Promise.all([
          responses[0],
          responses[1],
        ]).then(results => {
          // error handling
          if (results[0].status != 200) {
            phoneNumberError = true;
          }

          if (results[1].status != 200) {
            emailError = true;
          }
          Promise.all([
            responses[0].json(),
            responses[1].json()
          ]).then(finalResults => {
            let errorMessages = [];
            if(phoneNumberError) {
              errorMessages.push(finalResults[0].message);
            }
            if(emailError) {
              errorMessages.push(finalResults[1].message);
            }

            if (errorMessages.length > 0) {
              alert(errorMessages.join('\r\n'));
            }
            
            let merged = { ...finalResults[0], ...finalResults[1] };

            let finalResult = {
              phone: merged.number,
              phoneValid: merged.valid,
              email: merged.email,
              emailValid: merged.formatValid
            }
            if (finalResult.phone || finalResult.email)
              this.props.newResult(finalResult);
          })

        })
      })
    }
  };
}
