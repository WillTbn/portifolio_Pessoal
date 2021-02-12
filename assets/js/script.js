function outsideClick(element, events, callback){
    const html = document.documentElement;
    //aqui e para adicionar somente uma vez o evento click
    const outside = 'data-outside';
    if(!element.hasAttribute(outside)){
        events.forEach(userEvent =>{
          setTimeout(()=>{html.addEventListener(userEvent, handleOutsideClick);})
        element.setAttribute(outside, '');  
        })
    }
    function handleOutsideClick(event){
        if(!element.contains(event.target)){
            element.removeAttribute(outside);
            events.forEach(userEvent =>{
                html.removeEventListener(userEvent, handleOutsideClick);
            });
            callback();
        }
    }
}
function initMenu(){
    const menuButton = document.querySelector('[data-menu="button"]');
    const menuList = document.querySelector('[data-menu="list"]');
    const eventos = ['click', 'touchstart'];
    if(menuButton){   
        function openMenu(event){
            menuList.classList.add('active');
            menuButton.classList.add('active');
            outsideClick(menuList, eventos, () =>{
                menuList.classList.remove('active');
                menuButton.classList.remove('active');
            })
        }
        eventos.forEach(evento =>menuButton.addEventListener('click', openMenu));
    }
}
initMenu();

function initScrollSuave(){
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
initScrollSuave();


function initTypeWriter(elemento){
    const textArray = elemento.innerHTML.split('');
    elemento.innerHTML = '';
    textArray.forEach((letra,i)=>{
        setTimeout(function(){
            elemento.innerHTML += letra;
        }, 100 * i);
        
    });
}