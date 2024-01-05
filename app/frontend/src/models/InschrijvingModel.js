class InschrijvingModel {
    constructor() {
        this.id = null;
        this.tak = "";

        this.voornaam = "";
        this.achternaam = "";
        this.geboortedatum = "";
        this.geslacht = "M";
        this.geboorteplaats = "";

        this.voornaamOuder = "";
        this.achternaamOuder = "";
        this.straatEnHuisnummer = "";
        this.postcode = "";
        this.gemeente = "";
        this.gsmNummer = "";
        this.telefoonnummer = "";
        this.email = "";

        this.tweedeVoornaamOuder = "";
        this.tweedeAchternaamOuder = "";
        this.tweedeStraatEnHuisnummer = "";
        this.tweedePostcode = "";
        this.tweedeGemeente = "";
        this.tweedeGsmNummer = "";
        this.tweedeTelefoonnummer = "";
        this.tweedeEmail = "";

        this.allowMedia = "";
    }

    validateTeaser() {
        let errors = [];

        const voornaamError = this.validateVoornaam();
        if (voornaamError) {
            errors.push(voornaamError);
        }

        const geboortedatumError = this.validateTak();
        if (geboortedatumError) {
            errors.push(geboortedatumError);
        }

        return errors;
    }

    validate() {
        let errors = [];

        const voornaamError = this.validateVoornaam();
        if (voornaamError) {
            errors.push(voornaamError);
        }

        const achternaamError = this.validateAchternaam();
        if (achternaamError) {
            errors.push(achternaamError);
        }

        const takError = this.validateGeboortedatum();
        if (takError) {
            errors.push(takError);
        }

        return errors;
    }

    validateVoornaam() {
        let error = null;

        if (this.voornaam === "") {
            error = {
                field: "voornaam",
                message: "Gelieve een voornaam in te vullen"
            };
        } else if (this.voornaam.length < 2) {
            error = {
                field: "voornaam",
                message: "Voornaam moet minstens 2 karakters bevatten"
            };
        } else if (this.voornaam.length > 50) {
            error = {
                field: "voornaam",
                message: "Voornaam mag maximum 50 karakters bevatten"
            };
        }

        return error;
    }

    validateAchternaam() {
        let error = null;

        if (this.achternaam === "") {
            error = {
                field: "achternaam",
                message: "Gelieve een achternaam in te vullen"
            };
        } else if (this.achternaam.length < 2) {
            error = {
                field: "achternaam",
                message: "Achternaam moet minstens 2 karakters bevatten"
            };
        } else if (this.achternaam.length > 50) {
            error = {
                field: "achternaam",
                message: "Achternaam mag maximum 50 karakters bevatten"
            };
        }

        return error;
    }

    validateTak() {
        let error = null;

        if (this.tak === "") {
            error = {
                field: "tak",
                message: "Gelieve een tak in te vullen"
            };
        } else if (this.tak !== "Leeuwkes" && this.tak !== "Jongknapen" && this.tak !== "Knapen" && this.tak !== "Jonghernieuwers" && this.tak !== "Ander") {
            error = {
                field: "tak",
                message: "Geen geldige tak"
            };
        }

        return error;
    }

    // calculateAge(){
    //     if(this.geboortedatum == ""){
    //         return null;
    //     }

    //     const today = new Date();
    //     const birthDate = new Date(this.geboortedatum);
    //     let age = today.getFullYear() - birthDate.getFullYear();
    //     const monthDifference = today.getMonth() - birthDate.getMonth();

    //     if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    //         age--;
    //     }

    //     return age;
    // };
}

export default InschrijvingModel;