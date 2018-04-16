defmodule BuiltWithElixir.ProjectsTest do
  use BuiltWithElixir.DataCase

  alias BuiltWithElixir.Projects

  describe "posts" do
    alias BuiltWithElixir.Projects.Post

    @valid_attrs %{
      author: "some author",
      description: "some description",
      github_url: "some github_url",
      title: "some title",
      type: "some type",
      website_url: "some website_url",
      image_url: "some image_url"
    }
    @update_attrs %{
      author: "some updated author",
      description: "some updated description",
      github_url: "some updated github_url",
      title: "some updated title",
      type: "some updated type",
      website_url: "some updated website_url",
      image_url: "some updated image_url"
    }
    @invalid_attrs %{
      author: nil,
      description: nil,
      github_url: nil,
      title: nil,
      type: nil,
      website_url: nil,
      image_url: nil
    }

    def post_fixture(attrs \\ %{}) do
      {:ok, post} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Projects.create_post()

      post
    end

    test "list_posts/0 returns all posts" do
      post = post_fixture()
      assert Projects.list_posts() == [post]
    end

    test "list_posts/2 returns the requested posts with limit and offet" do
      Enum.to_list(1..15)
      |> Enum.each(fn _ -> post_fixture() end)

      assert Enum.count(Projects.list_posts(0)) == 10
      assert Enum.count(Projects.list_posts(0, 2)) == 2
      assert Enum.count(Projects.list_posts(10)) == 5
      assert Projects.list_posts(20) == []
    end

    test "get_post!/1 returns the post with given id" do
      post = post_fixture()
      assert Projects.get_post!(post.id) == post
    end

    test "create_post/1 with valid data creates a post" do
      assert {:ok, %Post{} = post} = Projects.create_post(@valid_attrs)
      assert post.author == "some author"
      assert post.description == "some description"
      assert post.github_url == "some github_url"
      assert post.title == "some title"
      assert post.type == "some type"
      assert post.website_url == "some website_url"
      assert post.image_url == "some image_url"
    end

    test "create_post/1 with valid optional data creates a post" do
      test_post =
        %{
          github_url: nil,
          website_url: nil
        }
        |> Enum.into(@valid_attrs)

      assert {:ok, %Post{} = post} = Projects.create_post(test_post)
      assert post.author == "some author"
      assert post.description == "some description"
      assert post.title == "some title"
      assert post.type == "some type"
      assert post.image_url == "some image_url"
    end

    test "create_post/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Projects.create_post(@invalid_attrs)
    end

    test "update_post/2 with valid data updates the post" do
      post = post_fixture()
      assert {:ok, post} = Projects.update_post(post, @update_attrs)
      assert %Post{} = post
      assert post.author == "some updated author"
      assert post.description == "some updated description"
      assert post.github_url == "some updated github_url"
      assert post.title == "some updated title"
      assert post.type == "some updated type"
      assert post.website_url == "some updated website_url"
      assert post.image_url == "some updated image_url"
    end

    test "update_post/2 with invalid data returns error changeset" do
      post = post_fixture()
      assert {:error, %Ecto.Changeset{}} = Projects.update_post(post, @invalid_attrs)
      assert post == Projects.get_post!(post.id)
    end

    test "delete_post/1 deletes the post" do
      post = post_fixture()
      assert {:ok, %Post{}} = Projects.delete_post(post)
      assert_raise Ecto.NoResultsError, fn -> Projects.get_post!(post.id) end
    end

    test "change_post/1 returns a post changeset" do
      post = post_fixture()
      assert %Ecto.Changeset{} = Projects.change_post(post)
    end
  end
end
