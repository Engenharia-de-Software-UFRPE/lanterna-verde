let star = document.querySelector('input');

let showValue = document.querySelector('#rating-value');

for(let i = 0; i < star.clientHeight; i++){
    star[i].addEventListenner('click', function() {
        i = this.value;

        showValue.innerHTML = i + " outer of 5";
    });
}