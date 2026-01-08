require "rails_helper"

RSpec.describe AssetBalanceImportService, type: :service do
  describe ".call" do
    let(:user) { create(:user) }

    before do
      create(:asset_category, name: "預金・現金・暗号資産")
      create(:asset_category, name: "投資信託")
      create(:asset_category, name: "年金")
    end



    context "ヘッダーが不正な場合" do
      let(:file) do
        tmp = Tempfile.new([ 'asset_test', '.csv' ])
        CSV.open(tmp.path, 'w', encoding: 'Shift_JIS') do |csv|
          # 年金が欠落し、不要な値があり
          csv << [ "日付", "合計（円）", "invalid", "投資信託（円）" ]
          csv << [ "2025-12-13", "100000", "70000", "20000", "10000" ]
        end
        tmp
      end

      after do
        file&.close
        file&.unlink
      end

      it "エラーが発生する" do
        expect { described_class.call(file, user.id) }.to raise_error(AssetBalanceImportService::InvalidCSVFormat) { |ex|
          expect(ex.messages).to eq([ "ヘッダーが不正です。" ])
        }
      end
    end

    context "不正な値がある場合" do
      context "日付が不正な場合" do
        let(:file) do
          tmp = Tempfile.new([ 'asset_test', '.csv' ])
          CSV.open(tmp.path, 'w', encoding: 'Shift_JIS') do |csv|
            csv << [ "日付", "合計（円）", "預金・現金・暗号資産（円）", "投資信託（円）", "年金（円）" ]
            csv << [ "2025-12-13", "100000", "70000", "20000", "10000" ]
            csv << [ "2024", "100000", "70000", "20000", "10000" ]
          end
          tmp
        end

        it "エラーが発生する" do
          expect { described_class.call(file, user.id) }.to raise_error(AssetBalanceImportService::InvalidCSVFormat) { |ex|
            expect(ex.messages).to eq([ "3行目：日付が不正です。" ])
          }
        end
      end
      context "空白の値がある場合" do
        let(:file) do
          tmp = Tempfile.new([ 'asset_test', '.csv' ])
          CSV.open(tmp.path, 'w', encoding: 'Shift_JIS') do |csv|
            csv << [ "日付", "合計（円）", "預金・現金・暗号資産（円）", "投資信託（円）", "年金（円）" ]
            csv << [ "2025-12-13", "100000", "70000", "20000", "10000" ]
            csv << [ "2024-12-14", "100000", "70000", "", "10000" ]
          end
          tmp
        end

        it "エラーが発生する" do
          expect { described_class.call(file, user.id) }.to raise_error(AssetBalanceImportService::InvalidCSVFormat) { |ex|
            expect(ex.messages).to eq([ "3行目：投資信託（円）の値は必須です。" ])
          }
        end
      end

      context "0以下の値がある場合" do
        let(:file) do
          tmp = Tempfile.new([ 'asset_test', '.csv' ])
          CSV.open(tmp.path, 'w', encoding: 'Shift_JIS') do |csv|
            csv << [ "日付", "合計（円）", "預金・現金・暗号資産（円）", "投資信託（円）", "年金（円）" ]
            csv << [ "2025-12-13", "100000", "70000", "20000", "10000" ]
            csv << [ "2024-12-14", "100000", "70000", "-1", "10000" ]
          end
          tmp
        end

        it "エラーが発生する" do
          expect { described_class.call(file, user.id) }.to raise_error(AssetBalanceImportService::InvalidCSVFormat) { |ex|
            expect(ex.messages).to eq([ "3行目：投資信託（円）の値は0以上です。" ])
          }
        end
      end

      context "数値以外の値がある場合" do
        let(:file) do
          tmp = Tempfile.new([ 'asset_test', '.csv' ])
          CSV.open(tmp.path, 'w', encoding: 'Shift_JIS') do |csv|
            csv << [ "日付", "合計（円）", "預金・現金・暗号資産（円）", "投資信託（円）", "年金（円）" ]
            csv << [ "2025-12-13", "100000", "70000", "20000", "10000" ]
            csv << [ "2024-12-14", "100000", "70000", "文字列", "10000" ]
          end
          tmp
        end

        it "エラーが発生する" do
          expect { described_class.call(file, user.id) }.to raise_error(AssetBalanceImportService::InvalidCSVFormat) { |ex|
            expect(ex.messages).to eq([ "3行目：投資信託（円）の値は数値のみです。" ])
          }
        end
      end
    end
  end
end
