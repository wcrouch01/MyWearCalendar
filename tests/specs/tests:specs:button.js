describe('Toggle Button', () => {
	// As the name suggests, this runs before each test. It is a good place to set
	// up common settings.
	beforeEach(() => {
		// Wait up to 5 seconds for commands to work
		browser.timeouts('implicit', 5000);
	});

    // It is important that we run each test in isolation. The running of a previous test
	// should not affect the next one. Otherwise, it could end up being very difficult to
	// track down what is causing a test to fail.
	afterEach(() => {
		browser.reload();
	});

    //TODO: Add new code and tests below
});