import React, { Component } from 'react';
import { connect } from 'react-redux';
import Transport from '../../../src/transport';
import { increment, add } from './actions';

class App extends Component {
  handleIncrement() {
    this.props.dispatch(increment());
  }

  handleAdd() {
    this.props.dispatch(add());
  }

  createWrapper(children) {
    return <li className="dropdown">{children}</li>;
  }

  render() {
    const { count, notification } = this.props;
    const button = 0 < notification.length
      ? <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span className="glyphicon glyphicon-bell glyphicon-white" aria-hidden="true"></span> <span className="badge" style={{ marginTop: '-3px', marginBottom: '3px' }}>{notification.length}</span></a>
      : <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span className="glyphicon glyphicon-bell" aria-hidden="true"></span></a>;
    return <div>
      <h2>Inside: {count}</h2>
      <input className="btn btn-default" type="button" value="Increment" onClick={this.handleIncrement.bind(this)} />
      <span> </span>
      <input className="btn btn-default" type="button" value="Add Notification" onClick={this.handleAdd.bind(this)} />

      <Transport to="#outside-1">
        <h2>Outside: {count}</h2>
      </Transport>

      <Transport replace to="#outside-2" wrapBy={this.createWrapper}>
        {button}
        <ul className="dropdown-menu">
          {notification.map((item, i) =>
            <li key={i}><a href="#">{item}</a></li>
          )}
          <li key="d" role="separator" className="divider"></li>
          <li key="a"><a href="#">View all</a></li>
        </ul>
      </Transport>

      <Transport replace to="#outside-3" wrapBy={this.createWrapper}>
        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
          <span className="glyphicon glyphicon-envelope glyphicon-white" aria-hidden="true"></span>
          <span className="badge" style={{ margin: '-3px 0 3px 6px' }}>{count}</span>
        </a>
      </Transport>
    </div>;
  }
}

function select({ app }) {
  return { ...app };
}

export default connect(select)(App);
