const { changeColorScheme } = require("../script");

describe("Change color scheme function:", () => {
  test("Dark color scheme works correctly", () => {
    const mock = jest.fn();
    window.matchMedia = mock.mockReturnValue({ matches: true });

    changeColorScheme();

    expect(document.body.classList.contains("dark")).toBe(true);
    expect(document.body.classList.contains("light")).toBe(false);

    expect(window.matchMedia).toHaveBeenCalledWith(
      "(prefers-color-scheme:dark)"
    );
  });

  test("Light color scheme works correctly", () => {
    const mock = jest.fn();
    window.matchMedia = mock.mockReturnValue({ matches: false });

    changeColorScheme();

    expect(document.body.classList.contains("dark")).toBe(false);
    expect(document.body.classList.contains("light")).toBe(true);

    expect(window.matchMedia).toHaveBeenCalledWith(
      "(prefers-color-scheme:dark)"
    );
  });
});
