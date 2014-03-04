<%! import json %>

<div class="acid-parent-block"
    data-success-class="${success_class}"
    data-failure-class="${failure_class}"
    data-error-class="${error_class}"
    data-unknown-class="${unknown_class}"
    data-acid-child-count="${acid_child_count}"
    data-local-resource-url="${local_resource_url}"
>
    <script class="acid-child-values" type="application/json">
        ${json.dumps(acid_child_values)}
    </script>

    ${acid_html}

    <hr/>

    <h3>Acid Children</h3>

    <p>Acid Child counts match:
        <span class="child-counts-match">
            <i class="${unknown_class}"></i>
        </span>
    </p>
    <p>Acid Child values match:
        <span class="child-values-match">
            <i class="${unknown_class}"></i>
        </span>
    </p>

    <div class='acid-children'>
        % for child in rendered_children:
            ${child}
        % endfor
    </div>
</div>
