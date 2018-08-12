/*
 * Create a list that holds all of your cards
 */
const icons=["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor","fa fa-anchor", "fa fa-bolt","fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle",  "fa fa-bomb","fa fa-bomb"];
const cardsContainer = document.querySelector(".deck");
const finalMessage = document.querySelector(".container");
let openedCards = [];
let matchedCards = [];
let moves=0;
let starsNo=0;
const movesContainer = document.querySelector(".moves");
let starsContainer = document.querySelector(".stars");
const restartBtn = document.querySelector(".restart");
const timerContainer = document.querySelector(".timer");
let liveTimer,
totalSeconds = 0;
// First Click Indicator
let isFirstClick = false;
// Set the default value to the timer's container
timerContainer.innerHTML = totalSeconds;
let modal = document.getElementById("popup1")
// close icon in modal
let closeicon = document.querySelector(".close");


// start the game first time
init();
 ///////restart Button
function restart(){
  //delete all cards from its container
  cardsContainer.innerHTML="";
  //call init function
  init();
}
restartBtn.addEventListener('click',function(){
//resetting opened cards array
  openedCards = [];
//delete all cards from its container
  cardsContainer.innerHTML="";
  //call init function
  init();
})
/////// rating
function rating() {
  if (moves<9) {
    starsContainer.innerHTML=`<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
    starsNo = 5;
  }else if (8<moves<11){
    starsContainer.innerHTML=`<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
    starsNo = 4;
  }else if (10<moves<14){
    starsContainer.innerHTML=`<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
    starsNo = 3;
  }else if (13<moves<16){
    starsContainer.innerHTML=`<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
    starsNo = 2;
  }else if (15<moves){
    starsContainer.innerHTML=`<li><i class="fa fa-star"></i></li>`;
    starsNo = 1;
  }
}
function addMove(){
  moves++;
  movesContainer.innerHTML=moves;//update moves container
  //set rating stars
  rating();
  }
///// click event to each card
function click(card){
  // card click event
  card.addEventListener("click", function(){
    if(isFirstClick) {
    // Start our timer
    startTimer();
    // Change our First Click indicator's value
    isFirstClick = false;
    }
  const currentCard = this;
  const previousCard = openedCards[0];
  //have existing opened cards
  if (openedCards.length === 1){

    card.classList.add("open", "show", "disable" ) ;
    openedCards.push(this);
  //we should compare the last two opened cards
  //matched
  compare(currentCard,previousCard);
  addMove();
  }
  //no opened cards
  else {

  currentCard.classList.add("open", "show","disable") ;
  openedCards.push(this);
  }
})
}
//// compare two opened cards
function compare(currentCard,previousCard){
  if (currentCard.innerHTML === previousCard.innerHTML) {
      currentCard.classList.add("match");
      previousCard.classList.add("match");
      matchedCards.push(currentCard, previousCard);
      openedCards = [];
      isOver();
    }
    //doesn't match
    else {
    setTimeout(function () {
      currentCard.classList.remove("open" , "show", "disable");
      previousCard.classList.remove("open" , "show", "disable");
      openedCards = [];
    }, 200);

    }
}
//// initialize the game
function init(){
  shuffle(icons);
  //reset timer function
  stopTimer();
  isFirstClick = true;
  totalSeconds = 0;
  timerContainer.innerHTML = totalSeconds + " Seconds";
  //empty matchedCards array
  matchedCards=[];
  //clear moves counter
  moves=0;
  movesContainer.innerHTML=moves;
  //3 stars
  starsContainer.innerHTML=`<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`;
  starsNo = 5;  // crete cards
  for (let i = 0; i <icons.length; i++){
    const card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML= `<i class ="${icons[i]}"></i>`;
    cardsContainer.appendChild(card);
    //add click event to each card
    click(card);
  }
}
//// finishing the Game

    /*  div saying   congratulations you won! - with 17 moves 1 stars. - Play again! Btn
    finalMessage.innerHTML=`
    <br> <br> <br>
    <header>
        <h1>Congratulations you won!</h1>
    </header>
    <span >with ${movesContainer.innerHTML} Moves and ${starsNo} Stars in ${totalSeconds} Seconds.</span>
    <span>WOOOOOO!</span><Button id="again">Play again!</Button>`;
 */
  // Stop our timer

// @description congratulations when all cards match, show modal and moves, time and rating
function isOver (){
  if(matchedCards.length === icons.length) {
        clearInterval(liveTimer);
        totalSeconds = timerContainer.innerHTML;
	// show congratulations modal
        modal.classList.add("show");

        // declare star rating variable
        var starRating = document.querySelector(".stars").innerHTML;

        //showing move, rating, time on modal
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = totalSeconds;

        //closeicon on modal
        closeModal();
        stopTimer();
    };
}
// @description close icon on modal
function closeModal(){
    closeicon.addEventListener("click", function(e){
        modal.classList.remove("show");
	restart();
    });
}
// @desciption for user to play Again
function playAgain(){
    modal.classList.remove("show");
    restart();
}
//// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
function startTimer() {
  liveTimer = setInterval(function() {
    // Increase the totalSeconds by 1
    totalSeconds++;
    // Update the HTML Container with the new time
    timerContainer.innerHTML = totalSeconds + " Seconds";
  }, 1000);
}
function stopTimer() {
    clearInterval(liveTimer);
}
