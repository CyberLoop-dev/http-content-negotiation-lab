const form = document.querySelector("#form");
const result = document.querySelector("#result");
form.addEventListener("submit", async event => {
  event.preventDefault();
  const params = new URLSearchParams({
    accept: document.querySelector("#accept").value,
    offers: document.querySelector("#offers").value
  });
  result.textContent = "Calculating…";
  try {
    const response = await fetch("/api/negotiate?" + params);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Request failed");
    result.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    result.textContent = error.message;
  }
});
document.querySelector("#sample").addEventListener("click", () => {
  document.querySelector("#accept").value = "application/*;q=0.8, application/json;q=0, */*;q=0.1";
  document.querySelector("#offers").value = "application/json, application/xml, text/plain";
});
