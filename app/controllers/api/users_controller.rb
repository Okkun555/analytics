class Api::UsersController < ApplicationController
  def create
    User.create!(user_params)
    head :created
  end

  private

  def user_params
    params.require(:user).permit(:name, :sex, :birthday, :occupation_id)
  end
end
