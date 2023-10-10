import initMenu from './module/menu.js';
import initScrollSuave from './module/scroll-suave.js';
import initTypeWriter from './module/writer.js';
import Slide from './module/slide.js';
// import createSection from './module/createSection.js'

initMenu();
initScrollSuave();
const slide = new Slide('.slide', '.wrapper');
slide.init()
console.log(slide)

slide.changeSlide(1)
// // Função para adicionar a section ao final do body
// function addSectionToBody(section) {
//     const article = document.getElementById('cursos');

//     console.log(section)
//     article.innerHTML = `${section}`;
// }

const jorge = document.querySelector('[data-anime="titulo"]');

initTypeWriter(jorge);

// const slide = new Slide('.slide', '.wrapper');
// slide.init();
// console.log(slide);

const now = new Date;
const year = document.getElementById("year");
year.innerText = "Jorge Nunes - " + now.getFullYear() ;



// Chame a função createSection e addSectionToBody para adicionar as sections desejadas

// Exemplo 1:
// const content1 = 'PHP do Zero ao Profissional - b7web';
// const section1 = createSection(content1);
// addSectionToBody(section1);

// // Exemplo 2:
// const content2 = 'Outro conteúdo da segunda section';
// const section2 = createSection(content2);
// addSectionToBody(section2);