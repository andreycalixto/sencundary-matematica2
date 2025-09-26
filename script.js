// Sistema de Abas
function showTab(tabName) {
    // Esconde todas as abas
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active de todos os botões
    document.querySelectorAll('.nav-tab').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Mostra a aba selecionada
    document.getElementById(tabName).classList.add('active');
    
    // Ativa o botão correspondente
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Scroll para o topo
    window.scrollTo(0, 0);
}

// Navegação por abas
document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', function(e) {
        e.preventDefault();
        const tabName = this.getAttribute('data-tab');
        showTab(tabName);
    });
});

// Calculadora de Juros Compostos
function calcularJurosCompostos() {
    const valorInicial = parseFloat(document.getElementById('valor-inicial').value) || 0;
    const aporteMensal = parseFloat(document.getElementById('aporte-mensal').value) || 0;
    const taxaJuros = parseFloat(document.getElementById('taxa-juros').value) || 0;
    const tempo = parseInt(document.getElementById('tempo').value) || 0;
    
    const taxaDecimal = taxaJuros / 100;
    let valorFinal = valorInicial;
    let totalInvestido = valorInicial;
    
    for (let i = 0; i < tempo; i++) {
        valorFinal = valorFinal * (1 + taxaDecimal) + aporteMensal;
        totalInvestido += aporteMensal;
    }
    
    const jurosAcumulados = valorFinal - totalInvestido;
    const rentabilidade = ((valorFinal - totalInvestido) / totalInvestido * 100);
    
    // Atualiza resultados
    document.getElementById('valor-investido').textContent = 
        `R$ ${totalInvestido.toFixed(2)}`;
    document.getElementById('juros-acumulados').textContent = 
        `R$ ${jurosAcumulados.toFixed(2)}`;
    document.getElementById('valor-final').textContent = 
        `R$ ${valorFinal.toFixed(2)}`;
    document.getElementById('rentabilidade').textContent = 
        `${rentabilidade.toFixed(2)}%`;
    
    // Atualiza assistente IA
    atualizarAssistenteIA(valorFinal, jurosAcumulados, rentabilidade);
}

function atualizarAssistenteIA(valorFinal, juros, rentabilidade) {
    const mensagem = document.getElementById('ia-message');
    let texto = '';
    
    if (rentabilidade < 1) {
        texto = "💡 Sugestão: Considere aumentar o tempo de investimento ou buscar taxas mais atrativas.";
    } else if (rentabilidade < 5) {
        texto = "📈 Bom resultado! Para melhorar, aumente os aportes mensais gradualmente.";
    } else {
        texto = "🚀 Excelente rentabilidade! Continue com essa estratégia de investimento.";
    }
    
    texto += ` Seu dinheiro renderá R$ ${juros.toFixed(2)} em ${document.getElementById('tempo').value} meses.`;
    
    mensagem.textContent = texto;
}

// Sistema de Calculadoras
document.querySelectorAll('.calc-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const calculadora = this.getAttribute('data-calc');
        
        // Remove active de todos os botões
        document.querySelectorAll('.calc-btn').forEach(b => {
            b.classList.remove('active');
        });
        
        // Esconde todas as calculadoras
        document.querySelectorAll('.calc-content').forEach(calc => {
            calc.classList.remove('active');
        });
        
        // Ativa a calculadora selecionada
        this.classList.add('active');
        document.getElementById(calculadora).classList.add('active');
    });
});

// Sistema de Fórum
document.querySelectorAll('.categoria-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const categoria = this.getAttribute('data-categoria');
        
        document.querySelectorAll('.categoria-btn').forEach(b => {
            b.classList.remove('active');
        });
        
        this.classList.add('active');
        // Aqui carregaria as discussões da categoria via AJAX
    });
});

// Formulário de Discussão
document.getElementById('form-discussao').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Discussão publicada com sucesso!');
    this.reset();
});

// Formulário de Cadastro
document.getElementById('form-cadastro').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const senha = this.querySelector('input[type="password"]').value;
    const confirmarSenha = this.querySelectorAll('input[type="password"]')[1].value;
    
    if (senha !== confirmarSenha) {
        alert('As senhas não coincidem!');
        return;
    }
    
    alert('Conta criada com sucesso! Bem-vindo à nossa comunidade.');
    this.reset();
});

// Menu Mobile
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    calcularJurosCompostos(); // Calcula juros ao carregar
    
    // Atualiza cálculos em tempo real
    document.querySelectorAll('#juros-compostos input').forEach(input => {
        input.addEventListener('input', calcularJurosCompostos);
    });
});

// Função para alternar entre login e cadastro
function showLoginForm() {
    const form = document.querySelector('#login .login-form');
    form.innerHTML = `
        <h2>Login</h2>
        <form id="form-login">
            <div class="form-group">
                <label>CPF</label>
                <input type="text" required>
            </div>
            <div class="form-group">
                <label>Senha</label>
                <input type="password" required>
            </div>
            <button type="submit" class="btn-primary">Entrar</button>
        </form>
        <div class="login-links">
            <a href="#login" onclick="showCadastroForm()">Criar nova conta</a>
        </div>
    `;
    
    document.getElementById('form-login').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Login realizado com sucesso!');
    });
}

function showCadastroForm() {
    const form = document.querySelector('#login .login-form');
    form.innerHTML = `
        <h2>Criar Conta</h2>
        <form id="form-cadastro">
            <div class="form-group">
                <label>Nome Completo</label>
                <input type="text" required>
            </div>
            <div class="form-group">
                <label>Data de Nascimento</label>
                <input type="date" required>
            </div>
            <div class="form-group">
                <label>CPF</label>
                <input type="text" required>
            </div>
            <div class="form-group">
                <label>Senha</label>
                <input type="password" required>
            </div>
            <div class="form-group">
                <label>Confirmar Senha</label>
                <input type="password" required>
            </div>
            <button type="submit" class="btn-primary">Criar Conta</button>
        </form>
        <div class="login-links">
            <a href="#login" onclick="showLoginForm()">Já tenho uma conta</a>
        </div>
    `;
    
    document.getElementById('form-cadastro').addEventListener('submit', function(e) {
        e.preventDefault();
        const senha = this.querySelector('input[type="password"]').value;
        const confirmarSenha = this.querySelectorAll('input[type="password"]')[1].value;
        
        if (senha !== confirmarSenha) {
            alert('As senhas não coincidem!');
            return;
        }
        
        alert('Conta criada com sucesso!');
        this.reset();
    });
}