defmodule BuiltWithElixirWeb.PageControllerTest do
  use BuiltWithElixirWeb.ConnCase

  test "GET /", %{conn: conn} do
    conn = get conn, "/"
    assert html_response(conn, 200) =~ "Built With Elixir - A collection of projects built with Elixir"
  end
end
