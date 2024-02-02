// Função para enviar o pedido para o PHP
function enviarPedidoParaPHP() {
    // Obter os itens selecionados
    var itensSelecionados = [];
    var checkboxes = document.querySelectorAll('.check:checked');
    checkboxes.forEach(function(checkbox) {
        var item = {
            nome: checkbox.parentElement.querySelector('h3').textContent,
            quantidade: parseInt(checkbox.parentElement.nextElementSibling.querySelector('span').textContent),
            preco: parseFloat(checkbox.parentElement.nextElementSibling.nextElementSibling.querySelector('.price').textContent.replace('$', ''))
        };
        itensSelecionados.push(item);
    });

    // Criar um objeto com os dados a serem enviados para o PHP
    var dados = {
        itens: itensSelecionados
    };

    // Enviar os dados para o PHP via AJAX
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Exibir a resposta do servidor
            console.log(this.responseText);
        }
    };
    xhttp.open("POST", "seu_script_php.php", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(dados));
}

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
    } else {
        // Exibir alerta se o contador já estiver em zero
        alert('O valor mínimo é 0');
    }

    // Chamar a função para atualizar o resumo do pedido
    atualizarResumoPedido();
}

// Função para atualizar o resumo do pedido
function atualizarResumoPedido() {
    // Obter todos os elementos de seleção de checkbox
    var checkboxes = document.querySelectorAll('.check');

    // Calcular o total do pedido
    var total = 0;
    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            // Obter o elemento de contagem associado a este item
            var counter = checkbox.parentElement.nextElementSibling.querySelector('span');
            // Obter o valor do item e a quantidade selecionada
            var value = parseFloat(checkbox.value);
            var quantity = parseInt(counter.textContent);
            // Adicionar ao total
            total += value * quantity;
        }
    });

    // Atualizar o elemento de resumo com o total do pedido
    document.getElementById('total').textContent = 'Total: $' + total.toFixed(2);
}


// Função para limpar os campos
function ClearOrder() {
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
document.getElementById('limpar').addEventListener('click', ClearOrder);

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


// script para o botao top

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("myBtn").style.display = "block";
  } else {
    document.getElementById("myBtn").style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// Adicione esta função para aplicar a animação ao clicar no botão "Enviar Pedido"
function enviarPedidoParaPHP() {
    // Sua lógica para enviar o pedido

    // Aplicar a animação
    var sendButton = document.querySelector('.Send');
    sendButton.style.animation = 'sendAnimation 0.5s ease-in-out';
    setTimeout(function() {
        sendButton.style.animation = 'none';
    }, 500);
}


// Script para ordenar os itens
document.getElementById('sort').addEventListener('change', function() {
    var selectBox = document.getElementById('sort');
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    sortItems(selectedValue);
});

function sortItems(criteria) {
    var section = document.querySelector('.ThEras');
    var items = section.querySelectorAll('.iten-of-smosh');

    // Converter a NodeList para um array
    var itemsArray = Array.prototype.slice.call(items);

    // Ordenar os itens com base no critério selecionado
    if (criteria === 'price') {
        itemsArray.sort(function(a, b) {
            var priceA = parseFloat(a.querySelector('.price').textContent.replace('$', ''));
            var priceB = parseFloat(b.querySelector('.price').textContent.replace('$', ''));
            return priceA - priceB;
        });
    } else if (criteria === 'name') {
        itemsArray.sort(function(a, b) {
            var nameA = a.querySelector('h3').textContent.toUpperCase();
            var nameB = b.querySelector('h3').textContent.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
    }

    // Limpar a seção e reordenar os itens
    section.innerHTML = '';
    itemsArray.forEach(function(item) {
        section.appendChild(item);
    });
}

$('a[href^="#"]').on('click', function(event) {
    var target = $(this.getAttribute('href'));
    if( target.length ) {
        event.preventDefault();
        $('html, body').stop().animate({
            scrollTop: target.offset().top
        }, 1000);
    }
});

