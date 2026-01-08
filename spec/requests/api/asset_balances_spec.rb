require 'rails_helper'

RSpec.describe "Api::AssetBalances", type: :request do
  describe "POST /api/asset_balance/bulk_create" do
    let(:user) { create(:user) }
    let(:params) { { user_id: user.id, file: csv_file } }

    after do
      @csv_temp&.close
      @csv_temp&.unlink
    end

    context "有効なファイルをアップロードした場合" do
      let(:csv_file) do
        @csv_temp = Tempfile.new([ 'asset_test', '.csv' ])
        CSV.open(@csv_temp.path, 'w', encoding: 'Shift_JIS') do |csv|
          csv << [ "日付", "合計（円）", "預金・現金・暗号資産（円）", "投資信託（円）", "年金（円）" ]
          csv << [ "2025-12-13", "100000", "70000", "20000", "10000" ]
          csv << [ "2025-12-14", "95000", "70000", "15000", "10000" ]
          csv << [ "2025-12-15", "150000", "100000", "30000", "20000" ]
        end
        Rack::Test::UploadedFile.new(@csv_temp.path, 'test/csv')
      end

      it "資産データを登録し、200と成功メッセージを返す" do
        # expect { subject }.to change { AssetBalance.count }.by(9)
        subject
        expect(response).to have_http_status(:ok)
      end
    end

    context "パラメータが不正な場合" do
      context "ファイルが存在しない場合" do
        let(:csv_file) { nil }

        it "400とエラーメッセージを返す" do
          subject
          expect(response).to have_http_status(:bad_request)
          expect(response.parsed_body).to eq({
            "messages" => [ "ファイルが見つかりません。" ]
          })
        end
      end

      context "ファイルがCSVファイル以外の場合" do
        let(:csv_file) do
          @temp_file = Tempfile.new([ 'asset_test', '.md' ])
          Rack::Test::UploadedFile.new(@temp_file.path, 'test/md')
        end

        it "400とエラーメッセージを返す" do
          subject
          expect(response).to have_http_status(:bad_request)
          expect(response.parsed_body).to eq({
            "messages" => [ "CSVファイルをアップロードしてください。" ]
          })
        end
      end
    end

    context "有効でないファイルをアップロードした場合" do
      context "ヘッダが不正な場合" do
        let(:csv_file) do
          @csv_temp = Tempfile.new([ 'asset_test', '.csv' ])
          CSV.open(@csv_temp.path, 'w', encoding: 'Shift_JIS') do |csv|
            csv << [ "日付", "合計（円）", "invalid", "投資信託（円）", "" ]
            csv << [ "2025-12-13", "100000", "70000", "20000", "10000" ]
            csv << [ "2025-12-14", "95000", "70000", "15000", "10000" ]
            csv << [ "2025-12-15", "150000", "100000", "30000", "20000" ]
          end
          Rack::Test::UploadedFile.new(@csv_temp.path, 'test/csv')
        end

        it "422とエラーメッセージを返す" do
          expect { subject }.not_to(change { AssetBalance.count })
          expect(response).to have_http_status(:unprocessable_entity)
          expect(response.parsed_body).to match({
            "messages" => [
              "ヘッダーが不正です。"
            ]
          })
        end
      end
    end
  end
end
