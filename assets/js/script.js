import initMenu from './module/menu.js';
import initScrollSuave from './module/scroll-suave.js';
import initTypeWriter from './module/writer.js';

initMenu();
initScrollSuave();

const jorge = document.querySelector('[data-anime="titulo"]');

initTypeWriter(jorge);