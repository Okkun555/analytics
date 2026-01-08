class AssetBalanceImportService
  CSV_HEADERS = [ "日付", "合計（円）", "預金・現金・暗号資産（円）", "投資信託（円）", "年金（円）" ]

  ASSET_CATEGORY_MAP = {
    "預金・現金・暗号資産（円）" => "預金・現金・暗号資産",
    "投資信託（円）" => "投資信託",
    "年金（円）" => "年金"
  }.freeze

  class InvalidCSVFormat < StandardError
    attr_reader :messages

    def initialize(messages)
      @messages = messages
      super("CSV形式が不正です")
    end
  end

  def self.call(file, user_id)
    csv = CSV.read(file.path, headers: true, encoding: "bom|Shift_JIS:UTF-8")
    header_validates!(csv)

    # カテゴリを先にロードしておく
    asset_categories = AssetCategory.where(name: ASSET_CATEGORY_MAP.values).index_by(&:name)

    errors = []

    # 全行バリデーションを実施し、エラーがあれば保存処理を実行しない
    csv.each.with_index(2) do |row, row_number|
      errors.concat(row_validates(row, row_number))
    end

    raise InvalidCSVFormat.new(errors) if errors.any?

    ActiveRecord::Base.transaction do
      csv.each do |row|
        date = Date.parse(row["日付"].to_s)

        ASSET_CATEGORY_MAP.each do |column_name, category_name|
          AssetBalance.find_or_initialize_by({
            user_id: user_id,
            date: date,
            asset_category_id: asset_categories[category_name].id
          }).update!(amount: row[column_name].to_i)
        end
      end
    end
  end

  #
  # バリデーション処理
  #
  private

  def self.header_validates!(csv)
    expected_headers = [ "日付", "合計（円）", "預金・現金・暗号資産（円）", "投資信託（円）", "年金（円）" ]
    actual_headers = (csv.headers || []).map { |h| h.to_s.strip }

    if (expected_headers - actual_headers).any?
      raise InvalidCSVFormat.new([ "ヘッダーが不正です。" ])
    end
  end

  def self.row_validates(row, row_number)
    row_errors = []

    # 日付チェック
    begin
      Date.parse(row["日付"].to_s.strip)
    rescue
      row_errors << "#{row_number}行目：日付が不正です。"
    end

    # 数値チェック
    ASSET_CATEGORY_MAP.keys.each do |header|
      value = row[header].to_s.strip

      if value.blank?
        row_errors << "#{row_number}行目：#{header}の値は必須です。"
        next
      end

      begin
        converted_value = Integer(value.gsub(/[,]/, ""))
        if converted_value < 0
          row_errors << "#{row_number}行目：#{header}の値は0以上です。"
        end
      rescue ArgumentError
        row_errors << "#{row_number}行目：#{header}の値は数値のみです。"
      end
    end
    row_errors
  end
end
