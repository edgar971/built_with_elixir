defmodule BuiltWithElixirWeb.PostControllerTest do
  use BuiltWithElixirWeb.ConnCase

  alias BuiltWithElixir.Projects

  @create_attrs %{
    "author" => "some author",
    "description" => "some description",
    "github_url" => "some github_url",
    "title" => "some title",
    "type" => "some type",
    "website_url" => "some website_url",
    "image_url" => "some image_url"
  }

  def fixture(:post) do
    {:ok, post} = Projects.create_post(@create_attrs)
    post
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    setup [:create_post]

    test "lists all posts", %{conn: conn} do
      conn = get(conn, post_path(conn, :index))
      %{"id" => id} = response = hd(json_response(conn, 200)["data"])

      assert response === Map.put(@create_attrs, "id", id)
    end
  end

  describe "show" do
    setup [:create_post]

    test "single existing post", %{conn: conn, post: post} do
      conn = get(conn, post_path(conn, :show, post.id))
      %{"id" => id} = response = json_response(conn, 200)["data"]

      assert response === Map.put(@create_attrs, "id", id)
    end
  end

  defp create_post(_) do
    post = fixture(:post)
    {:ok, post: post}
  end
end
