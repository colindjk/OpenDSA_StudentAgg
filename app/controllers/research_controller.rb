class ResearchController < ApplicationController

  @@user_data = File.read("public/json/user.json")

  def new
  end

  def show
    render :json => @@user_data
  end

  def index
    #render :json => @@user_data
  end

  def tables
    #render :json => @@user_data
  end

  def bar_graph
    render :json => @@user_data
  end

  def plot_graph
    #render :json => @@user_data
  end

  def data
    @research = Research.new
    @tables = Research.graphs
    @tables = Research.tables
  end

end
