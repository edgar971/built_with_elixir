defmodule BuiltWithElixirWeb.PostController do
  use BuiltWithElixirWeb, :controller

  alias BuiltWithElixir.Projects
  alias BuiltWithElixir.Projects.Post

  action_fallback BuiltWithElixirWeb.FallbackController

  def index(conn, _params) do
    posts = Projects.list_posts()
    render(conn, "index.json", posts: posts)
  end

  def create(conn, %{"post" => post_params}) do
    with {:ok, %Post{} = post} <- Projects.create_post(post_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", post_path(conn, :show, post))
      |> render("show.json", post: post)
    end
  end

  def show(conn, %{"id" => id}) do
    post = Projects.get_post!(id)
    render(conn, "show.json", post: post)
  end

  def update(conn, %{"id" => id, "post" => post_params}) do
    post = Projects.get_post!(id)

    with {:ok, %Post{} = post} <- Projects.update_post(post, post_params) do
      render(conn, "show.json", post: post)
    end
  end

  def delete(conn, %{"id" => id}) do
    post = Projects.get_post!(id)
    with {:ok, %Post{}} <- Projects.delete_post(post) do
      send_resp(conn, :no_content, "")
    end
  end
end
