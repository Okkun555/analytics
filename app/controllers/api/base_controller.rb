class Api::BaseController < ApplicationController
  include RenderHelper
  protect_from_forgery with: :null_session
end
