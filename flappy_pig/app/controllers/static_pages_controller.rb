class StaticPagesController < ApplicationController
  def root
    @users_scores = UsersScore.all
  end
end
