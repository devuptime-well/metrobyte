function alertaErros(mensagem) {
    document.querySelector('.alerta__erros').innerHTML = `
            <div>
                <span>${mensagem}</span>
            </div>
        `;
        setTimeout(function () {
            document.querySelector('.alerta__erros').innerHTML = '';
        }, 4000);
}

function sendEmail(id) {
    let form = View(id).form();
    View('#btn__form').val('Enviando...');
    let url = window.location.href;
    let api = Api('Config.php', url).post(form, x => {
        alertaErros('E-mail enviado com sucesso!');
        View('#btn__form').val('Fazer outro orçamento');
    });
}