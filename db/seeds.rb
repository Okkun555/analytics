# 職業
occupations = %w[会社役員 会社員]

occupations.each do |name|
  Occupation.find_or_create_by!(name: name)
end

# 資産カテゴリ
asset_categories = %w[預金・現金・暗号資産 投資信託 年金]
asset_categories.each do |name|
  AssetCategory.find_or_create_by!(name: name)
end
