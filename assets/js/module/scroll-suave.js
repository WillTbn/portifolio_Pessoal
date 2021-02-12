export default function initScrollSuave(){
    const linksInternos = document.querySelectorAll('[data-menu="suave"] a[href^="#"]');
    function scrollToSection(event){
        event.preventDefault();
        const hrefs = this.getAttribute('href');
        const section = document.querySelector(hrefs);
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start', 
        });
    }
    linksInternos.forEach((iten)=>{
        iten.addEventListener('click', scrollToSection);
    });
}