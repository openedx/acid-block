function acid_update_status(selector, element, block, msg, successClass, errorClass) {
    var elems, symbol;
    msg = msg || "";
    elems = $(selector, element || block).not($('.acid-children *', block));
    if (elems.length === 1) {
        symbol = $("<i/>", {
            'class': successClass
        });
        if (msg) {
            symbol = symbol.after(": " + msg);
        }
        symbol.appendTo(elems.empty());
    } else {
        $("<i/>", {
            'class': errorClass
        }).after("ASSERTION FAILURE: Can only mark single elements").appendTo(elems.empty());
        console.log(elems);
    }
}
