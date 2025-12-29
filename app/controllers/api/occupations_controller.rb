class Api::OccupationsController < ApplicationController
  def index
    occupations = Occupation.all.order(:id)

    render json: {
      data: occupations.as_json(only: %i[id name])
    }, status: :ok
  end
end
