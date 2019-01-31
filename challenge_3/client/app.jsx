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
      'billingZip': '',
      'fields': [
        [],
        ['name', 'email', 'password'],
        ['address1', 'address2', 'city', 'state', 'zipCode', 'phoneNumber'],
        ['cc', 'expiryDate', 'cvv', 'billingZip'],
        []
      ]
    }

    this.toggleForm = this.toggleForm.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  toggleForm(e) {
    // Forms:
    // 0 = checkout button
    // 1 = name, email, password
    // 2 = address1, address2, city, state, zipCode, phoneNumber
    // 3 = cc, expiryDate, cvv, billingZip
    // 4 = confirmation
    e.preventDefault();

    // Handle ajax to database
    var bodyVals = {};

    var currFields = this.state.fields[this.state.current];

    for (var i = 0; i < currFields.length; i++) {
      bodyVals[currFields[i]] = this.state[currFields[i]];
    }

    fetch('http://localhost:3000/', {
      method: 'post',
      body: JSON.stringify(bodyVals),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((data) => {
        // If data has checkoutId, set checkoutId
        
        this.setState({
          // To do: figure out how to move renders array so we can use length as denominator
          'current': (this.state.current + 1) % this.state.fields.length
        });
      })
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
      <button onClick={this.toggleForm}>Purchase</button>
    ];

    return renders[this.state.current];
  }
}

var Form1 = (props) => (
  <form name="form1">
  <label>Name</label><br />
  <input name="name" type="text" onChange={props.onChangeHandler}/><br />
  <label>Email</label><br />
  <input name="email" type="text" onChange={props.onChangeHandler}/><br />
  <label>Password</label><br />
  <input name="password" type="password" onChange={props.onChangeHandler}/><br />
  <input type="submit" value="Next" onClick={props.toggleForm}/>
</form>
);

var Form2 = (props) => (
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
);

var Form3 = (props) => (
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
);

ReactDOM.render(<App />, document.getElementById('app'));