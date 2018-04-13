defmodule BuiltWithElixir.Projects.Post do
  @moduledoc false

  use Ecto.Schema
  import Ecto.Changeset

  schema "posts" do
    field(:author, :string)
    field(:description, :string)
    field(:github_url, :string)
    field(:title, :string)
    field(:type, :string)
    field(:website_url, :string)
    field(:image_url, :string)

    timestamps()
  end

  @doc false
  def changeset(post, attrs) do
    post
    |> cast(attrs, [:title, :description, :author, :website_url, :github_url, :image_url, :type])
    |> validate_required([
      :title,
      :description,
      :author,
      :website_url,
      :github_url,
      :image_url,
      :type
    ])
  end
end
