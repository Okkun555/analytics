class AssetBalance < ApplicationRecord
  belongs_to :asset_category

  validates :date, presence: true
  validates :amount, numericality: { greater_than_or_equal_to: 0 }
end
