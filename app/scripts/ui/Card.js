import React from 'react';
import FlipCard from 'react-flipcard';

var Card = React.createClass({
  getInitialState() {
    return {
      isFlipped: false
    };
  },

  showBack() {
    this.setState({
      isFlipped: true
    });
  },

  showFront() {
    this.setState({
      isFlipped: false
    });
  },

  handleOnFlip(flipped) {
    if (flipped) {
      this.refs.backButton.getDOMNode().focus();
    }
  },

  handleKeyDown(e) {
    if (this.state.isFlipped && e.keyCode === 27) {
      this.showFront();
    }
  },

  render() {
    return (
      <div>
        {/* Default behavior is horizontal flip on hover, or focus */}
        <FlipCard>
          {/* The first child is used as the front of the card */}
          <div>
            <div>Name: {this.props.name}</div>
            <div>Budget: {this.props.budget}</div>
          </div>
          {/* The second child is used as the back of the card */}
          <div>
            <div>Status: {this.props.status}</div>
          </div>
        </FlipCard>
      </div>
    );
  }
});

module.exports = Card;