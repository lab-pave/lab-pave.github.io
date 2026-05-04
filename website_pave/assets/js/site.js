/* Path-based bilingual SPA for PAVe lab (pt/en) */
(function(){
  let lang = 'pt'
  let basePath = '/pt'
  let data = null

  function determinePaths(){
    const p = window.location.pathname
    if (p.startsWith('/en/')) { lang = 'en'; basePath = '/en' }
    else if (p.startsWith('/pt/')) { lang = 'pt'; basePath = '/pt' }
    else { lang = 'pt'; basePath = '/pt' }
  }

  function showSectionFromHash(){
    const hash = (window.location.hash || '#home').replace('#','')
    document.querySelectorAll('.page-section').forEach(sec => sec.classList.add('hidden'))
    const target = document.getElementById(hash)
    if (target) target.classList.remove('hidden')
  }

  function renderHome(){
    if(!data) return
    const home = data[lang].home
    const html = `
      <section class="hero">
        <h1>${home.title} <span class="tagline">– ${home.subtitle}</span></h1>
        <p>${home.intro || ''}</p>
      </section>
      <section class="quick-links">
        <a href="#about" class="btn">${lang==='pt'?'Conheça o laboratório':'Learn about the lab'}</a>
        <a href="#people" class="btn secondary">${lang==='pt'?'Equipe':'People'}</a>
      </section>
    `
    document.getElementById('home').innerHTML = html
  }

  function renderAbout(){
    const a = data[lang].about
    document.getElementById('about').innerHTML = `<h2>${a.title}</h2><p>${a.body}</p>`
  }

  function renderResearch(){
    const r = data[lang].research
    let items = ''
    r.lines.forEach(l => {
      items += `<div class="research-item"><h3>${l.title}</h3><p>${l.description}</p></div>`
    })
    document.getElementById('research').innerHTML = `<h2>${r.title}</h2>${items}`
  }

  function renderPeople(){
    const p = data[lang].people
    const pi = `<div class="person-card pi"><h3>${p.PI.name}</h3><p class="role">${p.PI.role}</p><p class="bio">${p.PI[lang==='pt'?'bioPt':'bioEn'] || p.PI.bioPt || p.PI.bioEn || ''}</p></div>`
    const posts = (p.postdocs || []).map(pp => `<div class="person-card"><h3>${pp.name}</h3><p class="role">${pp.role}</p><p class="bio">${pp[lang==='pt'?'bioPt':'bioEn'] || ''}</p></div>`).join('')
    const phds = (p.phd || []).map(pp => `<div class="person-card"><h3>${pp.name}</h3><p class="role">${pp.role}</p><p class="bio">${pp[lang==='pt'?'bioPt':'bioEn'] || ''}</p></div>`).join('')
    const icTitle = (p.ic && (lang==='pt' ? p.ic.titlePt : p.ic.titleEn)) || ''
    const icPlaceholder = `<div class="ic-placeholder">${lang==='pt' ? 'Espaço para Iniciação Científica (IC) será adicionado' : 'Space reserved for Undergraduate Research (IC) later'}</div>`
    document.getElementById('people').innerHTML = `
      <h2>${p.title}</h2>
      <div class="people-grid">
        ${pi}
        ${posts}
        ${phds}
      </div>
      <div class="ic-section">
        <h3>${icTitle}</h3>
        ${icPlaceholder}
      </div>
    `
  }

  function renderPublications(){
    const pubs = data[lang].publications
    const title = (lang === 'pt') ? pubs.titlePt : pubs.titleEn
    document.getElementById('publications').innerHTML = `<h2>${title}</h2><p>Conteúdo ainda não publicado. Aguarde as publicações.</p>`
  }

  function renderContact(){
    const c = data[lang].contact
    const html = `
      <h2>${c.title}</h2>
      <p>Email: ${c.email || 'info@example.com'}</p>
      <p>Endereço: ${c.addressPt || c.addressEn || 'Cidade, País'}</p>
    `
    document.getElementById('contact').innerHTML = html
  }

  function renderAll(){
    renderHome(); renderAbout(); renderResearch(); renderPeople(); renderPublications(); renderContact()
  }

  function initMenuToggle(){
    const btn = document.getElementById('mobileMenuBtn')
    const menu = document.getElementById('menu')
    if(btn && menu){
      btn.addEventListener('click', () => {
        menu.style.display = (menu.style.display === 'block') ? 'none' : 'block'
      })
    }
  }

  async function init(){
    determinePaths()
    data = await (await fetch(basePath + '/data/site.json')).json()
    renderAll()
    initMenuToggle()
    showSectionFromHash()
  }

  function bindLangSwitch(){ }

  // bootstrap
  document.addEventListener('DOMContentLoaded', init)
  window.addEventListener('hashchange', showSectionFromHash)
})();
