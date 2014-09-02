/** @jsx React.DOM */
module.exports = React.createClass({
	render: function() {
		return (
			<li>
				<span className="client-type">{this.props.clientType}</span>
				<span className="address">{this.props.address}</span>
				<span className="url">{this.props.url}</span>
				<span className="user-agent">{this.props.userAgent}</span>
				<span className="message">{this.props.message}</span>
			</li>
		);
	}
});