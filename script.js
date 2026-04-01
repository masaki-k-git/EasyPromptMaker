const elements = {
  target: document.getElementById("target"),
  goal: document.getElementById("goal"),
  currentStatus: document.getElementById("currentStatus"),
  constraints: document.getElementById("constraints"),
  output: document.getElementById("output"),
  preview: document.getElementById("preview"),
  copyButton: document.getElementById("copyButton"),
  resetButton: document.getElementById("resetButton"),
  copyStatus: document.getElementById("copyStatus"),
};

function getValue(el) {
  return el.value.trim() || el.placeholder;
}

function generateMarkdown() {
  return `##対象者
${getValue(elements.target)}

##達成したい目標
${getValue(elements.goal)}

##現状や既にやった事
${getValue(elements.currentStatus)}

##制約や問題点
${getValue(elements.constraints)}

##出力
${getValue(elements.output)}`;
}

function updatePreview() {
  elements.preview.textContent = generateMarkdown();
}

function copyMarkdown() {
  navigator.clipboard.writeText(generateMarkdown());
  elements.copyStatus.textContent = "コピーしました";
  setTimeout(() => (elements.copyStatus.textContent = ""), 2000);
}

function resetForm() {
  Object.values(elements).forEach((el) => {
    if (el.tagName === "TEXTAREA") el.value = "";
  });
  updatePreview();
  elements.copyStatus.textContent = "リセットしました";
  setTimeout(() => (elements.copyStatus.textContent = ""), 2000);
}

elements.copyButton.addEventListener("click", copyMarkdown);
elements.resetButton.addEventListener("click", resetForm);

[
  elements.target,
  elements.goal,
  elements.currentStatus,
  elements.constraints,
  elements.output,
].forEach((el) => el.addEventListener("input", updatePreview));

updatePreview();
