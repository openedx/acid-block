/* Javascript for the Acid XBlock. */
function AcidParentBlock(runtime, element) {

    function acidData(key) {
        return $('.acid-parent-block', element).data(key);
    }

    function mark(result, selector, subelem, msg) {
        acid_update_status(selector, subelem, element, msg,
            acidData(result + '-class'), acidData('error-class'));
    }

    function childTests() {
        var acidChildCount = runtime.children(element).filter(function(child) {
            return child.type == "acid";
        }).length;
        if (acidData('acid-child-count') == acidChildCount) {
            mark('success', '.child-counts-match');
        }

        var childValues = JSON.parse($('.acid-child-values', element).html());
        $.each(childValues, function(name, value) {
            var child_value = runtime.childMap(element, name).parentValue;
            if (child_value !== value) {
                mark(
                    'failure', '.child-values-match', element,
                    'Child ' + name + ' had value ' + child_value + ' but expected ' + value
                );
                return;
            }
        });
        mark('success', '.child-values-match');
    }

    AcidBlock(runtime, element);
    childTests();

    return {parentValue: acidData('parent-value')};
}
