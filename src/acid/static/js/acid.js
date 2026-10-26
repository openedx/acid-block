/* Javascript for the Acid XBlock. */

function AcidBlock(runtime, element, fields) {
    this.runtime = runtime;
    this.element = element;
    if (fields && fields.acid_data_ele) {
        this.acid_data_ele = fields.acid_data_ele;
    } else {
        this.acid_data_ele = $(this.element).children('div[data-error-class]')[0];
    }
    this.type = $(element).data('block-type')

    this.mark('success', '.js-init-run', $(element));
    this.resourceTests();
    this.scopeTests();
}

AcidBlock.prototype = {
    acidData: function(key) {
        return $(this.acid_data_ele).data(key);
    },

    mark: function(result, selector, subelem, msg) {
        acid_update_status(selector, subelem, this.element, msg,
            this.acidData(result + '-class'), this.acidData('error-class'));
    },

    resourceTests: function() {
        var that = this;
        $.get(this.acidData('local-resource-url'))
            .fail(function() {
                that.mark('failure', '.local-resource-test', that.element, 'Unable to load local resource');
            })
            .done(function(data) {
                if (data.test_data === 'success') {
                    that.mark('success', '.local-resource-test', $(that.element));
                } else {
                    that.mark('failure', '.local-resource-test', that.element, 'Data mismatch');
                }
            });
    },

    scopeTests: function() {
        var that = this;
        $('.scope-storage-test', this.acid_data_ele).each(function() {
            var $this = $(this);
            $.ajaxq("acid-queue", {
                type: "POST",
                data: {"VALUE": $this.data('value')},
                url: $this.data('handler-url'),
                context: that,
                success: function (ret) {
                    this.mark('success', '.server-storage-test-returned', $this);
                    if (ret.status === "ok") {
                        this.mark('success', '.server-storage-test-succeeded', $this);

                        $.ajaxq("acid-queue", {
                            type: "POST",
                            data: {"VALUE": ret.value},
                            url: this.runtime.handlerUrl(this.element, "check_storage", ret.suffix, ret.query),
                            context: this,
                            success: function (ret) {
                                this.mark('success', '.client-storage-test-returned', $this);

                                if (ret.status === "ok") {
                                    this.mark('success', '.client-storage-test-succeeded', $this);
                                } else {
                                    this.mark('failure', '.client-storage-test-succeeded', $this, ret.message);
                                }
                            }
                        });
                    } else {
                        this.mark('failure', '.server-storage-test-succeeded', $this, ret.message);
                    }
                }
            });
        });
    }
};


function AcidAsideBlock(runtime, element, block_element, init_args) {
    AcidBlock.call(this, runtime, element);
    this.block_element = block_element;
    this.test_aside = init_args['test_aside']
    $(element).find("div > button + div").toggle();
    $(element).find("div > button").click(
        function() { $(this).next("div").toggle(); }
    )
    this.runTests();
}
AcidAsideBlock.prototype = Object.create(AcidBlock.prototype);
AcidAsideBlock.prototype.runTests = function() {
    if (this.test_aside) {
        if (this.block_element.data('block-type') === 'acid') {
            this.mark('success', '.acid-dom', $(this.element));
        } else {
            this.mark('failure', '.acid-dom', $(this.element));
        }
    }
}
