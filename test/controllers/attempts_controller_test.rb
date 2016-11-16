require 'test_helper'

class AttemptsControllerTest < ActionController::TestCase
  test "should get graph" do
    get :graph
    assert_response :success
  end

end
