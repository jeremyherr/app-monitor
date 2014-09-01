/** @jsx React.DOM */
var StatusPage = React.createClass({
	getInitialState: function() {
		return {data: []};
	},
	loadSessions: function() {
		// Connect to server
		var socket = io.connect("http://localhost:8080");

		socket.emit("session list", {});

		socket.on("session list", function (data) {
			this.setState({data: data});
		}.bind(this));
	},
	componentDidMount: function() {
		this.loadSessions();
	},
	render: function() {
		return (
			<SessionList data={this.state.data} />
		);
	}
});

var SessionList = React.createClass({
	render: function() {
		var sessionNodes = this.props.data.map(function (session) {
			return (
				<Session clientType={session.clientType} address={session.address} />
			);
		});

		return (
			<ul className="session-list">
				{sessionNodes}
			</ul>
		);
	}
});

var Session = React.createClass({
	render: function() {
		return (
			<li>
				<span className="client-type">{this.props.clientType}</span>
				<span className="address">{this.props.address}</span>
			</li>
		);
	}
});

React.renderComponent(
	<StatusPage />,
	document.getElementById('dynamic-session-list')
);
