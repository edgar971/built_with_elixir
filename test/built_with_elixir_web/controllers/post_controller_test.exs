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

  @form_create_attrs %{
    "author" => "some author",
    "description" => "some description",
    "github_url" => "some github_url",
    "title" => "some title",
    "type" => "some type",
    "website_url" => "some website_url",
    "image_url" => "some image_url",
    "author_email" => "edgar@me.com"
  }

  def fixture(:post) do
    {:ok, post} = Projects.create_post(@create_attrs)
    post
  end

  def fixture(:multiple_posts) do
    Enum.to_list(1..15)
    |> Enum.map(fn _ -> Projects.create_post(@create_attrs) end)
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    setup [:create_post]

    test "lists all posts", %{conn: conn} do
      conn = get(conn, post_path(conn, :index))
      response = hd(json_response(conn, 200)["data"])

      assert response ===
               Enum.into(
                 %{"id" => response["id"], "inserted_at" => response["inserted_at"]},
                 @create_attrs
               )
    end
  end

  describe "index with limit and offet" do
    setup [:create_multilple_posts]

    test "list posts with offset", %{conn: conn} do
      conn = get(conn, post_path(conn, :index), offset: 10)
      response = json_response(conn, 200)["data"]

      assert Enum.count(response) == 5
    end

    test "list posts with limit", %{conn: conn} do
      conn = get(conn, post_path(conn, :index), limit: 3)
      response = json_response(conn, 200)["data"]

      assert Enum.count(response) == 3
    end

    test "list posts with offset and limit", %{conn: conn} do
      conn = get(conn, post_path(conn, :index), offset: 1, limit: 20)
      response = json_response(conn, 200)["data"]

      assert Enum.count(response) == 14
    end
  end

  describe "show" do
    setup [:create_post]

    test "single existing post", %{conn: conn, post: post} do
      conn = get(conn, post_path(conn, :show, post.id))
      response = json_response(conn, 200)["data"]

      assert response ===
               Enum.into(
                 %{"id" => response["id"], "inserted_at" => response["inserted_at"]},
                 @create_attrs
               )
    end
  end

  describe "create" do
    test "a single post", %{conn: conn} do
      conn = post(conn, post_path(conn, :create, @form_create_attrs))
      response = json_response(conn, 201)["data"]

      assert response ===
               Enum.into(
                 %{"id" => response["id"], "inserted_at" => response["inserted_at"]},  # add the id and inserted_at 
                 @form_create_attrs
               )
               |> Map.delete("author_email") # remove the author_email since it's not in the response
    end
  end

  defp create_post(_) do
    post = fixture(:post)
    {:ok, post: post}
  end

  defp create_multilple_posts(_) do
    posts = fixture(:multiple_posts)
    {:ok, posts: posts}
  end
end
