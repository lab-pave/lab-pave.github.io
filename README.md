# PAVe — Website Institucional

Site institucional do **Laboratório PAVe** (Pesquisas Avançadas em Vesículas Extracelulares), vinculado ao IBCCF/UFRJ.

Bilíngue 🇧🇷 PT / 🇺🇸 EN — troca de idioma com um clique, sem recarregar a página.

---

## 📁 Estrutura do Repositório

```
pave-website/
├── index.html
├── README.md
└── assets/
    ├── logo-pave.png         ← logo oficial do PAVe
    └── team/
        ├── juliana.jpg
        ├── roberto.jpg
        ├── adele.jpg
        ├── bruna.jpg
        ├── vanessa.jpg
        ├── raquel.jpg
        ├── barbara.jpg
        ├── mariabeatriz.jpg
        └── mariana.jpg
```

> As fotos devem ser salvas com exatamente esses nomes de arquivo.  
> Se uma foto estiver faltando, o avatar mostra as iniciais automaticamente.

---

## 🚀 Como rodar localmente

Basta abrir o `index.html` no navegador — não precisa de servidor.

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/pave-website.git
cd pave-website

# Abra no navegador (macOS)
open index.html

# Abra no navegador (Linux)
xdg-open index.html

# Abra no navegador (Windows)
start index.html
```

---

## 🌐 Deploy — GitHub Pages (gratuito)

1. Suba o repositório para o GitHub
2. Vá em **Settings → Pages**
3. Em *Source*, selecione **Deploy from a branch**
4. Escolha a branch `main` e pasta `/ (root)`
5. Clique em **Save**

O site ficará disponível em:  
`https://seu-usuario.github.io/pave-website`

---

## 🌐 Deploy — Netlify (alternativa, ainda mais fácil)

1. Acesse [netlify.com](https://netlify.com) e faça login
2. Clique em **Add new site → Deploy manually**
3. Arraste a pasta `pave-website/` para a área indicada
4. Pronto — o site já está no ar com HTTPS

---

## ✏️ Como atualizar o conteúdo

Todo o conteúdo está no `index.html`. Cada elemento bilíngue usa os atributos `data-pt` e `data-en`:

```html
<p data-pt="Texto em português" data-en="English text">
  Texto em português
</p>
```

Para **adicionar um novo membro da equipe**, copie o bloco abaixo e cole na seção correspondente:

```html
<div class="member">
  <div class="member-avatar">
    <img src="assets/team/nome.jpg" alt="Nome Completo"
         onerror="this.parentElement.innerHTML='NC'"/>
  </div>
  <h4>Nome Completo</h4>
  <div class="role" data-pt="Cargo PT" data-en="Role EN">Cargo PT</div>
  <div class="bio" data-pt="Bio em português." data-en="Bio in English.">
    Bio em português.
  </div>
</div>
```

Para **atualizar publicações**, edite os `<div class="pub-item">` na seção `#publicacoes`.

---

## 🔗 Links a atualizar

No `index.html`, substitua os `href="#"` pelos links reais:

| Elemento | Link |
|---|---|
| Site Institucional IBCCF/UFRJ | `https://www.ibccf.ufrj.br` |
| Lattes — CNPq | URL do currículo Lattes da Dra. Juliana |
| ResearchGate | URL do perfil ResearchGate |
| PubMed | URL de busca no PubMed |
| Instagram | URL do perfil Instagram do lab |

---

## 🛠 Tecnologias

- HTML5 + CSS3 puro (sem frameworks)
- JavaScript vanilla (apenas para troca de idioma)
- Zero dependências externas
- Compatível com todos os navegadores modernos
