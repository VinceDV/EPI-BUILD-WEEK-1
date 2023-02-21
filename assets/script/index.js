function attivaBottone () {
    var checkbox = document.getElementById('checkTermini');
    var pulsanteInizia = document.getElementById('iniziaQuiz');
    if (checkbox.checked) {
        pulsanteInizia.disabled = false;
    }else {
        pulsanteInizia.disabled = true;
    }
}