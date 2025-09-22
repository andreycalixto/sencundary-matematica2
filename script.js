// script.js

// Menu mobile
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Alternar navegação
    nav.classList.toggle('active');
    
    // Animar links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Animar burger
    burger.classList.toggle('toggle');
});

// Fechar menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        burger.classList.remove('toggle');
        navLinks.forEach(link => {
            link.style.animation = '';
        });
    });
});

// Sistema de opiniões no fórum
document.addEventListener('DOMContentLoaded', function() {
    const opiniaoForm = document.getElementById('opiniao-form');
    const opinioesContainer = document.getElementById('opinioes-container');
    
    // Carregar opiniões do localStorage
    let opinioes = JSON.parse(localStorage.getItem('opinioes')) || [];
    
    // Função para exibir opiniões
    function exibirOpinioes() {
        opinioesContainer.innerHTML = '';
        
        if (opinioes.length === 0) {
            opinioesContainer.innerHTML = '<p>Nenhuma opinião publicada ainda. Seja o primeiro a compartilhar!</p>';
            return;
        }
        
        // Ordenar por data (mais recente primeiro)
        opinioes.sort((a, b) => new Date(b.data) - new Date(a.data));
        
        // Exibir apenas as 5 mais recentes
        const opinioesRecentes = opinioes.slice(0, 5);
        
        opinioesRecentes.forEach(opiniao => {
            const opiniaoElement = document.createElement('div');
            opiniaoElement.classList.add('opiniao-item');
            
            const dataFormatada = new Date(opiniao.data).toLocaleDateString('pt-BR');
            
            opiniaoElement.innerHTML = `
                <h4>${opiniao.titulo}</h4>
                <p>${opiniao.conteudo}</p>
                <small>Publicado em: ${dataFormatada}</small>
            `;
            
            opinioesContainer.appendChild(opiniaoElement);
        });
    }
    
    // Exibir opiniões ao carregar a página
    exibirOpinioes();
    
    // Adicionar nova opinião
    opiniaoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const titulo = document.getElementById('titulo').value;
        const conteudo = document.getElementById('conteudo').value;
        
        if (titulo.trim() === '' || conteudo.trim() === '') {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        
        const novaOpiniao = {
            titulo: titulo,
            conteudo: conteudo,
            data: new Date().toISOString()
        };
        
        opinioes.unshift(novaOpiniao); // Adicionar no início do array
        
        // Salvar no localStorage
        localStorage.setItem('opinioes', JSON.stringify(opinioes));
        
        // Atualizar exibição
        exibirOpinioes();
        
        // Limpar formulário
        opiniaoForm.reset();
        
        alert('Opinião publicada com sucesso!');
    });
    
    // Rolagem suave para as seções
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});