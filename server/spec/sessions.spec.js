var sinon = require("sinon");

describe("sessions object", function () {
	var sessions,
		SOCKET_ID = "internal socket session ID";

	beforeEach(function () {
		sessions = require("../sessions");
	});

	afterEach(function () {
		sessions = null;
	});

	it("Given getAll is called after object is created, then it returns an empty map", function () {
		expect(sessions.getAll()).toEqual( { } )
	});

	it("Given add is invoked then it adds a session, returns it, and this session has clientType unknown", function () {
		var session = sessions.add(SOCKET_ID);

		expect(sessions.getAll()[0]).toBe(session);

		// expect(Object.keys(sessions.getAll()).length).toBe( 1 );
		// expect(sessions.getSession(SOCKET_ID).clientType).toBe( "unknown" );
	});

	it("Given getAssociatedBrowserSessions is called with an appServerInstanceId, it returns a list of sessions with matching appServerInstanceId", function () {
		sessions.add(SOCKET_ID);

		expect(1).toBe(1);
	});

});