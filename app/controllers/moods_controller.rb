class MoodsController < ApplicationController
  before_action :set_mood, only: [:show, :edit, :update, :destroy]

  # GET /moods
  # GET /moods.json
  def index
    puts "PARAMS #{params}"
    @for_date = params[:date] || Date.today
    @moods = Mood.where('DATE(noted_at) = ?', @for_date).group(:mood).select('COUNT(id) as mood_count, mood')
  end

  def moods_list
    index
    render partial: "list"
  end

  # GET /moods/1
  # GET /moods/1.json
  def show
  end

  # GET /moods/new
  def new
    @mood = Mood.new
  end

  # GET /moods/1/edit
  def edit
  end

  # POST /moods
  # POST /moods.json
  def create
    @mood = Mood.new(mood_params)
    if @mood.save
      render text: "Saved!"
    else
      render :json => { :errors => 'Something went wrong.' }, :status => 422
    end
  end

  # PATCH/PUT /moods/1
  # PATCH/PUT /moods/1.json
  def update
    respond_to do |format|
      if @mood.update(mood_params)
        format.html { redirect_to @mood, notice: 'Mood was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @mood.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /moods/1
  # DELETE /moods/1.json
  def destroy
    @mood.destroy
    respond_to do |format|
      format.html { redirect_to moods_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_mood
      @mood = Mood.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def mood_params
      params.require(:mood).permit(:mood)
    end
end
