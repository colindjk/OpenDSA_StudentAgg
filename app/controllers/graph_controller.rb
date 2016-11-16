class GraphController < ApplicationController

  @@user_data = File.read("public/json/user.json")

  def index
    respond_to do |format|
      format.js { render "graph/graph.js" }
      format.html
    end
  end

  def data
    respond_to do |format|
      format.json {
        render :json => @@user_data
      }
    end
  end

end
