import { showSubjects } from "../script";

describe("Show subjects function: ", () => {
  test("Should have 4 subjects", () => {
    document.body.innerHTML = `
    <div class="container">
      <ul class="subjects"></ul>
    </div>
  `;

    showSubjects();

    const listElements = document.querySelectorAll(".subjects__subject");
    const lengthValue = listElements.length;
    expect(lengthValue).toBe(4);
  });
});
