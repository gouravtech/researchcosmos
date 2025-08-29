// Theme toggle (sets a data attribute you can style on if desired)
document.getElementById('themeToggle')?.addEventListener('click', () => {
  document.documentElement.toggleAttribute('data-dark');
});

// Dynamic year
document.getElementById('year').textContent = new Date().getFullYear();

// Paper filtering
const paperSearch = document.getElementById('paperSearch');
const paperYear = document.getElementById('paperYear');
const paperType = document.getElementById('paperType');
const paperList = document.getElementById('paperList');

function filterPapers(){
  const q = (paperSearch.value || '').toLowerCase();
  const y = paperYear.value;
  const t = paperType.value;
  [...paperList.children].forEach(li => {
    const text = li.innerText.toLowerCase();
    const yearOk = !y || li.dataset.year === y;
    const typeOk = !t || li.dataset.type === t;
    const qOk = !q || text.includes(q);
    li.style.display = (yearOk && typeOk && qOk) ? '' : 'none';
  });
}
[paperSearch, paperYear, paperType].forEach(el => el?.addEventListener('input', filterPapers));

// Project filtering
const projectSearch = document.getElementById('projectSearch');
const projectTag = document.getElementById('projectTag');
const projectGrid = document.getElementById('projectGrid');

function filterProjects(){
  const q = (projectSearch.value || '').toLowerCase();
  const tag = projectTag.value.toLowerCase();
  [...projectGrid.children].forEach(card => {
    const text = card.innerText.toLowerCase();
    const tags = (card.dataset.tags || '').toLowerCase();
    const qOk = !q || text.includes(q);
    const tagOk = !tag || tags.includes(tag);
    card.style.display = (qOk && tagOk) ? '' : 'none';
  });
}
[projectSearch, projectTag].forEach(el => el?.addEventListener('input', filterProjects));

// Smooth anchor scroll with offset for sticky header
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if(!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top, behavior: 'smooth' });
    history.pushState(null, '', '#' + id);
  });
});
