class User < ApplicationRecord
  belongs_to :occupation

  validates :name, presence: true, uniqueness: true, length: { maximum: 100 }
  validates :birthday, presence: true
  validates :birthday, comparison: { greater_than_or_equal_to: Date.new(1900, 1, 1), less_than_or_equal_to: Date.current }, if: lambda {
    birthday.present?
  }
  validates :sex, presence: true

  enum :sex, { man: 1, woman: 2 }, validate: true

  def age(as_of: Time.zone.today)
    years_diff = as_of.year - birthday.year

    # 誕生日を迎えていない場合は 1 年引く
    had_birthday = (as_of.month > birthday.month) || (as_of.month == birthday.month && as_of.day >= birthday.day)
    years_diff -= 1 unless had_birthday
    years_diff
  end
end
