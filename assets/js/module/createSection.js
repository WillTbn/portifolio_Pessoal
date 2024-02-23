// Função para criar uma nova section com o conteúdo fornecido
export default function createSection(content) {

    // const article = document.getElementById('cursos');
    const section = document.createElement('section');
    section.className = 'text-uppercase';

    const div = document.createElement('div');
    div.className = 'd-flex align-item-end bg-quemsou';

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '2.5em');
    svg.setAttribute('height', '2.5em');
    svg.setAttribute('viewBox', '0 0 16 16');
    svg.classList.add('bi', 'bi-trophy', 'mb-2');
    svg.setAttribute('fill', '#CFDBFF');

    // Adicione aqui o conteúdo do seu <svg> (por exemplo, as paths)
    svg.innerHTML = `
    <path d="M3 1h10c-.495 3.467-.5 10-5 10S3.495 4.467 3 1zm0 15a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1H3zm2-1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1H5z"/>
                <path fill-rule="evenodd" d="M12.5 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-3 2a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm-6-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-3 2a3 3 0 1 1 6 0 3 3 0 0 1-6 0z"/>
                <path d="M7 10h2v4H7v-4z"/>
        <path d="M10 11c0 .552-.895 1-2 1s-2-.448-2-1 .895-1 2-1 2 .448 2 1z"/>
    `;

    const strong = document.createElement('strong');
    strong.className = 'ml-4 align-self-end';
    strong.textContent = content;

    div.appendChild(svg);
    div.appendChild(strong);

    section.appendChild(div);

    // article.innerHTML = section;


    return section;
}