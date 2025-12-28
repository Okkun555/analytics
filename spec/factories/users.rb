FactoryBot.define do
  factory :user do
    name { Faker::Name.first_name }
    birthday { Faker::Date.between(from: '1950-01-01', to: Time.zone.today) }
    sex { 1 }
  end
end
