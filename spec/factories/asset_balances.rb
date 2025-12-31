FactoryBot.define do
  factory :asset_balance do
    date { Time.zone.local(2025, 12, 1) }
    amount { Faker::Number.between(from: 0, to: 100000) }
    association :user
    association :asset_category
  end
end
