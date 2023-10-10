export default class Slide{
    constructor(slide, wrapper){
        this.slide =   document.querySelector(slide)
        this.wrapper = document.querySelector(wrapper)
        this.dist = {
            finalPosition:0,
            startX:0,
            movement:0
        }
    }

    updatePosition(clienteX){
        this.dist.movement = (this.dist.startX -clienteX)*1.8;
        return this.dist.finalPosition - this.dist.movement;
    }

    moveSlide(distX){
        this.dist.movePosisition = distX;
        this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
    }    

    onStart(event){
        let movetype;
        if(event.type === 'mousedown'){
            event.preventDefault();
            this.dist.startX = event.clientX;
            movetype = 'mousemove'
        }else{
            this.dist.startX = event.changedTouches[0].clientX;
            movetype = 'touchmove'
        }
        
        this.wrapper.addEventListener(movetype, this.onMove)
    }
    onMove(event){
        const pointerPosition = (event.type == 'mousemove') ? event.clientX : event.changedTouches[0].clientX
        const finalPosition = this.updatePosition(pointerPosition)
        this.moveSlide(finalPosition)
    }
    onEnd(event){
        const movetype = (event.type === 'mouseup') ? 'mousemove' : 'touchmove';
        this.wrapper.removeEventListener(movetype, this.onMove)
        this.dist.finalPosition = this.dist.movePosisition
    }
    addSlideEvent(){
        this.wrapper.addEventListener('mousedown', this.onStart)
        this.wrapper.addEventListener('touchstart', this.onStart)
        this.wrapper.addEventListener('mouseup', this.onEnd)
        this.wrapper.addEventListener('touchend', this.onEnd)
    }

    bindEvents(){
        this.onStart = this.onStart.bind(this);
        this.onMove = this.onMove.bind(this);
        this.onEnd = this.onEnd.bind(this)
    }
    //Config

    centerItem(slide){
        const margin = (this.wrapper.offsetWidth - slide.offsetWidth) /2;
        return -(slide.offsetLeft - margin);
    }

    config(){
        this.slideArray = [...this.slide.children].map((e) => {
            const posisiton = this.centerItem(e);
            return{
                posisiton, e
            }
        });
    }

    slidesIndexNav(index){
        const last = this.slideArray.length -1;
        this.index = {
            prev:index ? index-1 : undefined,
            active:index,
            next: index === last ? undefined : index+1,
        }
    }

    changeSlide(index){
        const activeSlide =this.slideArray[index]
        this.moveSlide(activeSlide.posisiton)
        this.slidesIndexNav(index)
        console.log(this.index)
        this.dist.finalPosition = activeSlide.posisiton
    }

    init(){
        this.bindEvents();
        this.addSlideEvent();
        this.config();
        return this;
    }
}