module RenderHelper
  # 400 Bad Request
  def render_bad_request(messages)
    render json: {
      messages: messages
    }, status: :bad_request
  end
end
