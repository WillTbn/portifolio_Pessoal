// import initMenu from './module/menu.js';
import initScrollSuave from './module/scroll-suave.js';
import initTypeWriter from './module/writer.js';
import { SlideNav} from './module/slide.js';
// import createSection from './module/createSection.js'

// initMenu();
initScrollSuave();
const slide = new SlideNav('.slide', '.wrapper');
slide.init()

slide.activePrevSlide()
slide.addArrow('.prev', '.next')

const jorge = document.querySelector('[data-anime="titulo"]');

initTypeWriter(jorge);

const now = new Date;
const year = document.getElementById("year");
year.innerText = "Jorge Nunes - " + now.getFullYear() ;
