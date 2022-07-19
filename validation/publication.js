const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validatepublication(data) {
    let errors = {};
    data.EventName = !isEmpty(data.EventName) ? data.EventName : "";
    data.NumberPart= !isEmpty(data.NumberPart) ? data.NumberPart : "";
    data.Adress = !isEmpty(data.Adress) ? data.Adress : "";
    data.Picture = !isEmpty(data.Adress) ? data.Picture : "";
    if (Validator.isEmpty(data.NameEvent)) {
        errors.NameEvent = "name event field is required";
    }
    if (Validator.isEmpty(data.NumberPart)) {
        errors.NumberPart = "numberpart field is required";
    }
    
    if (Validator.isEmpty(data.Adress)) {
        errors.Adress = "adress field is required";
    }
    if (Validator.isEmpty(data.Picture)) {
        errors.Picture = "picture field is required";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};


//pour valider que les champs required & not empty
module.exports = function validatepost(data) {
    let errors = {};
    data.status = !isEmpty(data.Eventstatus) ? data.status : "";
    
    if (Validator.isEmpty(data.status)) {
        errors.status = "adress field is required";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};



//pour valider que les champs required & not empty
module.exports = function validatemedia(data) {
    let errors = {};
    data.Picture = !isEmpty(data.Picture) ? data.Picture : "";
    
    if (Validator.isEmpty(data.Picture)) {
        errors.Picture = "picture field is required";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};

module.exports = function validatepublication(data) {
    let errors = {};
    
    data.NameEvent = !isEmpty(data.NameEvent) ? data.NameEvent : "";
    data.NumberPart = !isEmpty(data.NumberPart) ? data.NumberPart : "";
    data.Adress = !isEmpty(data.Adress) ? data.Adress : "";
  
    if (Validator.isEmpty( data.NameEvent)) {
        errors.NameEvent= "NameEvent field is required";
    } else if (!Validator.isEmail(data.NumberPart)) {
        errors.NumberPart = "NameEvent field is required";
    }
    if (Validator.isEmpty(data.Adress)) {
        errors.Adress= "Adress field is required";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};