class Api::AssetBalancesController < Api::BaseController
  def bulk_create
    user_id = bulk_import_params[:user_id]
    upload_file = bulk_import_params[:file]

    return render_bad_request([ "ファイルが見つかりません。" ]) unless upload_file.present?
    return render_bad_request([ "CSVファイルをアップロードしてください。" ]) unless File.extname(upload_file.original_filename).downcase == ".csv"

    begin
      AssetBalanceImportService.call(upload_file, user_id)
      render json: { message: "インポートに成功しました" }
    rescue => e
      render json: { errors: [ "エラーが発生しました: #{e.message}" ] }, status: :unprocessable_entity
    end
  end

  private

  def bulk_import_params
    params.permit(:file, :user_id)
  end
end
