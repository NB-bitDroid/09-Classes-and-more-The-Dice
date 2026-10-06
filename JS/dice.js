const diceContainers = document.querySelectorAll(".dice");
let dice = [];


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

diceContainers.forEach((di, idx)=>{
    //di is the current html element in the array
    //idx is the index of the array
    dice.push(new Dice(di));
});

async function rollDice(){
    let rolls = [];
    for(let d of dice){
        rolls.push(d.roll()); // rolls is an array of promises
    };
    // await - requires being run in an async environment 
    await Promise.all(rolls); //stop executiong until all promises are complete
    console.log(calcuateDiceTotal());
};

function calcuateDiceTotal() {
    let total = 0;
    dice.forEach((d) => {
        total += d.value;
    });
    return total;
};