module RenderHelper
  # 400 Bad Request
  def render_bad_request(messages)
    render json: {
      messages: messages
    }, status: :bad_request
  end

  # 422 Unprocessable Entity
  def render_unprocessable_entity(messages)
    render json: {
      messages: messages
    }, status: :unprocessable_entity
  end
end
