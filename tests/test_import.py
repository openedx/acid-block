"""Smoke tests to verify the acid package is importable."""
import json

from acid.acid import FailureResponse, SuccessResponse


def test_import():
    """Verify the acid package and its public classes can be imported."""
    from acid import AcidBlock, AcidParentBlock, AcidAside  # noqa: F401


class TestSuccessResponse:
    """Tests for SuccessResponse."""

    def test_status_is_ok(self):
        response = SuccessResponse({})
        assert json.loads(response.body)['status'] == 'ok'

    def test_data_is_preserved(self):
        response = SuccessResponse({'key': 'value'})
        body = json.loads(response.body)
        assert body['key'] == 'value'
        assert body['status'] == 'ok'


class TestFailureResponse:
    """Tests for FailureResponse."""

    def test_status_is_error(self):
        response = FailureResponse("something went wrong")
        assert json.loads(response.body)['status'] == 'error'

    def test_message_is_preserved(self):
        response = FailureResponse("something went wrong")
        assert json.loads(response.body)['message'] == "something went wrong"
