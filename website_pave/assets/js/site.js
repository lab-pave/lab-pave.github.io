/* Lightweight, data-driven SPA for PAVe lab (PT default, EN second language) */
(function(){
  const defaultLang = 'pt'
  let lang = defaultLang
  let data = null

  function setLang(l){
    lang = l === 'en' ? 'en' : 'pt'
    // Persist preference
    try { localStorage.setItem('pave-lang', lang) } catch(e) {}
    renderAll()
  }

  function t(section){
    if(!data) return ''
    return data[lang][section] || ''
  }

  function renderHome(){
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
    // PI card
    const pi = `<div class="person-card pi"><h3>${p.PI.name}</h3><p class="role">${p.PI.role}</p><p class="bio">${p.PI[lang==='pt'?'bioPt':'bioEn'] || p.PI.bioPt || p.PI.bioEn || ''}</p></div>`
    // Postdocs
    const posts = (p.postdocs || []).map(pp => `<div class="person-card"><h3>${pp.name}</h3><p class="role">${pp.role}</p><p class="bio">${pp[lang==='pt'?'bioPt':'bioEn'] || ''}</p></div>`).join('')
    // PhD students
    const phds = (p.phd || []).map(pp => `<div class="person-card"><h3>${pp.name}</h3><p class="role">${pp.role}</p><p class="bio">${pp[lang==='pt'?'bioPt':'bioEn'] || ''}</p></div>`).join('')
    // IC placeholder
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
    renderHome()
    renderAbout()
    renderResearch()
    renderPeople()
    renderPublications()
    renderContact()
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
    // determine language from URL or localStorage
    const urlParams = new URLSearchParams(window.location.search)
    const langParam = urlParams.get('lang')
    if(langParam === 'pt' || langParam === 'en') setLang(langParam)
    else {
      try{
        const cached = localStorage.getItem('pave-lang')
        if(cached === 'pt' || cached === 'en') setLang(cached)
        else setLang('pt')
      } catch(e) { setLang('pt') }
    }

    // fetch data
    data = await (await fetch('data/site.json')).json()
    renderAll()
    initMenuToggle()
  }

  // language switch handlers
  function bindLangSwitch(){
    const ptBtn = document.querySelector('[data-lang="pt"]')
    const enBtn = document.querySelector('[data-lang="en"]')
    if(ptBtn) ptBtn.addEventListener('click', () => setLang('pt'))
    if(enBtn) enBtn.addEventListener('click', () => setLang('en'))
  }

  // initialize when DOM ready
  document.addEventListener('DOMContentLoaded', init)
  document.addEventListener('DOMContentLoaded', bindLangSwitch)
})();
