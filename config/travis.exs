use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :built_with_elixir, BuiltWithElixirWeb.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :built_with_elixir, BuiltWithElixir.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "",
  database: "built_with_elixir_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox
