const quoteContainer= document.querySelector('#quote-container');
const quoteText= document.querySelector('#quote');
const authorText= document.querySelector('#author');
const twitterBtn= document.querySelector('#twitter');
const newQuoteBtn= document.querySelector('#new-quote');
const loader= document.querySelector('#loader');


function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function completeLoad(){
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden= true;
    }
   
}

// Get quote from API
async function getQuote(){
    loading();
    //proxy url so i can unblock fetching from api
    const proxyUrl= 'https://gentle-badlands-50732.herokuapp.com/'

    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const response= await fetch(proxyUrl + apiUrl)
        const data= await response.json();
        checkAndFix(data);
        completeLoad();
    }catch(error){
        getQuote();
        console.log('Whoops, no quote', error);
    }

}


//check if need ro resize font, and set author to unknown
function checkAndFix(data){
    authorText.textContent = data.quoteAuthor;
    if(!authorText.textContent){authorText.textContent = 'Unknown'};
    quoteText.textContent= data.quoteText;
    if(quoteText.textContent.length > 100){
        quoteText.classList.add('long-quote');
    } else{
        quoteText.classList.remove('long-quote');
    }
}

//Tweet the quote
function tweetQ(){
    const quote= quoteText.textContent;
    const author= authorText.textContent;
    const twitterUrl= `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');

}

//Event listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQ);


     
 


//on Load
getQuote();
