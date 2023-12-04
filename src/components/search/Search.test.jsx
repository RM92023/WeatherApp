import { waitFor } from "vitest";
import { render, screen, describe, test, expect, jest } from "@testing-library/react";
import Search from "./Search";

const mockOnSearchChange = jest.fn();

describe("Search", () => {
  test("renders the search input", () => {
    render(<Search onSearchChange={mockOnSearchChange} />);

    const searchInput = screen.getByPlaceholderText("Search for city");
    expect(searchInput).toBeInTheDocument();
  });

  test("calls the handleOnChange callback when the input changes", () => {
    render(<Search onSearchChange={mockOnSearchChange} />);

    const searchInput = screen.getByPlaceholderText("Search for city");
    searchInput.value = "Medellín";
    searchInput.dispatchEvent(new Event("input"));

    expect(mockOnSearchChange).toHaveBeenCalledTimes(1);
    expect(mockOnSearchChange).toHaveBeenCalledWith({
      value: "Medellín",
      label: "Medellín, CO",
    });
  });

  test("renders the options when the input is filled", async () => {
    render(<Search onSearchChange={mockOnSearchChange} />);

    const searchInput = screen.getByPlaceholderText("Search for city");
    searchInput.value = "Medellín";
    searchInput.dispatchEvent(new Event("input"));

    await waitFor(() => expect(screen.getByRole("option")).toBeInTheDocument());
  });
});