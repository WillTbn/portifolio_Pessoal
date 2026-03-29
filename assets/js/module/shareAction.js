export default function shareAction(){
    const buttonAction = document.querySelectorAll('[data-share="share"]');

    const data = {
        url: 'https://jorgefsdeveloper.bucardcode.com.br/',
        text: 'Confira meu portfólio com projetos!',
        title: 'Jorge Nunes | Desenvolvimento fullstack',
    };

    function action(event){
        event.preventDefault();
        if (navigator.share) {
            navigator.share(data).catch(() => {});
        } else {
            alert("Compartilhamento não suportado neste navegador.");
        }
    }
    buttonAction.forEach((iten)=>{
        iten.addEventListener('click', action);
    });
}
