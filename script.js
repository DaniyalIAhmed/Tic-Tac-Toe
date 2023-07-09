console.log('Powered by iMeet\n');

// Audios-->
let music = new Audio('music.mp3');
let tick = new Audio('ting.mp3');
let gameOver = new Audio('gameover.mp3');
let success = new Audio('success.mp3')
let turn = "X";

// Function to change turn value
const changeTurn = ()=>{
    if(turn ==='X'){
        turn ='O';
    }
    else{
        turn = 'X';
    }
}

const reset = ()=>{
    let boxes = document.getElementsByClassName('box');
    Array.from(boxes).forEach((e)=>{
        let boxtext = e.querySelector('.text');
        if(boxtext.innerText != ''){
            boxtext.innerText = '';
            turn = "X"
            document.getElementsByClassName('turn')[0].innerText = 'Turn for ' + turn;
        }
    })
}
const checkWin= ()=>{
    let boxtext = document.getElementsByClassName('text');
    let wins = [[0, 1, 2, 5, 5, 0],
                [3, 4, 5, 5, 15, 0],
                [6, 7, 8, 5, 25, 0], 
                [0, 3, 6, -5, 15, 90], 
                [1, 4, 7, 5, 15, 90], 
                [2, 5, 8, 15, 15, 90], 
                [0, 4, 8, 5, 15, 45], 
                [2, 4, 6, 5, 15, 135]]
    let boxes = document.getElementsByClassName('box');
    wins.forEach(e=>{
        if((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[1]].innerText === boxtext[e[2]].innerText) && (boxtext[e[0]].innerText !=='')){
            document.querySelector('.turn').innerText = boxtext[e[0]].innerText + ' Wins!';
            document.querySelector('.excited').style.width = '200px';
            document.querySelector('.line').style.transform = `translate(${e[3]}vh, ${e[4]}vh) rotate(${e[5]}deg)`
            document.querySelector('.line').style.width = '20vh';
            success.play();
            setTimeout(()=>{
                document.querySelector('.excited').style.width = '0';
                document.querySelector('.line').style.width = '0';
                reset();
            }, 3000);
        }
        else{
            isWin = false;
        }
    })
}

//Game Logic-->
let boxes = document.getElementsByClassName('box');
let btn = document.getElementsByClassName('reset');
Array.from(btn).forEach((element)=>{
    element.addEventListener('click', ()=>{
        Array.from(boxes).forEach((e)=>{
            let boxtext = e.querySelector('.text');
            if(boxtext.innerText != ''){
                boxtext.innerText = '';
                turn = "X"
                document.getElementsByClassName('turn')[0].innerText = 'Turn for ' + turn;
                document.querySelector('.excited').style.width = '0';
                document.querySelector('.line').style.width = '0';
            }
        })
    })
})

Array.from(boxes).forEach((element)=>{
    let boxtext = element.querySelector('.text');
    element.addEventListener('click', ()=>{
        if(boxtext.innerText === ''){
            boxtext.innerText = turn;
            changeTurn();
            tick.play();
            document.getElementsByClassName('turn')[0].innerText = 'Turn for ' + turn;
            checkWin();
        }
    })
})