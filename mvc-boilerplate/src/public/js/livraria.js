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

async function editarLivro(id) {
    try {
        const livro = await fetch(`/api/livros/${id}`).then(res => res.json());
        
        const modalHtml = `
            <div class="modal">
                <div class="modal-content">
                    <h3>Editar Livro</h3>
                    <form id="editForm">
                        <div class="form-group">
                            <label>Título:</label>
                            <input type="text" name="titulo" value="${livro.titulo}" required>
                        </div>
                        <div class="form-group">
                            <label>Ano:</label>
                            <input type="number" name="ano_publicacao" value="${livro.ano_publicacao}">
                        </div>
                        <div class="form-group">
                            <label>Preço:</label>
                            <input type="number" step="0.01" name="preco" value="${livro.preco}">
                        </div>
                        <div class="form-group">
                            <label>Autor:</label>
                            <select name="id_autor" id="autorSelect">
                                <option value="">Selecione</option>
                            </select>
                        </div>
                        <div class="form-actions">
                            <button type="submit" class="btn-submit">Salvar</button>
                            <button type="button" onclick="fecharModal()" class="btn-cancel">Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>`;

        document.body.insertAdjacentHTML('beforeend', modalHtml);
        
        // Carregar autores no select
        const autores = await fetch('/api/autores').then(res => res.json());
        const select = document.getElementById('autorSelect');
        autores.forEach(autor => {
            const option = new Option(autor.nome, autor.id, false, autor.id === livro.id_autor);
            select.add(option);
        });

        // Configurar submit do formulário
        document.getElementById('editForm').onsubmit = async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            
            try {
                const response = await fetch(`/api/livros/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(Object.fromEntries(formData))
                });

                if (response.ok) {
                    showFeedback('Livro atualizado com sucesso', 'success');
                    fecharModal();
                    carregarDados();
                } else {
                    throw new Error('Erro ao atualizar');
                }
            } catch (error) {
                showFeedback('Erro ao atualizar livro', 'error');
            }
        };
    } catch (error) {
        showFeedback('Erro ao carregar dados do livro', 'error');
    }
}

function fecharModal() {
    const modal = document.querySelector('.modal');
    if (modal) modal.remove();
}

async function deletarLivro(id) {
    if (!confirm('Tem certeza que deseja excluir este livro?')) return;
    
    try {
        const response = await fetch(`/api/livros/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            showFeedback('Livro excluído com sucesso', 'success');
            carregarDados();
        } else {
            throw new Error('Erro ao excluir');
        }
    } catch (error) {
        showFeedback('Erro ao excluir livro', 'error');
    }
}

async function getAutoresOptions(selectedId) {
    const autores = await fetch('/api/autores').then(res => res.json());
    return autores.map(autor => 
        `<option value="${autor.id}" ${autor.id === selectedId ? 'selected' : ''}>
            ${autor.nome}
        </option>`
    ).join('');
}

// Carregar dados ao iniciar a página
document.addEventListener('DOMContentLoaded', () => {
    carregarDados();
});
