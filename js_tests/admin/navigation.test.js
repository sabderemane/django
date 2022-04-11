/* global QUnit */
'use strict';

QUnit.module('admin.sidebar: filter', {
    beforeEach: function() {
        const $ = django.jQuery;
        $('#qunit-fixture').append($('#nav-sidebar-filter').text());
        this.navSidebar = $('#nav-sidebar');
        this.navFilter = $('#nav-filter');
        initSidebarQuickFilter();
    }
});

QUnit.test('filter by a model name', function(assert) {
    assert.equal(this.navSidebar.find('th[scope=row] a').length, 2);

    this.navFilter.val('us'); // Matches 'users'.
    this.navFilter[0].dispatchEvent(new Event('change'));
    assert.equal(this.navSidebar.find('tr[class^="model-"]:visible').length, 1);

    this.navFilter.val('nonexistent');
    this.navFilter[0].dispatchEvent(new Event('change'));
    assert.equal(this.navSidebar.find('tr[class^="model-"]:visible').length, 0);
});

QUnit.test("a11y check", function(assert) {
    const $ = django.jQuery;
    const done = assert.async();
    axe.run($('#qunit-fixture')[0], function(err, result) {
        assert.equal(err, null);
        assert.equal(result.violations.length, 0, "There should be no A11y violations (check console for errors)");
        done();
    });
});
