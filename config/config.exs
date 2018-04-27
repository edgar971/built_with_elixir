# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :built_with_elixir, ecto_repos: [BuiltWithElixir.Repo]

# Configures the endpoint
config :built_with_elixir, BuiltWithElixirWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "mEH7+C7DmjDqYRwGOft6aqpgGRN+FgVUYWrXEYdT6rbPOV5Vjjnac3wM2qxf3i1e",
  render_errors: [view: BuiltWithElixirWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: BuiltWithElixir.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :cloudini,
  name: System.get_env("CLOUDINARY_NAME"),
  api_key: System.get_env("CLOUDINARY_KEY"),
  api_secret: System.get_env("CLOUDINARY_SECRET"),
  stub_requests: false

config :built_with_elixir, 
  cloudinary_base_url: "https://res.cloudinary.com/elixir"


# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
import_config "web.exs"
