import initMenu from './module/menu.js';
import initScrollSuave from './module/scroll-suave.js';
import initTypeWriter from './module/writer.js';
import Slide from './module/debounce.js';

initMenu();
initScrollSuave();

const jorge = document.querySelector('[data-anime="titulo"]');

initTypeWriter(jorge);

const slide = new Slide('.slide', '.wrapper');
slide.init();
console.log(slide);