const elements = {
  target: document.getElementById("target"),
  goal: document.getElementById("goal"),
  currentStatus: document.getElementById("currentStatus"),
  constraints: document.getElementById("constraints"),
  output: document.getElementById("output"),
  preview: document.getElementById("preview"),
  copyButton: document.getElementById("copyButton"),
  copyStatus: document.getElementById("copyStatus"),
};

function generateMarkdown() {
  const target = elements.target.value.trim();
  const goal = elements.goal.value.trim();
  const currentStatus = elements.currentStatus.value.trim();
  const constraints = elements.constraints.value.trim();
  const output = elements.output.value.trim();

  return `##対象者
${target}

##達成したい目標
${goal}

##現状や既にやった事
${currentStatus}

##制約や問題点
${constraints}

##出力
${output}`;
}

function updatePreview() {
  elements.preview.textContent = generateMarkdown();
}

async function copyMarkdown() {
  const markdown = generateMarkdown();

  try {
    await navigator.clipboard.writeText(markdown);
    elements.copyStatus.textContent = "コピーしました";
    window.setTimeout(() => {
      elements.copyStatus.textContent = "";
    }, 2000);
  } catch (error) {
    elements.copyStatus.textContent = "コピーに失敗しました";
    console.error("Clipboard copy failed:", error);
  }
}

[
  elements.target,
  elements.goal,
  elements.currentStatus,
  elements.constraints,
  elements.output,
].forEach((textarea) => {
  textarea.addEventListener("input", updatePreview);
});

elements.copyButton.addEventListener("click", copyMarkdown);

updatePreview();
