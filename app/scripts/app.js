
import TableView from 'react-table-view'
import { Table } from 'react-bootstrap';
import { Button, Pagination } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';


var React = window.React = require('react'),
    Tabs = require('react-simpletabs'),
    ReactDOM = require("react-dom"),
    Timer = require("./ui/Timer"),
    Card = require("./ui/Card"),
    SortTable = require("./ui/SortTable"),
    List = require("./List"),
    mountNode = document.getElementById("app");

var CardTable = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      if(comment.status=="active") {
        return (            
          <div className="active">
            <Card name={comment.name} budget={comment.budget} status={comment.status}>
            </Card>
          </div>
        );
      } else if(comment.status=="expired") {
        return (            
          <div className="expired">
            <Card name={comment.name} budget={comment.budget} status={comment.status}>
            </Card>
          </div>
        );
      } else {
        return (            
          <div className="other">
            <Card name={comment.name} budget={comment.budget} status={comment.status}>
            </Card>
          </div>
        );
      }
    });
      return (
              <div className="CardTable">
                {commentNodes}
              </div>
        );
      }
});

var BoxView = React.createClass({
  loadCommentsFromServer: function() {
    console.log(this.props.activePage)
    $.ajax({
      url: this.props.source + "?per_page=12&page=" + this.state.activePage,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {
      data: [],
      activePage: 1
    };
  },
  handleSelect(eventKey) {
    this.setState({
      activePage: eventKey
    });
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="boxgrid">
        <CardTable data={this.state.data} />
        <div className="pager">
          <Pagination
            prev
            next
            first
            last
            items={20}
            maxButtons={3}
            activePage={this.state.activePage}
            onSelect={this.handleSelect} /> 
        </div>
      </div>
    )
  }
})

var CardView = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.source,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data}, function(){
        }.bind(this));
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var nextItems = this.state.items.concat([this.state.text]);
    var nextText = '';
    this.setState({items: nextItems, text: nextText});
  },
  render: function() {
        return (
          <Tabs>
            <Tabs.Panel title='Box'>
              <div className="BoxView">
                <BoxView source="http://68.140.240.107:3000/api/v1/adminportal/campaigns" pollInterval={2000} />
              </div>
            </Tabs.Panel>
            <Tabs.Panel title='List'>
              <div className="ListView">
                <BootstrapTable data={this.state.data} striped={true} hover={true} pagination={true} search={true}>
                  <TableHeaderColumn dataField="name" isKey={true} dataAlign="left" dataSort={true}>Campaign Name</TableHeaderColumn>
                  <TableHeaderColumn dataField="budget" dataAlign="center" dataSort={true}>Budget</TableHeaderColumn>
                  <TableHeaderColumn dataField="status" dataSort={true}>Status</TableHeaderColumn>
                  <TableHeaderColumn dataField="reward_frequency" dataSort={true}>Reward Frequency</TableHeaderColumn>
                  <TableHeaderColumn dataField="reward_size" dataSort={true}>Reward Size</TableHeaderColumn>
                  <TableHeaderColumn dataField="max_reward" dataSort={true}>Max Reward</TableHeaderColumn>
                </BootstrapTable>
              </div>
            </Tabs.Panel>
          </Tabs>
        )
  }
});



ReactDOM.render(<CardView source="http://68.140.240.107:3000/api/v1/adminportal/campaigns" pollInterval={2000} />, document.getElementById('content'));

