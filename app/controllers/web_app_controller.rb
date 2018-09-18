class WebAppController < ApplicationController
  def index
    if !params[:post_id].blank?
      @post = Post.find(params[:post_id])
    end
  end
end
