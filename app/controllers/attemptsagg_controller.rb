class AttemptsaggController < ApplicationController

  @@attempts = File.read("public/json/attempts.json")

  def thing
    respond_to do |format|
      format.js { render "attemptsagg/attemptsagg.js" }
      format.html
    end
  end

  def data
    respond_to do |format|
      format.json {
        render :json => @@attempts
      }
    end
  end

end
