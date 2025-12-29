class ApplicationController < ActionController::Base
  allow_browser versions: :modern
  stale_when_importmap_changes

  rescue_from ActionController::ParameterMissing do |e|
    render json: { errors: [ I18n.t("errors.parameter_missing", param: e.param) ] }, status: :bad_request
  end

  rescue_from ActiveRecord::RecordInvalid do |e|
    render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
  end
end
