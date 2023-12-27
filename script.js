const cells = document.querySelectorAll(".cell");
const statustext = document.querySelector("#statustext");
const restartbtn = document.querySelector("#restartbutton");

const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]

];
let options = ["","","","","","","","",""];
let currentPlayer = "x";
let running = false;

initializegame();

function initializegame()
{
  cells.forEach(cell => cell.addEventListener("click",cellclicked));
  restartbtn.addEventListener("click",restartgame);
  statustext.textContent = `${currentPlayer}'s turn `;
  running = true ;

}


function cellclicked()
{
   const cellindex = this.getAttribute("cellIndex");
   if(options[cellindex]!="" || running==false)
   {
    return;
   }
   updatecell(this,cellindex);
   checkwinner();

}

function updatecell(cell , index)
{
 options[index] = currentPlayer;
 cell.textContent = currentPlayer;
}

function changeplayer()
{
currentPlayer =  (currentPlayer=="x")? "o":"x";
statustext.textContent = `${currentPlayer}'s turn `;
}
function checkwinner()
{
     let roundwon = false;
     for(let i = 0; i <winConditions.length ;i++)
     {
        const winrow = winConditions[i];
        const cella = options[winrow[0]];
        const cellb = options[winrow[1]];
        const cellc = options[winrow[2]];

        if(cella == "" || cellb == "" || cellc =="")
        {
            continue;
        }
        if(cella==cellb && cellb==cellc)
        {
            roundwon = true ;
            break;
        }

     }

     if(roundwon)
     {
         statustext.textContent =   `${currentPlayer} won !`;
         running=false;
     }
     else if (!options.includes(""))
     {
        running=false;
        statustext.textContent =   `Draw !`;
     }
     else
     {
        changeplayer();

     }

}

function restartgame()
{
    currentPlayer ="x";
  options = ["","","","","","","","",""]
  running = true;
  statustext.textContent  =`${currentPlayer}'s turn`;
  cells.forEach(cell => cell.textContent ="");
}