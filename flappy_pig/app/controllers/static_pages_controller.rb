class StaticPagesController < ApplicationController
  def root
    @users_scores = UsersScore.order("score DESC").limit(10)

    if params[:query]
      render json: @users_scores, status: :ok
    end
  end
end
