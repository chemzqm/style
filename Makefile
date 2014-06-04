build: components index.js
	@component-build --dev

components: component.json
	@component-install --dev

test:
	@component test phantom

test-browser:
	@component test browser

watch:
	@component build --dev -w

clean:
	rm -rf components build

.PHONY: clean start test test-browser
