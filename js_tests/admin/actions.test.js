/* global QUnit */
'use strict';

QUnit.module('admin.actions', {
    beforeEach: function() {
        // Number of results shown on page
        /* eslint-disable */
        window._actions_icnt = '100';
        /* eslint-enable */

        const $ = django.jQuery;
        $('#qunit-fixture').append($('#result-table').text());

        Actions(document.querySelectorAll('tr input.action-select'));
    }
});

QUnit.test('check', function(assert) {
    const $ = django.jQuery;
    assert.notOk($('.action-select').is(':checked'));
    $('#action-toggle').click();
    assert.ok($('.action-select').is(':checked'));
});

QUnit.test("a11y check", function(assert) {
    const $ = django.jQuery;
    const done = assert.async();
    axe.run($('.action-select')[0], function(err, result) {
        assert.equal(err, null);
        assert.equal(result.violations.length, 0, "There should be no A11y violations (check console for errors)");
        done();
    });
});
