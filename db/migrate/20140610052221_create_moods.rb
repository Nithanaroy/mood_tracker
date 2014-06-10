class CreateMoods < ActiveRecord::Migration
  def change
    create_table :moods do |t|
      t.string :mood
      t.timestamp :noted_at

      t.timestamps
    end
  end
end
