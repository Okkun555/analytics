require 'rails_helper'

RSpec.describe User, type: :model do
  describe "#age" do
    let(:occupation) { create(:occupation) }
    let(:target_day) { Date.new(2025, 10, 2) }
    let(:name) { 'アカウント名' }
    let(:sex) { :man }

    context 'その年の誕生日をすでに迎えている場合' do
      let(:user) { described_class.new(occupation:, name:, sex:, birthday: Date.new(1990, 10, 1)) }

      it '正しい年齢を返却する' do
        expect(user.age(as_of: target_day)).to eq 35
      end
    end

    context 'その年の誕生日当日の場合' do
      let(:user) { described_class.new(occupation:, name:, sex:, birthday: Date.new(1990, 10, 2)) }

      it '正しい年齢を返却する' do
        expect(user.age(as_of: target_day)).to eq 35
      end
    end

    context 'その年の誕生日を迎えていない場合' do
      let(:user) { described_class.new(occupation:, name:, sex:, birthday: Date.new(1990, 10, 3)) }

      it '正しい年齢を返却する' do
        expect(user.age(as_of: target_day)).to eq 34
      end
    end
  end
end
