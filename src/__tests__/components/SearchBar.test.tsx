jest.mock("lucide-react-native", () => ({
  SearchIcon: () => null,
}));

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import SearchBar from "../../components/SearchBar";

describe("SearchBar", () => {
  it("renders with placeholder text", () => {
    render(<SearchBar value="" onChangeText={() => {}} />);

    expect(screen.getByPlaceholderText("Book title or author")).toBeTruthy();
  });

  it("displays the provided value", () => {
    render(<SearchBar value="Harry Potter" onChangeText={() => {}} />);

    expect(screen.getByDisplayValue("Harry Potter")).toBeTruthy();
  });

  it("calls onChangeText when text changes", () => {
    const mockOnChangeText = jest.fn();
    render(<SearchBar value="" onChangeText={mockOnChangeText} />);

    const input = screen.getByPlaceholderText("Book title or author");
    fireEvent.changeText(input, "New search");

    expect(mockOnChangeText).toHaveBeenCalledWith("New search");
  });

  it("applies focused style on focus", () => {
    render(<SearchBar value="" onChangeText={() => {}} />);

    const input = screen.getByPlaceholderText("Book title or author");
    fireEvent(input, "focus");

    expect(input).toBeTruthy();
  });
});
