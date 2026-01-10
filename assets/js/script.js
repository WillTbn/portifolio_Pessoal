import initMenu from './module/menu.js';
import initScrollSuave from './module/scroll-suave.js';
import initTypeWriter from './module/writer.js';
import { SlideNav} from './module/slide.js';
import shareAction from "./module/shareAction.js";
// import initGitInfo from './module/gitInfo.js';
// import createSection from './module/createSection.js'

initMenu();
shareAction();
initScrollSuave();
// initGitInfo();
const slide = new SlideNav('.slide', '.wrapper');
slide.init()

slide.activePrevSlide()
slide.addArrow('.prev', '.next')

const jorge = document.querySelector('[data-anime="titulo"]');

initTypeWriter(jorge);

const now = new Date;
const year = document.getElementById("year");
year.innerText = "Jorge Nunes - " + now.getFullYear() ;

// Tooltips Bootstrap (acionados por clique)
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
tooltipTriggerList.forEach((tooltipTriggerEl) => {
	if (window.bootstrap && window.bootstrap.Tooltip) {
		new window.bootstrap.Tooltip(tooltipTriggerEl);
	}
});

// Botão voltar ao topo
const backToTopButton = document.getElementById('backToTop');
const mainArticle = document.querySelector('article');

if (backToTopButton && mainArticle) {
	const mainArticleBottom = mainArticle.offsetTop + mainArticle.offsetHeight;

	window.addEventListener('scroll', () => {
		if (window.scrollY > mainArticleBottom) {
			backToTopButton.classList.remove('d-none');
		} else {
			backToTopButton.classList.add('d-none');
		}
	});

	backToTopButton.addEventListener('click', () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	});
}
