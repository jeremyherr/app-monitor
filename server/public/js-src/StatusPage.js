/** @jsx React.DOM */
var SessionList = require("./SessionList.js");

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

React.renderComponent(
	<StatusPage />,
	document.getElementById("dynamic-session-list")
);