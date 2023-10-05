export default function initTypeWriter(elemento){
    const textArray = elemento.innerHTML.split('');
    elemento.innerHTML = '';
    textArray.forEach((letra,i)=>{
        setTimeout(function(){
            elemento.innerHTML += letra;
        }, 100 * i);
        
    });
    
}