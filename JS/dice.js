class Dice{
    /**
     * Instantiates a dice object
     * @param {*} container an html container 
     */
    constructor(container){
        this.container = container;
        this.container.classList.add("dice");
        this.face = this.createFace();
        this.value = 5;
        this.locked= false;
        this.addClickHandler();
    };

    get value(){
        return this._value;
    };

    set value(val){
        if(val < 1 || val > 6){
            console.error("Invalid value passed in");
            return;
        }
        this._value = val;
        this.face.src = `/images/dice-${val}.svg`;
    };

    createFace(){
        let face = document.createElement("img");
        this.container.append(face);
        return face;
    };

    addClickHandler(){
        this.container.addEventListener("click", ()=>{
            this.container.classList.toggle("locked");
            this.locked = !this.locked;
        });
    };

    // roll(){
    //     if(this.locked) return;
    //     let roller = setInterval(()=>{
    //         this.value = Math.floor(Math.random() * 6) + 1;
    //     }, 50);
    //     setTimeout(()=>{
    //         clearInterval(roller);
    //     }, 1000);
    // };

    roll(){
        if(this.locked) return;
        return new Promise((resolve)=>{
            let roller = setInterval(()=>{
                this.value = Math.floor(Math.random() * 6) + 1;
            }, 50);
            setTimeout(()=>{
                clearInterval(roller);
                resolve();
            }, 1000);
        });
    };
 };