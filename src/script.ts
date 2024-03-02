import "./styles/main.scss";
const data = require("../data/data.json");

type Questions = {
  title: string;
  icon: string;
  questions: Question;
};

type Question = {
  answer: string;
  options: string[];
  question: string;
};

const quizzes: Questions[] = data.quizzes;
console.log(data);
// COLOR SCHEME
function changeColorScheme() {
  const themeBTN = document.querySelector(".theme__btn");
  const bodyHTML: HTMLBodyElement = document.querySelector("body")!;

  try {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme:dark)").matches
    ) {
      bodyHTML.className = "dark";
      bodyHTML.classList.remove("light");
    } else {
      bodyHTML.className = "light";
      bodyHTML.classList.remove("dark");
    }

    const changeTheme = () => {
      bodyHTML.classList.toggle("light");
      bodyHTML.classList.toggle("dark");
    };

    themeBTN?.addEventListener("click", changeTheme);
  } catch (error) {
    console.log(error);
  }
}
changeColorScheme();

// show subjects

function showSubects() {
  const subjects: HTMLUListElement | null = document.querySelector(".subjects");

  try {
    if (subjects) {
      subjects.innerHTML = quizzes
        .map((subject, index) => {
          const icon = subject.icon.slice(1);
          console.log(icon);
          // const imagePath = require(`../public${icon}`);
          // console.log(imagePath);

          return `
        <li data-index="${index}" class="subjects__subject">
        <img src="../public${icon}" alt="${subject.title}" />
        <p>${subject.title}</p>
        </li>
        `;
        })
        .join("");
    }
  } catch (error) {
    console.log(error);
  }
}
showSubects();
