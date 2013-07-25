# Load the rails application
require File.expand_path('../application', __FILE__)

unless Rails.env.production?
  config = YAML.load(File.read(File.expand_path('../application.yml', __FILE__)))
  config.merge! config.fetch(Rails.env, {})
  config.each do |key, value|
      ENV[key] = value.to_s unless value.kind_of? Hash
  end
end

# Initialize the rails application
Fallinlike::Application.initialize!
