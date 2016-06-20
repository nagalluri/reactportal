
var React = window.React = require('react'),
    ReactDOM = require("react-dom"),
    Timer = require("./ui/Timer"),
    Card = require("./ui/Card"),
    mountNode = document.getElementById("app");

var data = [
  {name: "card1", budget: "Verizon", status: "Expired"},
  {name: "card2", customer: "Amazon", status: "Expired"},
  {name: "card3", customer: "Facebook", status: "Suspended"},
  {name: "card4", customer: "Apple", status: "Active"}
];

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

var CardView = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.source,
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
      <div className="testCard">
          <CardTable data={this.state.data} />
      </div>
    );
  }
});


ReactDOM.render(<CardView source="http://68.140.240.107:3000/api/v1/adminportal/campaigns/" pollInterval={2000} />, document.getElementById('content'));

