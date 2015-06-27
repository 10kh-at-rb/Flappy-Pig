class StaticPagesController < ApplicationController
  def root
    @users_scores = UsersScore.order("score DESC").limit(10)
  end
end
