<?php
$servername = '127.0.0.1';
$username = 'root';
$password = '';
$dbname = 'QuizApp';

$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifiez la connexion
if ($conn->connect_error) {
    die("Échec de la connexion : " . $conn->connect_error);
}
$pseudo = $_POST['userLog-name'];
$mdp = $_POST['userLog-pwd'];

$pseudo = $conn->real_escape_string($pseudo);
$mdp = $conn->real_escape_string($mdp);

// Requête pour vérifier si le nom d'utilisateur et le mot de passe correspondent
$sql = "SELECT * FROM utilisateur WHERE pseudo = '$pseudo' AND pwd = '$mdp'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Connexion réussie
    echo "Connexion réussie !";
} else {
    // Échec de la connexion
    echo "Nom d'utilisateur ou mot de passe incorrect";
}

$conn->close();

?>