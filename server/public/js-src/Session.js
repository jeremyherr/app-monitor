/** @jsx React.DOM */
module.exports = React.createClass({
	render: function() {
		return (
			<li>
				<span className="client-type">{this.props.clientType}</span>
				<span className="address">{this.props.address}</span>
			</li>
		);
	}
});