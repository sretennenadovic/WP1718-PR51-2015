$(document).ready(function () {
    $('#div1').hide();


    $("#RegistrujSe").click(function (data) {
        let uspeh = "da";
        let korisnickoIme = `${$('#KorisnickoIme').val()}`;
        let lozinka = `${$('#Lozinka').val()}`;
        let ime = `${$('#Ime').val()}`;
        let prezime = `${$('#Prezime').val()}`;
        let jmbg = `${$('#JMBG').val()}`;
        let kontaktTelefon = `${$('#KontaktTelefon').val()}`;
        let email = `${$('#Email').val()}`;

        if (korisnickoIme === "" || lozinka === "" || ime === "" || prezime === "" || jmbg === "" || kontaktTelefon === "" || email === "") {
            alert("Sva polja se moraju popuniti!");
            uspeh = "ne";
        } else {

            if (korisnickoIme.length < 3 || korisnickoIme.length > 15) {
                uspeh = "ne";
                $('#KorisnickoIme').css('background-color', '#ff7556');
                $('#KorisnickoIme').val("");
                $('#KorisnickoIme').attr('placeholder', 'Mora 3-15 slova!');
            } else {
                $('#KorisnickoIme').css('background-color', 'white');
                $('#KorisnickoIme').attr('placeholder', '');
            }

            if (lozinka.length < 4 || lozinka.length > 15) {
                uspeh = "ne";
                $('#Lozinka').css('background-color', '#ff7556');
                $('#Lozinka').val("");
                $('#Lozinka').attr('placeholder', 'Mora 4-15 karaktera!');
            } else {
                $('#Lozinka').css('background-color', 'white');
                $('#Lozinka').attr('placeholder', '');
            }

            if (ime.length < 2 || ime.length > 15) {
                uspeh = "ne";
                $('#Ime').css('background-color', '#ff7556');
                $('#Ime').val("");
                $('#Ime').attr('placeholder', 'Mora 2-15 slova!');
            } else {
                $('#Ime').css('background-color', 'white');
                $('#Ime').attr('placeholder', '');
            }

            if (prezime.length < 3 || prezime.length > 15) {
                uspeh = "ne";
                $('#Prezime').css('background-color', '#ff7556');
                $('#Prezime').val("");
                $('#Prezime').attr('placeholder', 'Mora 3-15 slova!');
            } else {
                $('#Prezime').css('background-color', 'white');
                $('#Prezime').attr('placeholder', '');
            }

            if (jmbg.length !== 13) {
                uspeh = "ne";
                $('#JMBG').css('background-color', '#ff7556');
                $('#JMBG').val("");
                $('#JMBG').attr('placeholder', 'Tačno 13 brojeva!');
            } else {
                if (isNaN(kontaktTelefon)) {
                    uspeh = "ne";
                    $('#JMBG').css('background-color', '#ff7556');
                    $('#JMBG').val("");
                    $('#JMBG').attr('placeholder', 'Samo brojevi!');
                } else {
                    $('#JMBG').css('background-color', 'white');
                    $('#JMBG').attr('placeholder', '');
                }
            }

            if (kontaktTelefon.length < 6 || kontaktTelefon.length > 7) {
                uspeh = "ne";
                $('#KontaktTelefon').css('background-color', '#ff7556');
                $('#KontaktTelefon').val("");
                $('#KontaktTelefon').attr('placeholder', 'Mora 6-7 brojeva!');
            } else {
                if (isNaN(kontaktTelefon)) {
                    uspeh = "ne";
                    $('#KontaktTelefon').css('background-color', '#ff7556');
                    $('#KontaktTelefon').val("");
                    $('#KontaktTelefon').attr('placeholder', 'Samo brojevi!');
                } else {
                    $('#KontaktTelefon').css('background-color', 'white');
                    $('#KontaktTelefon').attr('placeholder', '');
                }
            }

            if (email.length < 6) {
                uspeh = "ne";
                $('#Email').css('background-color', '#ff7556');
                $('#Email').val("");
                $('#Email').attr('placeholder', 'Mora minimum 6 karaktera!');
            } else {
                let patern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);

                if (patern.test($("#Email").val())) {
                    $('#Email').css('background-color', 'white');
                    $('#Email').attr('placeholder', '');
                } else {
                    uspeh = "ne";
                    $('#Email').css('background-color', '#ff7556');
                    $('#Email').val("");
                    $('#Email').attr('placeholder', 'Nevalidna email adresa!');
                }
            }

            if (uspeh === "da") {

                let pol;
                if ($('#Pol1').prop('checked')) {
                    pol = 'Muski';
                } else if ($('#Pol2').prop('checked')) {
                    pol = 'Zenski';
                }

                let Korisnik = {
                    KorisnickoIme: `${$('#KorisnickoIme').val()}`,
                    Lozinka: `${$('#Lozinka').val()}`,
                    Ime: `${$('#Ime').val()}`,
                    Prezime: `${$('#Prezime').val()}`,
                    Pol: pol,
                    JMBG: `${$('#JMBG').val()}`,
                    KontaktTelefon: `${$('#KontaktTelefon').val()}`,
                    Email: `${$('#Email').val()}`,
                    Uloga: 'Musterija',
                    Voznje: "",
                    Banovan: `${"NE"}`
                };

                $.ajax({
                    type: 'POST',
                    url: '/api/Registration',
                    data: JSON.stringify(Korisnik),
                    contentType: 'application/json;charset=utf-8',
                    dataType: 'json',
                    success: function (data) {
                        if (!data) {
                            alert("Korisničko ime već postoji!");
                        } else {
                            alert("Uspešno ste se registrovali!");
                            $('#div2').find(':input').each(function () {
                                switch (this.type) {
                                    case 'text':
                                    case 'password':
                                    case 'email':
                                        $(this).val('');
                                        break;
                                    case 'radio':
                                        this.checked = false;
                                        break;
                                }
                            });
                        }
                    }
                });
            }
        }
    });

    $('#act1').click(function () {
        $('#div2').hide();
        $('#div1').show();
    });

    $('#act2').click(function () {
        $('#div1').hide();
        $('#div2').show();
    });

    $('#LogujSe').click(function () {

        let korisnickoIme = `${$('#KorisnickoImeLogIn').val()}`;
        let lozinka = `${$('#LozinkaLogIn').val()}`;
        let uspeh = "da";

        if (korisnickoIme === "" || lozinka === "") {
            alert("Ni jedno polje ne sme biti prazno!");
        } else {
            if (korisnickoIme.length < 3 || korisnickoIme.length > 15) {
                uspeh = "ne";
                $('#KorisnickoImeLogIn').css('background-color', '#ff7556');
                $('#KorisnickoImeLogIn').val("");
                $('#KorisnickoImeLogIn').attr('placeholder', 'Mora 3-15 slova!');
            } else {
                $('#KorisnickoImeLogIn').css('background-color', 'white');
                $('#KorisnickoImeLogIn').attr('placeholder', '');
            }

            if (lozinka.length < 4 || lozinka.length > 15) {
                uspeh = "ne";
                $('#LozinkaLogIn').css('background-color', '#ff7556');
                $('#LozinkaLogIn').val("");
                $('#LozinkaLogIn').attr('placeholder', 'Mora 4-15 karaktera!');
            } else {
                $('#LozinkaLogIn').css('background-color', 'white');
                $('#LozinkaLogIn').attr('placeholder', '');
            }

            if (uspeh === "da") {

                let KorisnikLog = {
                    KorisnickoIme: `${$('#KorisnickoImeLogIn').val()}`,
                    Lozinka: `${$('#LozinkaLogIn').val()}`
                };



                $.ajax({
                    type: 'POST',
                    url: '/api/LogIn',
                    data: JSON.stringify(KorisnikLog),
                    contentType: 'application/json;charset=utf-8',
                    dataType: 'json',
                    success: function (data) {
                        if (!data) {
                            alert("Korisničko ime ili lozinka je nevalidna!");
                        } else {
                            //redirektuj na glavnu

                            $.ajax({
                                type: 'GET',
                                url: '/api/LogIn',
                                data: { KorisnickoIme: `${$('#KorisnickoImeLogIn').val()}` },
                                contentType: 'application/json;charset=utf-8',
                                dataType: 'json',
                                success: function (data) {
                                    if (data.Banovan === "NE") {
                                        localStorage.setItem("Ulogovan", KorisnikLog.KorisnickoIme);
                                        $(location).attr('href', 'main.html');
                                    } else {
                                        alert("Žao nam je, banovani ste na ovom sajtu!");
                                    }
                                }
                            });
                        }
                    }
                });

            }
        }
    });
});