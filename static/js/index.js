// index.js

// Função para incrementar o contador
function incrementarContador(button) {
    // Encontrar o elemento irmão que contém o valor do contador
    var spanElement = button.parentElement.querySelector('span');

    // Obter o valor atual do contador
    var currentCount = parseInt(spanElement.textContent);

    // Incrementar o valor do contador
    var newCount = currentCount + 1;

    // Atualizar o valor do contador na página
    spanElement.textContent = newCount;

    // Chamar a função para atualizar o resumo do pedido
    atualizarResumoPedido();
}

// Função para decrementar o contador
function decrementarContador(button) {
    // Encontrar o elemento irmão que contém o valor do contador
    var spanElement = button.parentElement.querySelector('span');

    // Obter o valor atual do contador
    var currentCount = parseInt(spanElement.textContent);

    // Garantir que o contador não seja negativo
    if (currentCount > 0) {
        // Decrementar o valor do contador
        var newCount = currentCount - 1;

        // Atualizar o valor do contador na página
        spanElement.textContent = newCount;

        // Chamar a função para atualizar o resumo do pedido
        atualizarResumoPedido();
    } else {
        // Exibir alerta se o contador já estiver em zero
        alert('O valor mínimo é 0');
    }
}

// Função para atualizar o resumo do pedido
function atualizarResumoPedido() {
    // Obter todos os elementos de seleção de checkbox
    var checkboxes = document.querySelectorAll('.check');

    // Calcular o total do pedido
    var total = 0;
    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            // Adicionar o valor do item ao total
            total += parseFloat(checkbox.value);
        }
    });

    // Atualizar o elemento de resumo com o total do pedido
    document.getElementById('total').textContent = 'Total: $' + total.toFixed(2);
}

// Função para limpar os campos
function limparCampos() {
    // Resetar valores do contador para zero
    var spans = document.querySelectorAll('.contador span');
    spans.forEach(function (span) {
        span.textContent = '0';
    });

    // Desmarcar todos os checkboxes
    var checkboxes = document.querySelectorAll('.check');
    checkboxes.forEach(function (checkbox) {
        checkbox.checked = false;
    });

    // Atualizar o resumo do pedido
    atualizarResumoPedido();
}

// Adicionar a função de limpar campos ao botão "Limpar Campos"
document.getElementById('limpar').addEventListener('click', limparCampos);

// Adicionar a função de enviar pedido ao botão "Enviar Pedido"
document.querySelector('.Send').addEventListener('click', function () {
    // Verificar se algum item foi selecionado antes de enviar o pedido
    var checkboxes = document.querySelectorAll('.check:checked');
    if (checkboxes.length === 0) {
        alert('Selecione pelo menos um item antes de enviar o pedido.');
    } else {
        // Se algum item foi selecionado, enviar o pedido
        enviarPedidoParaPHP();
    }
});
