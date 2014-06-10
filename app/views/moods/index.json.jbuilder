json.array!(@moods) do |mood|
  json.extract! mood, :id, :mood, :noted_at
  json.url mood_url(mood, format: :json)
end
