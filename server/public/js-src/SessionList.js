/** @jsx React.DOM */
var Session = require("./Session.js");

module.exports = React.createClass({
	render: function() {
		var sessionNodes = this.props.data.map(function (session) {
			return (
				<Session
					clientType={session.clientType}
					address={session.address}
					url={session.url}
					userAgent={session.userAgent}
					message={session.message} />
			);
		});

		return (
			<ul className="list session-list">
				{sessionNodes}
			</ul>
		);
	}
});