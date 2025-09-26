// Menu Mobile
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Modal Functions
const modal = document.getElementById('modal-calculadora');
const closeBtn = document.querySelector('.close');

function openCalculator(type) {
    const content = document.getElementById('calculadora-content');
    
    switch(type) {
        case 'pro-labore':
            content.innerHTML = `
                <h3>Calculadora de Pró-Labore</h3>
                <form id="pro-labore-form">
                    <div class="form-group">
                        <label>Faturamento Mensal (R$):</label>
                        <input type="number" id="faturamento" required>
                    </div>
                    <div class="form-group">
                        <label>Despesas Mensais (R$):</label>
                        <input type="number" id="despesas" required>
                    </div>
                    <button type="submit" class="btn-primary">Calcular</button>
                </form>
                <div id="resultado-pro-labore" class="resultado"></div>
            `;
            break;
            
        case 'simulador-tributario':
            content.innerHTML = `
                <h3>Simulador Tributário</h3>
                <form id="simulador-form">
                    <div class="form-group">
                        <label>Faturamento Anual (R$):</label>
                        <input type="number" id="faturamento-anual" required>
                    </div>
                    <div class="form-group">
                        <label>Setor:</label>
                        <select id="setor">
                            <option value="servicos">Serviços</option>
                            <option value="comercio">Comércio</option>
                            <option value="industria">Indústria</option>
                        </select>
                    </div>
                    <button type="submit" class="btn-primary">Simular</button>
                </form>
                <div id="resultado-simulador" class="resultado"></div>
            `;
            break;
            
        case 'irpf':
            content.innerHTML = `
                <h3>Calculadora de IRPF</h3>
                <form id="irpf-form">
                    <div class="form-group">
                        <label>Renda Anual (R$):</label>
                        <input type="number" id="renda-anual" required>
                    </div>
                    <div class="form-group">
                        <label>Dependentes:</label>
                        <input type="number" id="dependentes" value="0">
                    </div>
                    <button type="submit" class="btn-primary">Calcular</button>
                </form>
                <div id="resultado-irpf" class="resultado"></div>
            `;
            break;
    }
    
    modal.style.display = 'block';
    setupCalculatorEvents();
}

function setupCalculatorEvents() {
    // Pró-labore
    const proLaboreForm = document.getElementById('pro-labore-form');
    if (proLaboreForm) {
        proLaboreForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calcularProLabore();
        });
    }
    
    // Simulador Tributário
    const simuladorForm = document.getElementById('simulador-form');
    if (simuladorForm) {
        simuladorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            simularTributacao();
        });
    }
    
    // IRPF
    const irpfForm = document.getElementById('irpf-form');
    if (irpfForm) {
        irpfForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calcularIRPF();
        });
    }
}

// Cálculos
function calcularProLabore() {
    const faturamento = parseFloat(document.getElementById('faturamento').value);
    const despesas = parseFloat(document.getElementById('despesas').value);
    const lucro = faturamento - despesas;
    const proLaboreIdeal = lucro * 0.3; // 30% do lucro como exemplo
    
    document.getElementById('resultado-pro-labore').innerHTML = `
        <div class="result-card">
            <h4>Pró-Labore Recomendado:</h4>
            <p class="result-value">R$ ${proLaboreIdeal.toFixed(2)}</p>
            <small>Baseado em 30% do lucro líquido</small>
        </div>
    `;
}

function simularTributacao() {
    const faturamento = parseFloat(document.getElementById('faturamento-anual').value);
    let melhorRegime = '';
    let economia = 0;
    
    if (faturamento <= 810000) {
        melhorRegime = 'Simples Nacional';
        economia = faturamento * 0.15;
    } else if (faturamento <= 4800000) {
        melhorRegime = 'Lucro Presumido';
        economia = faturamento * 0.12;
    } else {
        melhorRegime = 'Lucro Real';
        economia = faturamento * 0.08;
    }
    
    document.getElementById('resultado-simulador').innerHTML = `
        <div class="result-card">
            <h4>Regime Recomendado:</h4>
            <p class="result-value">${melhorRegime}</p>
            <p>Economia estimada: R$ ${economia.toFixed(2)}/ano</p>
        </div>
    `;
}

function calcularIRPF() {
    const renda = parseFloat(document.getElementById('renda-anual').value);
    const dependentes = parseInt(document.getElementById('dependentes').value);
    const deducaoDependente = 2294.24 * dependentes;
    const baseCalculo = Math.max(0, renda - deducaoDependente);
    
    let imposto = 0;
    if (baseCalculo > 4664.68 * 12) {
        imposto = baseCalculo * 0.275 - 869.36 * 12;
    } else if (baseCalculo > 3751.05 * 12) {
        imposto = baseCalculo * 0.225 - 636.13 * 12;
    } else if (baseCalculo > 2826.65 * 12) {
        imposto = baseCalculo * 0.15 - 354.80 * 12;
    } else if (baseCalculo > 2259.20 * 12) {
        imposto = baseCalculo * 0.075 - 169.44 * 12;
    }
    
    document.getElementById('resultado-irpf').innerHTML = `
        <div class="result-card">
            <h4>Imposto Devido:</h4>
            <p class="result-value">R$ ${imposto.toFixed(2)}</p>
            <small>Base de cálculo: R$ ${baseCalculo.toFixed(2)}</small>
        </div>
    `;
}

// Download de Materiais
function downloadMaterial(tipo) {
    const materiais = {
        'checklist': 'checklist-fechamento-mensal.pdf',
        'planilha': 'planilha-fluxo-caixa.xlsx',
        'guia-mei': 'guia-mei-2024.pdf'
    };
    
    alert(`Iniciando download do: ${materiais[tipo]}\n(Simulação - em produção seria um arquivo real)`);
    
    // Em produção, aqui viria o código para download real
    // window.location.href = `/downloads/${materiais[tipo]}`;
}

// Fechar Modal
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});