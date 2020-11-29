import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      login: false,
      store: null
    };
  }
  componentDidMount(){
   this.storeCollectore();
  }
  storeCollectore(){
    let store = JSON.parse(localStorage.getItem('login'));
    this.setState({store:store})
    if(store && store.login){
      this.setState({login:true,store:store})
    }
    console.warn(store)

  }
  login() {
    fetch("http://localhost:8000/auth/login", {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
        },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
        })
    }).then(response => {
      response.json().then(result => {
        //console.warn("result", result.access_token);
        localStorage.setItem('x-auth-token', result.access_token)
        localStorage.setItem(
          "login",
          JSON.stringify({
            login: true,
            store:result.access_token
          }))
          this.storeCollectore();
          
      });
    });
  }
  render() {
    return (
      <div className="App">
       { !this.state.login?
                <div className="container">
                  <div className="form-group row">
                
                <div class="col-md-3 col-md-offset-4">
                <h1>Login</h1>
                 <input type="text" className="form-control" onChange={event => {
                    this.setState({ email: event.target.value });
                  }}></input>
                <br />
                  <input type="password" className="form-control" onChange={event => {
                    this.setState({ password: event.target.value });
                  }}></input>
                  <br></br>
                  <button type="button" className="btn btn-primary"  onClick={() => {
                    this.login();
                  }}>Login</button>
                  </div>
                  </div>
              </div>
              :
              <Redirect to='/Dashboard'  />
              
             }
      </div>
    );
  }
}
export default Login;
