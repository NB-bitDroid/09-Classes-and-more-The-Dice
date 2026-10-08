const diceContainers = document.querySelectorAll(".dice");
let score = document.getElementById("score");
let rollnum = 0
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
    updateScore()
};

function calcuateDiceTotal() {
    let total = 0;
    let counts = [0,0,0,0,0,0,0]
    //this should only run on dice last rolled
    dice.forEach((d) => {
        counts[d.value] += 1;
    });

    let foundStraight = checkForStraight(counts);
    if(foundStraight)
        total+= 1500;
    // if (dice[0].value == 1 && dice[1].value == 2 && dice[2].value == 3 && dice[3].value == 4 && dice[4].value == 5 && dice[5].value == 6) {
    //     total += 1500;
    // };
    let threeOfAKindScore = getThreeOfAKindScore(counts)
    
}

function checkForStraight(counts){
    for(let i = 1; i < counts.length; i++){
        if(counts[i] != 1){
            return false;
        }else{
            diceCounted +=1
        }
    }
    return true;
}

//let fourOfAKind = getMatchingDiceScore(counts, 4)
//let fiveOfAKind = getMatchingDiceScore(counts, 5)
//let sixOfAKind = getMatchingDiceScore(counts, 6)
function getMatchingDiceScore(counts, count){
    for(let i = 1; i < counts.length; i++){
        if(counts[i] == count){
            return true;
        }
    }
    return false;
}

function getThreeOfAKindScore(counts){
    let score = 0;
    for(let i = 1; i < counts.length; i++){
        if(counts[i] == 3){
            score += counts[i] *  100;
        }
    }
    return score;
}

