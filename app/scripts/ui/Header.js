import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link } from 'react-router'

const Header = React.createClass({
  render() {
    return (
        <div class="container">
            <div class="header">
                <ul class="nav nav-pills pull-right">
                    <li class="active"><Link to="/">Campaigns</Link></li>
                    <li><Link to="/reports">Reports</Link></li>
                    <li><Link to="/customers">Customers</Link></li>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                </ul>
                <h3 class="text-muted">Admin Portal</h3>
            </div>
        </div>
    )
  }
});

const About = React.createClass({
  render() {
    return (
      <h3>About</h3>
    )
  }
})

const Inbox = React.createClass({
  render() {
    return (
      <div>
        <h2>Inbox</h2>
        {this.props.children || "Welcome to your Inbox"}
      </div>
    )
  }
})

const Message = React.createClass({
  render() {
    return (
      <h3>Message {this.props.params.id}</h3>
    )
  }
})

render((

), document.body)

module.exports = Header;