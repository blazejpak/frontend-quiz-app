import "./styles/main.scss";
const data = require("../data/data.json");

type Questions = {
  title: string;
  icon: string;
  questions: Question[];
};

type Question = {
  answer: string;
  options: string[];
  question: string;
};

const quizzes: Questions[] = data.quizzes;
const ABCD: string[] = ["A", "B", "C", "D"];

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

function showSubjects() {
  const container: HTMLElement | null = document.querySelector(".container");
  const subjects: HTMLUListElement | null = document.querySelector(".subjects");

  try {
    if (subjects) {
      subjects.innerHTML = quizzes
        .map((subject, index) => {
          const icon = subject.icon.slice(1);

          const imagePath = require(`../public${icon}`);

          return `
        <li data-index="${index}" class="subjects__subject">
        <img src="${imagePath}" alt="${subject.title}" />
        <p>${subject.title}</p>
        </li>
        `;
        })
        .join("");

      const subject: NodeListOf<HTMLLIElement> =
        document.querySelectorAll(".subjects__subject");

      subject.forEach((sub) => {
        sub.addEventListener("click", (e) => {
          if (e.target instanceof HTMLElement) {
            const dataIndex = sub.dataset.index;
            if (dataIndex) {
              const index = Number(dataIndex);
              console.log(index);
              console.log(typeof index);

              container?.classList.remove("show");

              quiz(index);
            }
          }
        });
      });

      console.log(subject);
    }
  } catch (error) {
    console.log(error);
  }
}

// QUIZ MARK

function quiz(index: number) {
  const quizData = quizzes[index];

  try {
    if (quizData.title) {
      const quiz: HTMLElement | null = document.querySelector(".quiz");
      const subject: HTMLElement | null =
        document.querySelector(".header__subject");

      quiz?.classList.add("show");
      if (subject) {
        const icon = quizData.icon.split("/").pop();

        subject.innerHTML = `
          <img src="./${icon}" alt="${quizData.title}" />
          <p>${quizData.title}</p>
        `;
      }

      function task() {
        const questions = quizData.questions;
        const quizHome: HTMLDivElement = document.querySelector(".quiz__home")!;
        const quizAnswers: HTMLUListElement =
          document.querySelector(".quiz__answers")!;
        let questionNumber: number = 0;
        let pickedAnswer: number;
        console.log(questions);

        function question(questionId: number) {
          quizHome.innerHTML = `
          <p>Question ${questionId + 1} of ${questions.length}</p>
          <h2>${questions[questionId].question}</h2>
          `;

          if (quizAnswers) {
            quizAnswers.innerHTML = `${questions[questionId].options
              .map((option, i) => {
                // TODO
                const text = JSON.stringify(option);
                return `<li class="quiz__answer" data-answerindex="${i}">
              <p class='quiz__option' >${ABCD[i]}</p>
              <p>${text}</p>
              </li>`;
              })
              .join("")}
              `;

            quizAnswers.innerHTML += `<button type='button' class="btn" >Submit Answer</button>`;

            const quizAnswer: NodeListOf<HTMLLIElement> =
              document.querySelectorAll(".quiz__answer")!;
            console.log(quizAnswer);

            quizAnswer.forEach((answer) => {
              console.log(answer);
              answer.addEventListener("click", (e) => {
                if (e.target instanceof HTMLElement) {
                  const dataIndex = answer.dataset.answerindex;
                  if (dataIndex) {
                    const index = Number(dataIndex);

                    quizAnswer.forEach((answer, i) => {
                      answer.classList.toggle("active", i === index);
                    });

                    pickedAnswer = index;
                  }
                }
              });
            });

            const button: HTMLButtonElement = document.querySelector(".btn")!;

            button.addEventListener("click", () => {
              const correctAnswer = questions[questionNumber].answer;
              const correctAnswerIndex =
                questions[questionNumber].options.indexOf(correctAnswer);
              console.log(correctAnswerIndex);

              if (pickedAnswer === 0 || pickedAnswer) {
                console.log(
                  questions[questionNumber].options[pickedAnswer] ===
                    questions[questionNumber].answer
                );

                if (
                  questions[questionNumber].options[pickedAnswer] ===
                  questions[questionNumber].answer
                ) {
                  quizAnswer.forEach((answer, i) => {
                    answer.classList.toggle("correct", i === pickedAnswer);
                    answer.classList.remove("active");

                    answer.classList.add("disabled");
                  });
                } else {
                  quizAnswer.forEach((answer, i) => {
                    answer.classList.toggle("error", i === pickedAnswer);
                    answer.classList.toggle(
                      "correct",
                      i === correctAnswerIndex
                    );
                    answer.classList.remove("active");
                    answer.classList.add("disabled");
                  });
                }

                const nextButton = document.createElement("button");
                nextButton.textContent = "Next Answer";
                nextButton.classList.add("btn");

                button.parentNode?.replaceChild(nextButton, button);

                nextButton.addEventListener("click", (e) => {
                  quizAnswer.forEach((answer, i) => {
                    answer.classList.remove("correct");
                    answer.classList.remove("active");
                    answer.classList.remove("disabled");
                    answer.classList.remove("error");
                  });

                  questionNumber++;
                  question(questionNumber);
                });
              } else console.log("error");
            });
            console.log(questions[questionNumber]);
            console.log(pickedAnswer);
          }
        }

        question(questionNumber);
      }

      task();
    } else return;
  } catch (error) {
    console.log(error);
  }
}

showSubjects();
