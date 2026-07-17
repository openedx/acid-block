/* Javascript for the Acid XBlock. */
function AcidParentBlock(runtime, element) {
    // this looks like but isn't really a subclass of AcidBlock
    this.runtime = runtime;
    this.element = element;
    this.type = $(element).data('block-type');

    var acid_frag_dom = $("> div > .acid-block", element);
    this.acid_frag = new AcidBlock(runtime, element, {acid_data_ele: acid_frag_dom});
    this.childTests();
}

AcidParentBlock.prototype = {
    acidData: function(key) {
        return $(this.element).children('div[data-' + key + ']').data(key);
    },

    mark: function(result, selector, subelem, msg) {
        acid_update_status(selector, subelem, this.element, msg,
            this.acidData(result + '-class'), this.acidData('error-class'));
    },
    childTests: function(){
        var acidChildCount = this.runtime.children(this.element).filter(function(child) {
            return child.type === "acid";
        }).length;
        this.mark((this.acidData('acid-child-count') == acidChildCount) ? 'success' : 'failure', '.child-counts-match');
    
        var childValues = JSON.parse($('.acid-child-values', this.element).html());
        var that = this;
        $.each(childValues, function(name, value) {
            var child_value = that.runtime.childMap(that.element, name).parentValue;
            if (child_value !== value) {
                that.mark(
                    'failure', '.child-values-match', that.element,
                    'Child ' + name + ' had value ' + child_value + ' but expected ' + value
                );
                return;
            }
        });
        this.mark('success', '.child-values-match');
    }
}
