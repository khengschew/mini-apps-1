class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      'checkoutId': '',
      'current': 0,
      'name': '',
      'email': '',
      'password': '',
      'address1': '',
      'address2': '',
      'city': '',
      'state': '',
      'zipCode': '',
      'phoneNumber': '',
      'cc': '',
      'expiryDate': '',
      'cvv': '',
      'billingZip': ''
    }

    this.fields = [
      [],
      ['name', 'email', 'password'],
      ['address1', 'address2', 'city', 'state', 'zipCode', 'phoneNumber'],
      ['cc', 'expiryDate', 'cvv', 'billingZip'],
      []
    ];

    this.toggleForm = this.toggleForm.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  resetDataAndIncrementCurrent() {
    this.setState({
      'checkoutId': '',
      'current': 0,
      'name': '',
      'email': '',
      'password': '',
      'address1': '',
      'address2': '',
      'city': '',
      'state': '',
      'zipCode': '',
      'phoneNumber': '',
      'cc': '',
      'expiryDate': '',
      'cvv': '',
      'billingZip': ''
    });
  }

  toggleForm(e) {
    // Forms:
    // 0 = checkout button
    // 1 = name, email, password
    // 2 = address1, address2, city, state, zipCode, phoneNumber
    // 3 = cc, expiryDate, cvv, billingZip
    // 4 = confirmation
    e.preventDefault();

    if (this.state.current === this.fields.length - 1) {
      // Clear data, don't send Ajax
      this.resetDataAndIncrementCurrent();
    } else {
      // Handle ajax to database
      var bodyVals = {};
      if (this.state.checkoutId !== '') {
        bodyVals = {'checkoutId': this.state.checkoutId};
      }

      var currFields = this.fields[this.state.current];

      for (var i = 0; i < currFields.length; i++) {
        if (this.state[currFields[i]]) {
          bodyVals[currFields[i]] = this.state[currFields[i]];
        }
      }


      fetch('http://localhost:3000/', {
        method: 'post',
        body: JSON.stringify(bodyVals),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          // If data has checkoutId, set checkoutId
          // To do: figure out how to move renders array so we can use length as denominator
          data['current'] = (this.state.current + 1) % this.fields.length;
          this.setState(data);
        });
    }
  }

  onChangeHandler(e) {
    var update = {};
    update[e.target.name] = e.target.value;

    this.setState(update);
  }

  render() {
    var renders = [
      <button onClick={this.toggleForm}>Checkout</button>,
      <Form1 toggleForm={this.toggleForm} onChangeHandler={this.onChangeHandler}/>,
      <Form2 toggleForm={this.toggleForm} onChangeHandler={this.onChangeHandler}/>,
      <Form3 toggleForm={this.toggleForm} onChangeHandler={this.onChangeHandler}/>,
      <Confirmation toggleForm={this.toggleForm} states={this.state}/>
    ];

    return renders[this.state.current];
  }
}

var Form1 = (props) => (
  <div>
    <h3>Account Information</h3>
    <form name="form1">
      <label>Name</label><br />
      <input name="name" type="text" onChange={props.onChangeHandler}/><br />
      <label>Email</label><br />
      <input name="email" type="text" onChange={props.onChangeHandler}/><br />
      <label>Password</label><br />
      <input name="password" type="password" onChange={props.onChangeHandler}/><br />
      <input type="submit" value="Next" onClick={props.toggleForm}/>
    </form>
  </div>
);

var Form2 = (props) => (
  <div>
    <h3>Contact Information</h3>
    <form name="form2">
      <label>Address Line 1</label><br />
      <input name="address1" type="text" onChange={props.onChangeHandler}/><br />
      <label>Address Line 2</label><br />
      <input name="address2" type="text" onChange={props.onChangeHandler}/><br />
      <label>City</label><br />
      <input name="city" type="text" onChange={props.onChangeHandler}/><br />
      <label>State</label><br />
      <input name="state" type="text" onChange={props.onChangeHandler}/><br />
      <label>Zip</label><br />
      <input name="zip" type="text" onChange={props.onChangeHandler}/><br />
      <label>Phone Number</label><br />
      <input name="phoneNumber" type="text" onChange={props.onChangeHandler}/><br />
      <input type="submit" value="Next" onClick={props.toggleForm}/>
    </form>
  </div>
);

var Form3 = (props) => (
  <div>
    <h3>Payment Information</h3>
    <form name="form3">
      <label>Credit Card</label><br />
      <input name="cc" type="text" onChange={props.onChangeHandler}/><br />
      <label>Expiry Date</label><br />
      <input name="expiryDate" type="text" onChange={props.onChangeHandler}/><br />
      <label>CVV</label><br />
      <input name="cvv" type="text" onChange={props.onChangeHandler}/><br />
      <label>Billing Zip</label><br />
      <input name="billingZip" type="text" onChange={props.onChangeHandler}/><br />
      <input type="submit" value="Next" onClick={props.toggleForm}/>
    </form>
  </div>
);

var Confirmation = (props) => (
  <div>
    <h3>Please Confirm Details</h3>
    <h4>Account Information</h4>
    <table>
      <tbody>
        <tr>
          <td>Name:</td>
          <td>{props.states.name}</td>
        </tr>
        <tr>
          <td>Email:</td>
          <td>{props.states.email}</td>
        </tr>
        <tr>
          <td>Password:</td>
          <td>{props.states.password}</td>
        </tr>
        <tr>
          <td>Address Line 1:</td>
          <td>{props.states.address1}</td>
        </tr>
        <tr>
          <td>Address Line 2:</td>
          <td>{props.states.address2}</td>
        </tr>
        <tr>
          <td>City:</td>
          <td>{props.states.city}</td>
        </tr>
        <tr>
          <td>State:</td>
          <td>{props.states.state}</td>
        </tr>
        <tr>
          <td>Zip Code:</td>
          <td>{props.states.zipCode}</td>
        </tr>
        <tr>
          <td>Phone Number:</td>
          <td>{props.states.phoneNumber}</td>
        </tr>
        <tr>
          <td>Credit Card:</td>
          <td>{props.states.cc}</td>
        </tr>
        <tr>
          <td>Expiry Date:</td>
          <td>{props.states.expiryDate}</td>
        </tr>
        <tr>
          <td>CVV:</td>
          <td>{props.states.cvv}</td>
        </tr>
        <tr>
          <td>Billing Zip Code:</td>
          <td>{props.states.billingZip}</td>
        </tr>
      </tbody>
    </table>
    <button onClick={props.toggleForm}>Purchase</button>
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));