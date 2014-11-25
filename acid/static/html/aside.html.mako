<%! import json %>

<div class="aside-block"
    data-success-class="${success_class}"
    data-failure-class="${failure_class}"
    data-error-class="${error_class}"
    data-unknown-class="${unknown_class}"
    data-local-resource-url="${local_resource_url}"
>
    <button>Acid Aside for ${usage_id}</button>
    <div>
        <p>JS init function run:
            <span class="js-init-run">
                <i class="${unknown_class}"></i>
            </span>
        </p>
        <p>Resource Url Test:
            <span class="local-resource-test">
                <i class="${unknown_class}"></i>
            </span>
        </p>
        <table class='storage-tests'>
            <tr>
                <th>Scope</th>
                <th>Server-side<br>handler_url<br>returned</th>
                <th>Server-side<br>handler_url<br>succeeded</th>
                <th>Client-side<br>handler_url<br>returned</th>
                <th>Client-side<br>handler_url<br>succeeded</th>
            </tr>
            % for test in storage_tests:
                <tr class="scope-storage-test scope-${test['scope']} ${loop.cycle('', 'alt')}"
                    data-handler-url="${test['handler_url']}"
                    data-scope="${test['scope']}"
                    data-value="${test['value']}"
                >
                    <td>${test['scope']}</td>
                    <td>
                        <span class="server-storage-test-returned">
                            <i class="${unknown_class}"></i>
                        </span>
                    </td>
                    <td>
                        <span class="server-storage-test-succeeded">
                            <i class="${unknown_class}"></i>
                        </span>
                    </td>
                    <td>
                        <span class="client-storage-test-returned">
                            <i class="${unknown_class}"></i>
                        </span>
                    </td>
                    <td>
                        <span class="client-storage-test-succeeded">
                            <i class="${unknown_class}"></i>
                        </span>
                    </td>
                </tr>
            % endfor
        </table>
        <p>Sees Acid DOM: <span class="acid-dom"><i class="${unknown_class}"></i></span></p>
    </div>
</div>
