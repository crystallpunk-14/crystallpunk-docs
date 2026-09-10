/* Reusable retrieval-practice quiz widget for CrystallEdge lessons.
   Markup:
     <div class="quiz" data-answer="2">
       <p class="q">Question?</p>
       <button>Option one</button>
       <button>Option two</button>
       <button>Option three</button>
       <button>Option four</button>
       <p class="explain" hidden>Shown after the learner answers.</p>
     </div>
   data-answer is the 0-indexed correct button. Nothing is stored; reload = fresh. */

(function () {
  var css = `
  .quiz { border: 1px solid var(--rule); border-radius: 6px; padding: 1.1rem 1.3rem; margin: 1.8rem 0;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
  .quiz .q { font-weight: 600; margin: 0 0 0.9rem; font-size: 0.95rem; }
  .quiz button { display: block; width: 100%; text-align: left; margin: 0.4rem 0; padding: 0.6rem 0.8rem;
                 font: inherit; font-size: 0.88rem; color: var(--ink); background: var(--bg);
                 border: 1px solid var(--rule); border-radius: 5px; cursor: pointer; transition: background .12s; }
  .quiz button:hover:not(:disabled) { background: var(--accent-soft); }
  .quiz button:disabled { cursor: default; opacity: 1; }
  .quiz button.correct { border-color: var(--good); background: color-mix(in srgb, var(--bg) 82%, var(--good)); font-weight: 600; }
  .quiz button.wrong { border-color: var(--bad); background: color-mix(in srgb, var(--bg) 86%, var(--bad)); }
  .quiz .explain { margin: 0.9rem 0 0; font-size: 0.85rem; color: var(--ink-soft);
                   border-top: 1px solid var(--rule); padding-top: 0.7rem; }
  .quiz .verdict { font-weight: 600; }
  .quiz .verdict.ok { color: var(--good); }
  .quiz .verdict.no { color: var(--bad); }
  `;
  var s = document.createElement("style");
  s.textContent = css;
  document.head.appendChild(s);

  document.querySelectorAll(".quiz").forEach(function (quiz) {
    var answer = parseInt(quiz.dataset.answer, 10);
    var buttons = Array.prototype.slice.call(quiz.querySelectorAll("button"));
    var explain = quiz.querySelector(".explain");

    buttons.forEach(function (btn, i) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) { b.disabled = true; });
        buttons[answer].classList.add("correct");
        var right = i === answer;
        if (!right) btn.classList.add("wrong");
        if (explain) {
          var v = document.createElement("span");
          v.className = "verdict " + (right ? "ok" : "no");
          v.textContent = right ? "Correct. " : "Not quite. ";
          explain.prepend(v);
          explain.hidden = false;
        }
      });
    });
  });
})();
