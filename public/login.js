function register() {
    document.getElementById("check-button").addEventListener('click', checkLogs, true)
}
function checkLogs() {

    pseudo = document.getElementById('userLog-name').value;
    mdp = document.getElementById('userLog-pwd').value;

    if (pseudo.trim() === '' || mdp.trim() === '') {
        alert('Veuillez remplir tous les champs.');
        return false; // 
    }
}