class User < ApplicationRecord
  belongs_to :occupation

  # TODO: バリデーション周りを見直す
  validates :name, presence: true, uniqueness: true, length: { maximum: 100 }
  validates :birthday, presence: true
  validates :sex, presence: true

  enum sex: { man: 1, woman: 2 }, validate: true
end
