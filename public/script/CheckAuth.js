// Middleware de vérification d'authentification
function checkAuth(req, res, next) {
    if (!req.session.utilisateur) {
        // Si l'utilisateur n'est pas authentifié, rediriger vers la page de connexion
        return res.redirect('/userLogin');
    }
    // Passer au middleware suivant si l'utilisateur est authentifié
    next();
}

module.exports = checkAuth;