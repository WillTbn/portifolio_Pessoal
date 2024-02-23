export default function shareAction(){
    const buttonAction = document.querySelectorAll('[data-share="share"]');

    // const imageBlob = fetch('https://jorgenunes.vercel.app/assets/img/Jorge_Nunes-dev.jpeg').then(response => response.blob());
    const data = {
            url: 'https://jorgenunes.vercel.app/',
            text: ' Confira meu portfólio com projetos! ',
            title: 'Jorge Nunes | Desenvolvimento fullstack',
            imageUrl:'https://jorgenunes.vercel.app/assets/img/Jorge_Nunes-dev.jpeg'
            // files: [imageBlob],
            // date: '2024-02-23',
            // type: 'image/jpeg',
    }
    function action(event){
        event.preventDefault();
        if(navigator.canShare && navigator.canShare(data)){
            navigator.share(data)
        }else{
            alert("Não suportado")
        }
    }
    buttonAction.forEach((iten)=>{
        iten.addEventListener('click', action);
    });
}