/* Javascript for the Acid XBlock. */
function AcidBlock(runtime, element) {

    function acidData(key) {
        return $('.acid-block', element).data(key);
    }

    function mark(result, selector, subelem, msg) {
        subelem = subelem || element;
        msg = msg || "";
        var elems = $(selector, subelem || element).not($('.acid-children *', element))
        if (elems.length == 1) {
            symbol = $("<i/>", {
                'class': acidData(result + '-class')
            });
            if (msg) {
                symbol = symbol.after(": " + msg)
            }
            symbol.appendTo(elems.empty());
        } else {
            $("<i/>", {
                'class': acidData('error-class')
            }).after("ASSERTION FAILURE: Can only mark single elements").appendTo(elems.empty())
            console.log(elems);
        }
    }

    function resourceTests() {
        $.get(acidData('local-resource-url'))
            .fail(function() {
                mark('failure', '.local-resource-test', element, 'Unable to load local resource');
            })
            .done(function(data) {
                if (data.test_data == 'success') {
                    mark('success', '.local-resource-test');
                } else {
                    mark('failure', '.local-resource-test', element, 'Data mismatch');
                }
            });
    }

    function childTests() {
        if (acidData('acid-child-count') == runtime.children(element).length) {
            mark('success', '.child-counts-match');
        }

        var childValues = JSON.parse($('.acid-child-values', element).html());
        $.each(childValues, function(name, value) {
            var child_value = runtime.childMap(element, name).parentValue;
            if (child_value != value) {
                mark(
                    'failure', '.child-values-match', element,
                    'Child ' + name + ' had value ' + child_value + ' but expected ' + value
                );
                return;
            }
        });
        mark('success', '.child-values-match');
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
                    if (ret.status == "ok") {
                        mark('success', '.server-storage-test-succeeded', $this);

                        $.ajaxq("acid-queue", {
                            type: "POST",
                            data: {"VALUE": ret.value},
                            url: runtime.handlerUrl(element, "check_storage", ret.suffix, ret.query),
                            success: function (ret) {
                                mark('success', '.client-storage-test-returned', $this);

                                if (ret.status == "ok") {
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

    childTests();
    resourceTests();
    scopeTests();

    return {parentValue: acidData('parent-value')};
}
