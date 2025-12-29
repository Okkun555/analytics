require 'rails_helper'

RSpec.describe "Api::Occupations", type: :request do
  describe "GET /api/occupations" do
    context "職種データが存在する場合" do
      let!(:occupation_1) { create(:occupation) }
      let!(:occupation_2) { create(:occupation) }
      let!(:occupation_3) { create(:occupation) }

      it "200と職種一覧を返す" do
        subject
        expect(response).to have_http_status(:ok)
        expect(response.parsed_body).to match({
          "data" => [
            {
              "id" => occupation_1.id,
              "name" => occupation_1.name
            },
            {
              "id" => occupation_2.id,
              "name" => occupation_2.name
            },
            {
              "id" => occupation_3.id,
              "name" => occupation_3.name
            }
          ]
        })
      end
    end

    context "職種データが存在しない場合" do
      it "200と空配列を返す" do
        subject
        expect(response).to have_http_status(:ok)
        expect(response.parsed_body).to match({
          "data" => []
        })
      end
    end
  end
end
