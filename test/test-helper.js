document.write('<div id="ember-testing-container"><div id="ember-testing"></div></div>');

Ember.testing = true;

import resolver from './helpers/resolver';
require('ember-qunit').setResolver(resolver);

// Make getScript into a no-op
$.getScript = Ember.RSVP.resolve;

import buildFBMock from 'test/helpers/build-fb-mock';
window.FB = buildFBMock();

function exists(selector) {
  return !!find(selector).length;
}

function getAssertionMessage(actual, expected, message) {
  return message || QUnit.jsDump.parse(expected) + " expected but was " + QUnit.jsDump.parse(actual);
}

function equal(actual, expected, message) {
  message = getAssertionMessage(actual, expected, message);
  QUnit.equal.call(this, actual, expected, message);
}

function strictEqual(actual, expected, message) {
  message = getAssertionMessage(actual, expected, message);
  QUnit.strictEqual.call(this, actual, expected, message);
}

window.exists = exists;
window.equal = equal;
window.strictEqual = strictEqual;
