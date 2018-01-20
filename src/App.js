import React, { Component } from 'react';
import './App.css';

class App extends Component {
  
  constructor() {
    super()
    this.state = {
      title: 'PERN playground app',
      users: []
    }
  }

  // AJAX calls here
  componentDidMount() {
    console.log('COMPONENT HAS MOUNTED')
    var that = this
    fetch('http://localhost:3000/api/users')
      .then(function(response) {
        response.json()
        .then(function(data) {
          let users = that.state.users
          users.concat(data)
          that.setState({
            users: data
          })
        })
      })
  }

  removeUser(id) {
    let users = this.state.users
    let user = users.find(function(user) {
      return user.id === id
    })
    
    var request = new Request('http://localhost:3000/api/remove/' + id, {
      method: 'DELETE'
    })

    fetch(request)
      .then(function(response) {
        response.json()
        .then(function(data) {
          console.log(data)
        })
      })

  }

  addUser(event) {
    var that = this
    event.preventDefault()
    let user_data = {
      first_name: this.refs.first_name.value,
      last_name: this.refs.last_name.value,
      id: Math.random().toFixed(4) * 10000
    };
    var request = new Request('http://localhost:3000/api/new-user', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(user_data)
    });

    // xmlhttprequest()
    fetch(request)
    .then(function(response) {
      response.json()
        .then(function(data) {
          let users = that.state.users
          users.push(user_data)
          that.setState({
            users: users
          })
        })
    })
    .catch(function(err) {
      console.log(err)
    })
  }

  render() {
    let title = this.state.title
    let users = this.state.users
    return (
      <div className="App">
        <h1>{title}</h1>
        <form method="post" ref="userForm">
          <input type="text" ref="first_name" placeholder="first name" />
          <input type="text" ref="last_name" placeholder="last name" />
          <button onClick={this.addUser.bind(this)}>Add User</button>
        </form>
        <ul>
          {users.map(user => <li key={user.id}>{user.first_name} {user.last_name}&nbsp; 
          <button onClick={this.removeUser.bind(this, user.id)}>Remove</button></li>)}
        </ul>        
      </div>
    );
  }
}

export default App;
