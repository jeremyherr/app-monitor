/** @jsx React.DOM */
var Session = require("./Session.js");

module.exports = React.createClass({
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