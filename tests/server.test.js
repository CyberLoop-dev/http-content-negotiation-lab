const test = require("node:test");
const assert = require("node:assert/strict");
const { parseAccept, negotiate } = require("../server");

test("prefers the higher quality offer", () => {
  const result = negotiate("application/json, text/html;q=0.8", ["text/html", "application/json"]);
  assert.equal(result.selected, "application/json");
});

test("a specific q=0 overrides a wildcard", () => {
  const result = negotiate("application/*;q=0.8, application/json;q=0", ["application/json", "application/xml"]);
  assert.equal(result.selected, "application/xml");
  assert.equal(result.ranked[1].q, 0);
});

test("wildcard accepts an otherwise unmatched offer", () => {
  assert.equal(negotiate("*/*", ["text/plain"]).selected, "text/plain");
});

test("zero quality means no acceptable representation", () => {
  assert.equal(negotiate("text/html;q=0", ["text/html"]).selected, null);
});

test("malformed media ranges are ignored", () => {
  assert.equal(parseAccept("not-a-type, text/plain").length, 1);
});
