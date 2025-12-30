require "rails_helper"

RSpec.describe "Api::Users", type: :request do
  before do
    # MEMO: 生年月日のテストの為、日付を固定する（全てのテストで固定しないとエラーとなったのでここで指定）
    travel_to(Time.zone.local(2025, 11, 30))
  end

  describe "GET /api/users" do
    context "データが存在する場合" do
      let(:occupation) { create(:occupation) }
      let!(:user_1) { create(:user, occupation:) }
      let!(:user_2) { create(:user, occupation:) }

      it "200とユーザー一覧を返却する" do
        subject
        expect(response).to have_http_status(:ok)
        expect(response.parsed_body).to match({
          "data" => [
            {
              "id" => user_1.id,
              "name" => user_1.name,
              "age" => user_1.age,
              "sex" => user_1.sex,
              "occupation" => occupation.name
            },
            {
              "id" => user_2.id,
              "name" => user_2.name,
              "age" => user_2.age,
              "sex" => user_2.sex,
              "occupation" => occupation.name
            }
          ]
        })
      end
    end

    context "データが存在しない場合" do
      it "200と空配列を返す" do
        subject
        expect(response).to have_http_status(:ok)
        expect(response.parsed_body).to match({
          "data" => []
        })
      end
    end
  end

  describe "POST /api/users" do
    let(:params) { { user: { name:, birthday:, sex:, occupation_id: } } }
    let(:name) { "佐藤" }
    let(:birthday) { "1990-01-01" }
    let(:sex) { "man" }
    let(:occupation) { create(:occupation) }
    let(:occupation_id) { occupation.id }

    context "パラメータが正常な場合" do
      it "201を返却し、レコードが作成される" do
        expect { subject }.to change { User.count }.by(1)
        expect(response).to have_http_status(:created)
      end
    end

    context "パラメータが不正な場合" do
      context "パラメータが空の場合" do
        let(:params) { {} }

        it "400とエラーメッセージを返す" do
          expect { subject }.not_to(change { User.count })
          expect(response).to have_http_status(:bad_request)
          expect(response.parsed_body).to match({
            "errors" => [ "パラメータが不足しています: user" ]
          })
        end
      end

      context "生年月日が不正な場合" do
        context "1900年1月1日以前の場合" do
          let(:birthday) { "1899-12-31" }

          it "422とエラーメッセージを返す" do
            expect { subject }.not_to(change { User.count })
            expect(response).to have_http_status(:unprocessable_content)
            expect(response.parsed_body).to match({
              "errors" => [ "生年月日 は1900-01-01以降の日付を入力してください" ]
            })
          end
        end

        context "未来日の場合" do
          let (:birthday) { "2025-12-01" }

          it "422とエラーメッセージを返す" do
            expect { subject }.not_to(change { User.count })
            expect(response).to have_http_status(:unprocessable_content)
            expect(response.parsed_body).to match({
              "errors" => [ "生年月日 は2025-11-30以前の日付を入力してください" ]
            })
          end
        end
      end

      context "性別が不正な場合" do
        let(:sex) { "invalid" }

        it "422とエラーメッセージを返す" do
          expect { subject }.not_to(change { User.count })
          expect(response).to have_http_status(:unprocessable_content)
          expect(response.parsed_body).to match({
            "errors" => [ "性別 は男性または女性を入力してください" ]
          })
        end
      end
    end
  end
end
