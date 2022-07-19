module.exports.signUpErrors = (err) => {
  let errors = { pseudo: "", email: "", password: "" };
// les erreurs sur les champs retourner le msg d'erreur
  if (err.message.includes("pseudo"))
    errors.pseudo = "Pseudo incorrect ou déjà pris";

  if (err.message.includes("email")) errors.email = "Email incorrect";

  if (err.message.includes("password"))
    errors.password = "Le mot de passe doit faire 6 caractères minimum";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo"))
    errors.pseudo = "Ce pseudo est déjà pris";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
    errors.email = "Cet email est déjà enregistré";

  return errors;
};

module.exports.EventErrors = (err) => {
  let errors = { dateEvn: '', description: ''}

  if (err.message.includes("dateEvn")) 
    errors.dateEvn = "ce date est déja reservé";
  
  if (err.message.includes('description'))
    errors.description = "create "

  return errors;
}
//pour l'upload de l'image
module.exports.uploadErrors = (err) => {
  let errors = { format: '', maxSize: ""};
//la format
  if (err.message.includes('invalid file'))
    errors.format = "Format incompatabile";
//le size
  if (err.message.includes('max size'))
    errors.maxSize = "Le fichier dépasse 500ko";

  return errors
}