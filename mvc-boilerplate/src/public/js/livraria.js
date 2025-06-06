// Funções para interagir com a API
async function cadastrarAutor(event) {
    event.preventDefault();
    const form = event.target;
    const data = {
        nome: form.nome.value,
        nacionalidade: form.nacionalidade.value
    };

    try {
        const response = await fetch('/api/autores', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            window.location.href = '/livraria';
        }
    } catch (error) {
        console.error('Erro ao cadastrar autor:', error);
    }
}

async function cadastrarLivro(event) {
    event.preventDefault();
    const form = event.target;
    const data = {
        titulo: form.titulo.value,
        ano_publicacao: form.ano_publicacao.value,
        preco: form.preco.value,
        id_autor: form.id_autor.value
    };

    try {
        const response = await fetch('/api/livros', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            window.location.href = '/livraria';
        }
    } catch (error) {
        console.error('Erro ao cadastrar livro:', error);
    }
}

async function deleteLivro(id) {
    if (!confirm('Deseja realmente excluir este livro?')) return;
    
    try {
        const response = await fetch(`/api/livros/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            await carregarDados();
            showFeedback('Livro excluído com sucesso', 'success');
        }
    } catch (error) {
        showFeedback('Erro ao excluir livro', 'error');
    }
}

function showFeedback(message, type) {
    const div = document.createElement('div');
    div.className = `alert alert-${type}`;
    div.textContent = message;
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 3000);
}

// Carregar dados via API
async function carregarDados() {
    try {
        const [autoresRes, livrosRes] = await Promise.all([
            fetch('/api/autores'),
            fetch('/api/livros')
        ]);
        
        const autores = await autoresRes.json();
        const livros = await livrosRes.json();
        
        atualizarTabelas(autores, livros);
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
    }
}

// Atualizar tabelas com os dados
function atualizarTabelas(autores, livros) {
    // Atualizar tabela de autores
    const autoresBody = document.querySelector('#autores-table tbody');
    autoresBody.innerHTML = autores.map(autor => `
        <tr>
            <td>${autor.id}</td>
            <td>${autor.nome}</td>
            <td>${autor.nacionalidade || '-'}</td>
        </tr>
    `).join('');

    // Atualizar tabela de livros
    const livrosBody = document.querySelector('#livros-table tbody');
    livrosBody.innerHTML = livros.map(livro => `
        <tr>
            <td>${livro.id}</td>
            <td>${livro.titulo}</td>
            <td>${livro.ano_publicacao || '-'}</td>
            <td>R$ ${livro.preco || '0.00'}</td>
            <td>${livro.autor_nome || '-'}</td>
        </tr>
    `).join('');
}

// Carregar dados ao iniciar a página
document.addEventListener('DOMContentLoaded', () => {
    carregarDados();
});
