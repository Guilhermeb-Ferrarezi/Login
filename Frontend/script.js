const formcriar = document.getElementById("formCriar")

formcriar.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome_exibicao = document.getElementById('nome_exibicao').value;
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;

    const resposta = await fetch("https://central-de-links.vercel.app/criar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome_exibicao, usuario, senha })
    });
    try {
        const data = await resposta.json();
        console.log(data);
    } catch (err) {
        console.error("Não veio JSON válido", err);
}


});


