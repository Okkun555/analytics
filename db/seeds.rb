# 職業
occupations = %w[会社役員 会社員]

occupations.each do |name|
  Occupation.find_or_create_by!(name: name)
end
