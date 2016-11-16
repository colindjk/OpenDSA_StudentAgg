class AttemptsController < ApplicationController

  @@user_data = File.read("public/json/attempts.json")

  def index
  end

  def data
    respond_to do |format|
      format.json {
        render :json => @@user_data
      }
    end
  end

end
