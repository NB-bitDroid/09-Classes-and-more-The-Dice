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
    let num1 = [];
    let num2 = [];
    let num3 = [];
    let num4 = [];
    let num5 = [];
    let num6 = [];
    dice.forEach((d) => {
        if (d.value == 1) {
            num1 += d.value
        }
        if (d.value == 2) {
            num2 += d.value
        }
        if (d.value == 3) {
            num3 += d.value
        }
        if (d.value == 4) {
            num4 += d.value
        }
        if (d.value == 5) {
            num5 += d.value
        }
        if (d.value == 6) {
            num6 += d.value
        }
    });
    if (dice[0].value == 1 && dice[1].value == 2 && dice[2].value == 3 && dice[3].value == 4 && dice[4].value == 5 && dice[5].value == 6) {
        total += 1500;
    };
    if (num1.length < 6) {
        if (num1.length < 5) {
            if (num1.length < 4) {
                if (num1.length <= 2) {
                    total += (num1.length * 100);
                }if (num1.length == 3) {
                    total += 300;
                };
            }if (num1.length == 4) {
                total += 1000
            };
        }if (num1.length == 5) {
            total += 2000
        };
    }if (num1.length == 6) {
        total += 3000
    };
    if (num2.length < 6) {
        if (num2.length < 5) {
            if (num2.length < 4) {
                if (num2.length == 3) {
                    total += 200;
                };
            }if (num2.length == 4) {
                total += 1000
            };
        }if (num2.length == 5) {
            total += 2000
        };
    }if (num2.length == 6) {
        total += 3000
    };
    if (num3.length < 6) {
        if (num3.length < 5) {
            if (num3.length < 4) {
                if (num3.length == 3) {
                    total += 300;
                };
            }if (num3.length == 4) {
                total += 1000
            };
        }if (num3.length == 5) {
            total += 2000
        };
    }if (num3.length == 6) {
        total += 3000
    };
    if (num4.length < 6) {
        if (num4.length < 5) {
            if (num4.length < 4) {
                if (num4.length == 3) {
                    total += 400;
                };
            }if (num4.length == 4) {
                total += 1000
            };
        }if (num4.length == 5) {
            total += 2000
        };
    }if (num4.length == 6) {
        total += 3000
    };
    if (num5.length < 6) {
        if (num5.length < 5) {
            if (num5.length < 4) {
                if (num5.length <= 2) {
                    total += (num5.length * 50);
                }if (num5.length == 3) {
                    total += 500;
                };
            }if (num5.length == 4) {
                total += 1000
            };
        }if (num5.length == 5) {
            total += 2000
        };
    }if (num5.length == 6) {
        total += 3000
    };
    if (num6.length < 6) {
        if (num6.length < 5) {
            if (num6.length < 4) {
                if (num6.length == 3) {
                    total += 600;
                };
            }if (num6.length == 4) {
                total += 1000
            };
        }if (num6.length == 5) {
            total += 2000
        };
    }if (num6.length == 6) {
        total += 3000
    };
    return total;
};

function updateScore() {
    rollnum += calcuateDiceTotal();
    score.textContent = rollnum
}