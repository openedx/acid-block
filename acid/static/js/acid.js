/* Javascript for the Acid XBlock. */
function AcidBlock(runtime, element) {

    function acidData(key) {
        return $('.acid-block, .aside-block', element).data(key);
    }

    function mark(result, selector, subelem, msg) {
        acid_update_status(selector, subelem, element, msg,
            acidData(result + '-class'), acidData('error-class'));
    }

    function resourceTests() {
        $.get(acidData('local-resource-url'))
            .fail(function() {
                mark('failure', '.local-resource-test', element, 'Unable to load local resource');
            })
            .done(function(data) {
                if (data.test_data === 'success') {
                    mark('success', '.local-resource-test');
                } else {
                    mark('failure', '.local-resource-test', element, 'Data mismatch');
                }
            });
    }

    function scopeTests() {
        $('.scope-storage-test', element).each(function() {
            var $this = $(this);
            $.ajaxq("acid-queue", {
                type: "POST",
                data: {"VALUE": $this.data('value')},
                url: $this.data('handler-url'),
                success: function (ret) {
                    mark('success', '.server-storage-test-returned', $this);
                    if (ret.status === "ok") {
                        mark('success', '.server-storage-test-succeeded', $this);

                        $.ajaxq("acid-queue", {
                            type: "POST",
                            data: {"VALUE": ret.value},
                            url: runtime.handlerUrl(element, "check_storage", ret.suffix, ret.query),
                            success: function (ret) {
                                mark('success', '.client-storage-test-returned', $this);

                                if (ret.status === "ok") {
                                    mark('success', '.client-storage-test-succeeded', $this);
                                } else {
                                    mark('failure', '.client-storage-test-succeeded', $this, ret.message);
                                }
                            }
                        });
                    } else {
                        mark('failure', '.server-storage-test-succeeded', $this, ret.message);
                    }
                }
            });
        });
    }

    mark('success', '.js-init-run');

    resourceTests();
    scopeTests();

    return {parentValue: acidData('parent-value')};
}
