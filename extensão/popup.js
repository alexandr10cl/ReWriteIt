// 🔧 Substitua essa variável pelo link da sua API no Render
const API_URL = "http://127.0.0.1:5000/rewrite";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("rewriteForm");
    const textArea = document.getElementById("text");
    const charCount = document.getElementById("charCount");
    const resultBlock = document.getElementById("result");
    const resultText = document.getElementById("resultText");
    const loading = document.getElementById("loading");
    const copyBtn = document.getElementById("copyBtn");

    // Atualiza contador de caracteres
    textArea.addEventListener("input", () => {
        charCount.textContent = textArea.value.length;
    });

    // Submissão do formulário
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        resultBlock.classList.add("hidden");
        loading.classList.remove("hidden");

        const formData = new FormData(form);

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Erro ao reescrever o texto.");
            }

            const rewrittenText = await response.text();

            resultText.textContent = rewrittenText;
            resultBlock.classList.remove("hidden");
        } catch (err) {
            resultText.textContent = "Erro ao se comunicar com a IA. Tente novamente.";
            resultBlock.classList.remove("hidden");
            console.error(err);
        } finally {
            loading.classList.add("hidden");
        }
    });

    // Copiar texto reescrito
    copyBtn.addEventListener("click", () => {
        const text = resultText.textContent;
        navigator.clipboard.writeText(text).then(() => {
            copyBtn.textContent = "Copiado!";
            setTimeout(() => (copyBtn.textContent = ""), 1500);
        });
    });
});
