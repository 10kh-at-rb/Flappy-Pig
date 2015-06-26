class StaticPagesController < ApplicationController
  def root
    @users_scores = UsersScore.order("score DESC").limit(4)
  end
end
