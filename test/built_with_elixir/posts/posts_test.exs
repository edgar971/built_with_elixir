defmodule BuiltWithElixir.PostsTest do
  use BuiltWithElixir.DataCase

  alias BuiltWithElixir.Posts

  describe "posts" do
    alias BuiltWithElixir.Posts.Post

    @valid_attrs %{author: "some author", description: "some description", github_url: "some github_url", title: "some title", type: "some type", website_url: "some website_url"}
    @update_attrs %{author: "some updated author", description: "some updated description", github_url: "some updated github_url", title: "some updated title", type: "some updated type", website_url: "some updated website_url"}
    @invalid_attrs %{author: nil, description: nil, github_url: nil, title: nil, type: nil, website_url: nil}

    def post_fixture(attrs \\ %{}) do
      {:ok, post} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Posts.create_post()

      post
    end

    test "list_posts/0 returns all posts" do
      post = post_fixture()
      assert Posts.list_posts() == [post]
    end

    test "get_post!/1 returns the post with given id" do
      post = post_fixture()
      assert Posts.get_post!(post.id) == post
    end

    test "create_post/1 with valid data creates a post" do
      assert {:ok, %Post{} = post} = Posts.create_post(@valid_attrs)
      assert post.author == "some author"
      assert post.description == "some description"
      assert post.github_url == "some github_url"
      assert post.title == "some title"
      assert post.type == "some type"
      assert post.website_url == "some website_url"
    end

    test "create_post/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Posts.create_post(@invalid_attrs)
    end

    test "update_post/2 with valid data updates the post" do
      post = post_fixture()
      assert {:ok, post} = Posts.update_post(post, @update_attrs)
      assert %Post{} = post
      assert post.author == "some updated author"
      assert post.description == "some updated description"
      assert post.github_url == "some updated github_url"
      assert post.title == "some updated title"
      assert post.type == "some updated type"
      assert post.website_url == "some updated website_url"
    end

    test "update_post/2 with invalid data returns error changeset" do
      post = post_fixture()
      assert {:error, %Ecto.Changeset{}} = Posts.update_post(post, @invalid_attrs)
      assert post == Posts.get_post!(post.id)
    end

    test "delete_post/1 deletes the post" do
      post = post_fixture()
      assert {:ok, %Post{}} = Posts.delete_post(post)
      assert_raise Ecto.NoResultsError, fn -> Posts.get_post!(post.id) end
    end

    test "change_post/1 returns a post changeset" do
      post = post_fixture()
      assert %Ecto.Changeset{} = Posts.change_post(post)
    end
  end
end
