# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '2.0'

# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path

# Precompile additional assets.

# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
Rails.application.config.assets.precompile += %w( jquery-ui.min.js font-awesome.min.css assistant_core.js assistant.js assistant.css store.css calculator.js calculator.css videos.css new.js new.css theme.css smoothscroll.js dragula.css dragula.js example.css example.min.js before_new.js.erb before_new.css profile.css profile.js)
