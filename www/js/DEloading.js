var pullDownEl = 0;

function loaded() {
	pullUpEl = document.getElementById('pullUp');	

	pullUpEl.className = 'loading';
	pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Carregant...';				

}


//document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);