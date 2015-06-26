class UsersScoresController < ApplicationController
  def create
    @user = UsersScore.new(leaderboard_params)

    if @user.save
      render json: @user, status: :ok
    else
      render json: "Problem", status: :unprocessable_entity
    end
  end

  private
    def leaderboard_params
      params.require(:leaderboard).permit(:name, :score)
    end

end
