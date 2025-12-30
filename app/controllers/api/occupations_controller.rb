class Api::OccupationsController < Api::BaseController
  def index
    occupations = Occupation.all.order(:id)

    render json: {
      data: occupations.as_json(only: %i[id name])
    }, status: :ok
  end
end
