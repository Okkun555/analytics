class Api::UsersController < Api::BaseController
  def index
    users = User.preload(:occupation).all.order(:id)

    render json: {
      data: users.map do |user|
        {
          id: user.id,
          name: user.name,
          age: user.age,
          sex: user.sex,
          occupation: user.occupation.name
        }
      end
    }
  end

  def create
    User.create!(user_params)
    head :created
  end

  private

  def user_params
    params.require(:user).permit(:name, :sex, :birthday, :occupation_id)
  end
end
