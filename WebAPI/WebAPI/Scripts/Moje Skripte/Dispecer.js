$(document).ready(function () {
    $('#profild').click(function () {
        //------------------------------------------------------------------------------------------------------------
        //moram da ponavljam je r kada uradim izmenu, mora opet novo da mi povuce
        $.ajax({
            type: 'GET',
            url: '/api/Dispecer',

            data: { KorisnickoIme: `${localStorage.getItem("Ulogovan")}` },
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (data) {
                korisnik = data;
                korisnickiId = data.Id;
                //prikaz odredjenog diva za odredjenu ulogu korisnika
                if (korisnik.Uloga == 0) {
                    $('#vozac').hide();
                    $('#dispecer').hide();
                    $('#korisnik').show();
                    $('#zaprofil').hide();
                    $('#zaizmenu').hide();
                } else if (korisnik.Uloga == 1) {
                    $('#vozac').hide();
                    $('#korisnik').hide();
                    $('#dispecer').show();
                    $('#zaprofild').hide();
                    $('#zaizmenud').hide();
                    $('#dodavanjeVozaca').hide();
                } else {
                    $('#korisnik').hide();
                    $('#dispecer').hide();
                    $('#vozac').show();
                    $('#zaprofild').hide();
                    $('#zaizmenud').hide();
                }
                $('#glavni2').hide();

                let s = '';
                s += ' <div id="zaprofild">';
                s += '   <h2>Korisnički profil</h2>';
                s += '   <hr />';
                s += '   <table>';
                s += '      <tr><th>Korisničko ime:</th><td id="1d"></td></tr>';
                s += '      <tr><th>Lozinka:</th><td id="2d"></td></tr>';
                s += '     <tr><th>Ime:</th><td id="3d"></td></tr>';
                s += '      <tr><th>Prezime:</th><td id="4d"></td></tr>';
                s += '      <tr><th>JMBG:</th><td id="5d"></td></tr>';
                s += '      <tr><th>Pol:</th><td id="6d"></td></tr>';
                s += '       <tr><th>Kontakt Telefon:</th><td id="7d"></td></tr>';
                s += '       <tr><th>Email:</th><td id="8d"></td></tr>';
                s += '      <tr><th>Uloga:</th><td id="9d"></td></tr>';
                s += '   </table>';
                s += '  </div>';

                $('#glavni2').html(s);
                $('#1d').text(korisnik.KorisnickoIme);
                $('#2d').text(korisnik.Lozinka);
                $('#3d').text(korisnik.Ime);
                $('#4d').text(korisnik.Prezime);
                $('#5d').text(korisnik.JMBG);
                if (korisnik.Pol == 0) {
                    $('#6d').text("Muški");
                } else {
                    $('#6d').text("Ženski");
                }
                $('#7d').text(korisnik.KontaktTelefon);
                $('#8d').text(korisnik.Email);
                $('#9d').text('Dispečer');
                $('#glavni2').fadeIn(500);
            }
        })
    })

    /*pri kliku na link izmeni*/
    $('#izmenid').click(function () {
        $('#glavni2').hide();
        $('#dodavanjeVozaca').hide();

        $.ajax({
            type: 'GET',
            url: '/api/Dispecer',

            data: { KorisnickoIme: `${localStorage.getItem("Ulogovan")}` },
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (data) {
                korisnickiId = data.Id;
                korisnik = data;

                let s = '';

                s += '<div id="zaizmenud">';
                s += '  <table>';
                s += '     <tr><th>Korisničko ime:</th><td><input type="text" name="KorisnickoImed" id="KorisnickoImed" style="margin:5px" /></td></tr>';
                s += '     <tr><th>Lozinka:</th><td><input type="text" name="Lozinkad" id="Lozinkad" style="margin:5px" /></td></tr>';
                s += '      <tr><th>Ime:</th><td><input type="text" name="Imed" id="Imed" style="margin:5px" /></td></tr>';
                s += '      <tr><th>Prezime:</th><td><input type="text" name="Prezimed" id="Prezimed" style="margin:5px" /></td></tr>';
                s += '      <tr><th>JMBG:</th><td><input type="text" name="JMBGd" id="JMBGd" style="margin:5px" /></td></tr>';
                s += '     <tr><th>Pol:</th><td><label>Muški:&nbsp&nbsp</label><input type="radio" name="Pold" value="Muski" id="Pol1d" /><label>&nbsp&nbspŽenski:&nbsp&nbsp</label><input type="radio" value="Zenski" name="Pold" id="Pol2d" /></td></tr>';
                s += '     <tr><th>Kontakt Telefon:</th><td><input type="text" name="KontaktTelefond" id="KontaktTelefond" style="margin:5px" /></td></tr>';
                s += '     <tr><th>Email:</th><td><input type="email" name="Emaild" id="Emaild" style="margin:5px" /></td></tr>';
                s += '     <tr><td colspan="2"><hr /></td></tr>';
                s += '    <tr><td colspan="2" align="right"><b><input type="button" value="Izmeni" id="izmenad" /></b></td></tr>';
                s += '  </table>';
                s += ' </div>';

                $('#glavni2').html(s);

                $('#KorisnickoImed').val(data.KorisnickoIme);
                $('#Lozinkad').val(data.Lozinka);
                $('#Imed').val(data.Ime);
                $('#Prezimed').val(data.Prezime);
                $('#JMBGd').val(data.JMBG);
                if (data.Pol == 0) {
                    $('#Pol1d').prop('checked', true);
                } else {
                    $('#Pol2d').prop('checked', true);
                }
                $('#KontaktTelefond').val(data.KontaktTelefon);
                $('#Emaild').val(data.Email);
                $('#glavni2').fadeIn(500);
            }
        })
    })


    $('#glavni2').on('click', '#izmenad', function () {
        let uspeh = "da";
        let korisnickoIme = `${$('#KorisnickoImed').val()}`;
        let lozinka = `${$('#Lozinkad').val()}`;
        let ime = `${$('#Imed').val()}`;
        let prezime = `${$('#Prezimed').val()}`;
        let jmbg = `${$('#JMBGd').val()}`;
        let kontaktTelefon = `${$('#KontaktTelefond').val()}`;
        let email = `${$('#Emaild').val()}`;

        if (korisnickoIme == "" || lozinka == "" || ime == "" || prezime == "" || jmbg == "" || kontaktTelefon == "" || email == "") {
            alert("Sva polja se moraju popuniti!");
            uspeh = "ne";
        } else {


            if (korisnickoIme.length < 3 || korisnickoIme.length > 15) {
                uspeh = "ne";
                $('#KorisnickoImed').css('background-color', '#ff7556');
                $('#KorisnickoImed').val("");
                $('#KorisnickoImed').attr('placeholder', 'Mora 3-15 slova!');
            } else {
                $('#KorisnickoImed').css('background-color', 'white');
                $('#KorisnickoImed').attr('placeholder', '');
            }

            if (lozinka.length < 4 || lozinka.length > 15) {
                uspeh = "ne";
                $('#Lozinkad').css('background-color', '#ff7556');
                $('#Lozinkad').val("");
                $('#Lozinkad').attr('placeholder', 'Mora 4-15 karaktera!');
            } else {
                $('#Lozinkad').css('background-color', 'white');
                $('#Lozinkad').attr('placeholder', '');
            }

            if (ime.length < 2 || ime.length > 15) {
                uspeh = "ne";
                $('#Imed').css('background-color', '#ff7556');
                $('#Imed').val("");
                $('#Imed').attr('placeholder', 'Mora 2-15 slova!');
            } else {
                $('#Imed').css('background-color', 'white');
                $('#Imed').attr('placeholder', '');
            }

            if (prezime.length < 3 || prezime.length > 15) {
                uspeh = "ne";
                $('#Prezimed').css('background-color', '#ff7556');
                $('#Prezimed').val("");
                $('#Prezimed').attr('placeholder', 'Mora 3-15 slova!');
            } else {
                $('#Prezimed').css('background-color', 'white');
                $('#Prezimed').attr('placeholder', '');
            }

            if (jmbg.length != 13) {
                uspeh = "ne";
                $('#JMBGd').css('background-color', '#ff7556');
                $('#JMBGd').val("");
                $('#JMBGd').attr('placeholder', 'Tačno 13 brojeva!');
            } else {
                if (isNaN(kontaktTelefon)) {
                    uspeh = "ne";
                    $('#JMBGd').css('background-color', '#ff7556');
                    $('#JMBGd').val("");
                    $('#JMBGd').attr('placeholder', 'Samo brojevi!');
                } else {
                    $('#JMBGd').css('background-color', 'white');
                    $('#JMBGd').attr('placeholder', '');
                }
            }

            if (kontaktTelefon.length < 6 || kontaktTelefon.length > 7) {
                uspeh = "ne";
                $('#KontaktTelefond').css('background-color', '#ff7556');
                $('#KontaktTelefond').val("");
                $('#KontaktTelefond').attr('placeholder', 'Mora 6-7 brojeva!');
            } else {
                if (isNaN(kontaktTelefon)) {
                    uspeh = "ne";
                    $('#KontaktTelefond').css('background-color', '#ff7556');
                    $('#KontaktTelefond').val("");
                    $('#KontaktTelefond').attr('placeholder', 'Samo brojevi!');
                } else {
                    $('#KontaktTelefond').css('background-color', 'white');
                    $('#KontaktTelefond').attr('placeholder', '');
                }
            }

            if (email.length < 6) {
                uspeh = "ne";
                $('#Emaild').css('background-color', '#ff7556');
                $('#Emaild').val("");
                $('#Emaild').attr('placeholder', 'Mora minimum 6 karaktera!');
            } else {
                let patern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);

                if (patern.test($("#Emaild").val())) {
                    $('#Emaild').css('background-color', 'white');
                    $('#Emaild').attr('placeholder', '');
                } else {
                    uspeh = "ne";
                    $('#Emaild').css('background-color', '#ff7556');
                    $('#Emaild').val("");
                    $('#Emaild').attr('placeholder', 'Nevalidna email adresa!');
                }
            }


            if (uspeh == "da") {
                let pol;
                if ($('#Pol1d').prop('checked')) {
                    pol = 'Muski';
                } else if ($('#Pol2d').prop('checked')) {
                    pol = 'Zenski';
                }
                let KorisnikIzmena = {
                    Id: korisnickiId,
                    KorisnickoIme: `${$('#KorisnickoImed').val()}`,
                    Lozinka: `${$('#Lozinkad').val()}`,
                    Ime: `${$('#Imed').val()}`,
                    Prezime: `${$('#Prezimed').val()}`,
                    Pol: pol,
                    JMBG: `${$('#JMBGd').val()}`,
                    KontaktTelefon: `${$('#KontaktTelefond').val()}`,
                    Email: `${$('#Emaild').val()}`,
                    Uloga: `${'Dispecer'}`,
                    Voznje: `${'nema'}`,
                    Banovan: `${"NE"}`
                };

                $.ajax({
                    type: 'PUT',
                    url: '/api/Dispecer/' + korisnickiId,
                    data: JSON.stringify(KorisnikIzmena),
                    contentType: 'application/json;charset=utf-8',
                    dataType: 'json',
                    success: function (data) {
                        if (!data) {
                            $('#KorisnickoImed').css('background-color', '#ff7556');
                            alert("Korisničko ime koje zahtevate, već postoji!");
                        } else {
                            $('#KorisnickoIme').css('background-color', 'white');
                            alert("Uspešno ste izmenili podatke!");
                            localStorage.setItem("Ulogovan", KorisnikIzmena.KorisnickoIme);
                            Korisnik.KorisnickoIme = KorisnikIzmena.KorisnickoIme;
                        }
                    }
                })
            }
        }
    })

    //HOME DUGMIC I NJEGOV PADAJUCI MENI

    $('#moje').click(function () {
        $('#glavni2').hide();
        $.ajax({
            type: 'GET',
            url: '/api/Voznja',
            //data: JSON.stringify(korisnik.Id),
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (data) {


                let s = '';
                s += '<div id="voznjeD" style="font-size:14px">';
                s += '<h3 style="margin-left:44%;position:absolute;"><b>Moje vožnje</b></h3>';
                s += '<table border=1 class="voznje boja"><tr><th>Id vožnje</th><th>Datum</th><th>Mušterija</th><th>Vozač</th><th >Mesto polaska</th><th>Tip auta</th><th>Ordedište</th><th>Iznos</th><th>Komentar</th><th>Status vožnje</th><th>Opcije</th></tr>';


                for (let i = 0; i < data.length; i++) {
                    if (data[i].Dispecer == localStorage.getItem("Ulogovan")) {
                        s += ("<tr><td>" + data[i].IdVoznje + "</td><td>" + data[i].DatumVreme + "</td>");

                        if (data[i].Musterija == "") {
                            s += '<td>/</td>';
                        } else {
                            s += ('<td>' + data[i].Musterija + '</td>');
                        }

                        if (data[i].Vozac == "") {
                            s += '<td>/</td>';
                        } else {
                            s += ('<td>' + data[i].Vozac + '</td>');
                        }

                        s += ('<td>' + data[i].Lokacija.Adresa.UlicaBroj + ", " + data[i].Lokacija.Adresa.NaseljenoMesto + " " + data[i].Lokacija.Adresa.PozivniBroj + "</td><td>");

                        switch (data[i].Automobil) {
                            case 0:
                                s += "Putnički";
                                break;
                            case 1:
                                s += "Kombi";
                                break;
                            case 2:
                                s += "Svejedno";
                        }

                        if (data[i].Odrediste.Adresa.UlicaBroj == "") {
                            s += ("</td><td>/" + "</td>");
                        }
                        else {
                            s += ("</td><td>" + data[i].Odrediste.Adresa.UlicaBroj + ", " + data[i].Odrediste.Adresa.NaseljenoMesto + " " + data[i].Odrediste.Adresa.PozivniBroj + "</td>");
                        }

                        if (data[i].Iznos != "0") {
                            s += ("<td>" + data[i].Iznos + "</td>");
                        } else {
                            s += ("<td>/</td>");
                        }

                        s += ('<td><textarea rows="5" cols="30" disabled>');

                        if (data[i].Komentar.Opis == "") {
                            s += ("Komentar nije dodat!" + "</textarea ></td >");
                        } else {
                            s += ("Korisnicko ime: " + data[i].Komentar.KorisnickoIme + "\n\nOpis: " + data[i].Komentar.Opis + "\n\nOcena: " + data[i].Komentar.Ocena + "\nDatum: " + data[i].Komentar.DatumObjave + "</textarea ></td >");
                        }

                        s += ("<td>" + vratiStatusVoznje(data[i].StatusVoznje) + "</td> <td>");

                        if (vratiStatusVoznje(data[i].StatusVoznje) == "Kreirana") {
                            s += (`<input type="button" value="Obradi" id="obradi" class="obradibtn" name=${data[i].IdVoznje} /><br /><br />`);
                        } else {
                            s += ("Nedostupne");
                        }
                        s += (`</td></tr>`)
                    }
                }

                s += '</table>';
                $('#glavni2').html(s);
            }
        })
        $('#glavni2').fadeIn(500);
    })


    $('#sve').click(function () {
        $('#glavni2').hide();
        $.ajax({
            type: 'GET',
            url: '/api/Voznja',
            //data: JSON.stringify(korisnik.Id),
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (data) {

                let s = '';
                s += '<div id="voznjeD" style="font-size:14px">';
                s += '<h3 style="margin-left:44%;position:absolute;"><b>Sve vožnje</b></h3>';
                s += '<table border=1 class="voznje boja"><tr><th>Id vožnje</th><th>Datum</th><th>Mušterija</th><th>Vozač</th><th >Mesto polaska</th><th>Tip auta</th><th>Ordedište</th><th>Iznos</th><th>Komentar</th><th>Status vožnje</th><th>Opcije</th></tr>';


                for (let i = 0; i < data.length; i++) {
                    s += ("<tr><td>" + data[i].IdVoznje + "</td><td>" + data[i].DatumVreme + "</td>");

                    if (data[i].Musterija == "") {
                        s += '<td>/</td>';
                    } else {
                        s += ('<td>' + data[i].Musterija + '</td>');
                    }

                    if (data[i].Vozac == "") {
                        s += '<td>/</td>';
                    } else {
                        s += ('<td>' + data[i].Vozac + '</td>');
                    }

                    s += ('<td>' + data[i].Lokacija.Adresa.UlicaBroj + ", " + data[i].Lokacija.Adresa.NaseljenoMesto + " " + data[i].Lokacija.Adresa.PozivniBroj + "</td><td>");

                    switch (data[i].Automobil) {
                        case 0:
                            s += "Putnički";
                            break;
                        case 1:
                            s += "Kombi";
                            break;
                        case 2:
                            s += "Svejedno";
                    }

                    if (data[i].Odrediste.Adresa.UlicaBroj == "") {
                        s += ("</td><td>/" + "</td>");
                    }
                    else {
                        s += ("</td><td>" + data[i].Odrediste.Adresa.UlicaBroj + ", " + data[i].Odrediste.Adresa.NaseljenoMesto + " " + data[i].Odrediste.Adresa.PozivniBroj + "</td>");
                    }

                    if (data[i].Iznos != "0") {
                        s += ("<td>" + data[i].Iznos + "</td>");
                    } else {
                        s += ("<td>/</td>");
                    }

                    s += ('<td><textarea rows="5" cols="30" disabled>');

                    if (data[i].Komentar.Opis == "") {
                        s += ("Komentar nije dodat!" + "</textarea ></td >");
                    } else {
                        s += ("Korisnicko ime: " + data[i].Komentar.KorisnickoIme + "\n\nOpis: " + data[i].Komentar.Opis + "\n\nOcena: " + data[i].Komentar.Ocena + "\nDatum: " + data[i].Komentar.DatumObjave + "</textarea ></td >");
                    }

                    s += ("<td>" + vratiStatusVoznje(data[i].StatusVoznje) + "</td> <td>");

                    if (vratiStatusVoznje(data[i].StatusVoznje) == "Kreirana") {
                        s += (`<input type="button" value="Obradi" id="obradi" class="obradibtn" name=${data[i].IdVoznje} /><br /><br />`);
                    } else {
                        s += ("Nedostupne");
                    }
                    s += (`</td></tr>`);
                }

                s += '</table>';
                $('#glavni2').html(s);
            }
        })
        $('#glavni2').fadeIn(500);
    })


    $('#nacekanju').click(function () {
        $('#glavni2').hide();
        $.ajax({
            type: 'GET',
            url: '/api/Voznja',
            //data: JSON.stringify(korisnik.Id),
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (data) {


                let s = '';
                s += '<div id="voznjeD" style="font-size:14px">';
                s += '<h3 style="margin-left:44%;position:absolute;"><b>Vožnje na čekanju</b></h3>';
                s += '<table border=1 class="voznje boja"><tr><th>Id vožnje</th><th>Datum</th><th>Mušterija</th><th>Vozač</th><th >Mesto polaska</th><th>Tip auta</th><th>Ordedište</th><th>Iznos</th><th>Komentar</th><th>Status vožnje</th><th>Opcije</th></tr>';


                for (let i = 0; i < data.length; i++) {
                    if (vratiStatusVoznje(data[i].StatusVoznje) == "Kreirana") {
                        s += ("<tr><td>" + data[i].IdVoznje + "</td><td>" + data[i].DatumVreme + "</td>");

                        if (data[i].Musterija == "") {
                            s += '<td>/</td>';
                        } else {
                            s += ('<td>' + data[i].Musterija + '</td>');
                        }

                        if (data[i].Vozac == "") {
                            s += '<td>/</td>';
                        } else {
                            s += ('<td>' + data[i].Vozac + '</td>');
                        }

                        s += ('<td>' + data[i].Lokacija.Adresa.UlicaBroj + ", " + data[i].Lokacija.Adresa.NaseljenoMesto + " " + data[i].Lokacija.Adresa.PozivniBroj + "</td><td>");


                        switch (data[i].Automobil) {
                            case 0:
                                s += "Putnički";
                                break;
                            case 1:
                                s += "Kombi";
                                break;
                            case 2:
                                s += "Svejedno";
                        }

                        if (data[i].Odrediste.Adresa.UlicaBroj == "") {
                            s += ("</td><td>/" + "</td>");
                        }
                        else {
                            s += ("</td><td>" + data[i].Odrediste.Adresa.UlicaBroj + ", " + data[i].Odrediste.Adresa.NaseljenoMesto + " " + data[i].Odrediste.Adresa.PozivniBroj + "</td>");
                        }

                        if (data[i].Iznos != "0") {
                            s += ("<td>" + data[i].Iznos + "</td>");
                        } else {
                            s += ("<td>/</td>");
                        }

                        s += ('<td><textarea rows="5" cols="30" disabled>');

                        if (data[i].Komentar.Opis == "") {
                            s += ("Komentar nije dodat!" + "</textarea ></td >");
                        } else {
                            s += ("Korisnicko ime: " + data[i].Komentar.KorisnickoIme + "\n\nOpis: " + data[i].Komentar.Opis + "\n\nOcena: " + data[i].Komentar.Ocena + "\nDatum: " + data[i].Komentar.DatumObjave + "</textarea ></td >");
                        }

                        s += ("<td>" + vratiStatusVoznje(data[i].StatusVoznje) + "</td> <td>");

                        if (vratiStatusVoznje(data[i].StatusVoznje) == "Kreirana") {
                            s += (`<input type="button" value="Obradi" id="obradi" class="obradibtn" name=${data[i].IdVoznje} /><br /><br />`);
                        } else {
                            s += ("Nedostupne");
                        }
                        s += (`</td></tr>`);
                    }
                }

                s += '</table>';
                $('#glavni2').html(s);
            }
        })
        $('#glavni2').fadeIn(500);
    })


    //dodaj vozaca iz dispecera (NIJE DUGME)
    $('#novVozac').click(function () {
        $('#glavni2').hide();

        let s = '';

        s += '<div id="dodavanjeVozaca">';
        s += '  <table class="w3-small">';
        s += '      <tr><th>Korisničko ime:</th><td><input type="text" name="KorisnickoImeVDodaj" id="KorisnickoImeVDodaj" style="margin:5px" /></td></tr>';
        s += '      <tr><th>Lozinka:</th><td><input type="text" name="LozinkaVDodaj" id="LozinkaVDodaj" style="margin:5px" /></td></tr>';
        s += '      <tr><th>Ime:</th><td><input type="text" name="ImeVDodaj" id="ImeVDodaj" style="margin:5px" /></td></tr>';
        s += '      <tr><th>Prezime:</th><td><input type="text" name="PrezimeVDodaj" id="PrezimeVDodaj" style="margin:5px" /></td></tr>';
        s += '     <tr><th>JMBG:</th><td><input type="text" name="JMBGVDodaj" id="JMBGVDodaj" style="margin:5px" /></td></tr>';
        s += '      <tr><th>Pol:</th><td><label>Muški:&nbsp&nbsp</label><input type="radio" name="PolVDodaj" value="Muski" id="Pol1VDodaj" checked/><label>&nbsp&nbspŽenski:&nbsp&nbsp</label><input type="radio" value="Zenski" name="PolVDodaj" id="Pol2VDodaj" /></td></tr>';
        s += '      <tr><th>Kontakt Telefon:</th><td><input type="text" name="KontaktTelefonVDodaj" id="KontaktTelefonVDodaj" style="margin:5px" /></td></tr>';
        s += '      <tr><th>Email:</th><td><input type="email" name="EmailVDodaj" id="EmailVDodaj" style="margin:5px" /></td></tr>';
        s += '      <tr><th>Lokacija X:</th><td><input type="text" name="LokacijaXVDodaj" id="LokacijaXVDodaj" style="margin:5px" /></td></tr>';
        s += '      <tr><th>Lokacija Y:</th><td><input type="text" name="LokacijaYVDodaj" id="LokacijaYVDodaj" style="margin:5px" /></td></tr>';
        s += '      <tr><th>Ulica i broj:</th><td><input type="text" name="UlicaBrojVDodaj" id="UlicaBrojVDodaj" style="margin:5px" /></td></tr>';
        s += '      <tr><th>Naseljeno mesto:</th><td><input type="text" name="NaseljenoMestoVDodaj" id="NaseljenoMestoVDodaj" style="margin:5px" /></td></tr>';
        s += '      <tr><th>Pozivni broj:</th><td><input type="text" name="PozivniBrojVDodaj" id="PozivniBrojVDodaj" style="margin:5px" /></td></tr>';
        s += '      <tr><th>Godište automobila:</th><td><input type="text" name="GodisteAutomobilaVDodaj" id="GodisteAutomobilaVDodaj" style="margin:5px" /></td></tr>';
        s += '      <tr><th>Registarske oznake:</th><td><input type="text" name="BrojRegistarskeOznakeVDodaj" id="BrojRegistarskeOznakeVDodaj" style="margin:5px" /></td></tr>';
        s += '      <tr><th>Taxi broj:</th><td><input type="text" name="BrojTaksiVozilaVDodaj" id="BrojTaksiVozilaVDodaj" style="margin:5px" /></td></tr>';
        s += '      <tr><th>Vrsta vozila:</th><td><label>Putnički:&nbsp&nbsp</label><input type="radio" name="TipAutomobilaVDodaj" value="Putnički" id="TipAutomobila1VDodaj" checked/><label>&nbsp&nbspKombi:&nbsp&nbsp</label><input type="radio" value="Kombi" name="TipAutomobilaVDodaj" id="TipAutomobila2VDodaj" /></td></tr>';
        s += '     <tr><td colspan="2"><hr /></td></tr>';
        s += '     <tr><td colspan="2" align="right"><b><input type="button" value="Dodaj" id="VDodaj" /></b></td></tr>';
        s += '  </table>';
        s += '</div>';

        $('#glavni2').html(s);
        $('#glavni2').fadeIn(500);
    })

    //dodaj vozaca (DUGME)

    $('#glavni2').on('click', '#VDodaj', function () {

        //prvo validacija

        let uspeh = "da";
        let korisnickoIme = `${$('#KorisnickoImeVDodaj').val()}`;
        let lozinka = `${$('#LozinkaVDodaj').val()}`;
        let ime = `${$('#ImeVDodaj').val()}`;
        let prezime = `${$('#PrezimeVDodaj').val()}`;
        let jmbg = `${$('#JMBGVDodaj').val()}`;
        let email = `${$('#EmailVDodaj').val()}`;
        let kontaktTelefon = `${$('#KontaktTelefonVDodaj').val()}`;
        let godisteAutomobila = `${$('#GodisteAutomobilaVDodaj').val()}`;
        let registarskeOznake = `${$('#BrojRegistarskeOznakeVDodaj').val()}`;
        let brojTaksiVozila = `${$('#BrojTaksiVozilaVDodaj').val()}`;


        if (korisnickoIme == "" || lozinka == "" || ime == "" || prezime == "" || jmbg == "" || kontaktTelefon == "" || godisteAutomobila == "" || registarskeOznake == "" || brojTaksiVozila == "") {
            alert("Sva polja su obavezna!");
            uspeh = "ne";
        } else {
            if (korisnickoIme.length < 3 || korisnickoIme.length > 15) {
                uspeh = "ne";
                $('#KorisnickoImeVDodaj').css('background-color', '#ff7556');
                $('#KorisnickoImeVDodaj').val("");
                $('#KorisnickoImeVDodaj').attr('placeholder', 'Mora 3-15 slova!');
            } else {
                $('#KorisnickoImeVDodaj').css('background-color', 'white');
                $('#KorisnickoImeVDodaj').attr('placeholder', '');
            }

            if (lozinka.length < 4 || lozinka.length > 15) {
                uspeh = "ne";
                $('#LozinkaVDodaj').css('background-color', '#ff7556');
                $('#LozinkaVDodaj').val("");
                $('#LozinkaVDodaj').attr('placeholder', 'Mora 4-15 karaktera!');
            } else {
                $('#LozinkaVDodaj').css('background-color', 'white');
                $('#LozinkaVDodaj').attr('placeholder', '');
            }

            if (ime.length < 2 || ime.length > 15) {
                uspeh = "ne";
                $('#ImeVDodaj').css('background-color', '#ff7556');
                $('#ImeVDodaj').val("");
                $('#ImeVDodaj').attr('placeholder', 'Mora 2-15 slova!');
            } else {
                $('#ImeVDodaj').css('background-color', 'white');
                $('#ImeVDodaj').attr('placeholder', '');
            }

            if (prezime.length < 3 || prezime.length > 15) {
                uspeh = "ne";
                $('#PrezimeVDodaj').css('background-color', '#ff7556');
                $('#PrezimeVDodaj').val("");
                $('#PrezimeVDodaj').attr('placeholder', 'Mora 3-15 slova!');
            } else {
                $('#PrezimeVDodaj').css('background-color', 'white');
                $('#PrezimeVDodaj').attr('placeholder', '');
            }

            if (jmbg.length != 13) {
                uspeh = "ne";
                $('#JMBGVDodaj').css('background-color', '#ff7556');
                $('#JMBGVDodaj').val("");
                $('#JMBGVDodaj').attr('placeholder', 'Tačno 13 brojeva!');
            } else {
                if (isNaN(kontaktTelefon)) {
                    uspeh = "ne";
                    $('#JMBGVDodaj').css('background-color', '#ff7556');
                    $('#JMBGVDodaj').val("");
                    $('#JMBGVDodaj').attr('placeholder', 'Samo brojevi!');
                } else {
                    $('#JMBGVDodaj').css('background-color', 'white');
                    $('#JMBGVDodaj').attr('placeholder', '');
                }
            }

            if (kontaktTelefon.length < 6 || kontaktTelefon.length > 7) {
                uspeh = "ne";
                $('#KontaktTelefonVDodaj').css('background-color', '#ff7556');
                $('#KontaktTelefonVDodaj').val("");
                $('#KontaktTelefonVDodaj').attr('placeholder', 'Mora 6-7 brojeva!');
            } else {
                if (isNaN(kontaktTelefon)) {
                    uspeh = "ne";
                    $('#KontaktTelefonVDodaj').css('background-color', '#ff7556');
                    $('#KontaktTelefonVDodaj').val("");
                    $('#KontaktTelefonVDodaj').attr('placeholder', 'Samo brojevi!');
                } else {
                    $('#KontaktTelefonVDodaj').css('background-color', 'white');
                    $('#KontaktTelefonVDodaj').attr('placeholder', '');
                }
            }

            if (email.length < 6) {
                uspeh = "ne";
                $('#EmailVDodaj').css('background-color', '#ff7556');
                $('#EmailVDodaj').val("");
                $('#EmailVDodaj').attr('placeholder', 'Mora minimum 6 karaktera!');
            } else {
                let patern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);

                if (patern.test($("#EmailVDodaj").val())) {
                    $('#EmailVDodaj').css('background-color', 'white');
                    $('#EmailVDodaj').attr('placeholder', '');
                } else {
                    uspeh = "ne";
                    $('#EmailVDodaj').css('background-color', '#ff7556');
                    $('#EmailVDodaj').val("");
                    $('#EmailVDodaj').attr('placeholder', 'Nevalidna email adresa!');
                }
            }

            if (godisteAutomobila.length != 2 && godisteAutomobila.length != 4) {
                uspeh = "ne";
                $('#GodisteAutomobilaVDodaj').css('background-color', '#ff7556');
                $('#GodisteAutomobilaVDodaj').val("");
                $('#GodisteAutomobilaVDodaj').attr('placeholder', '2 ili 4 broja!');
            } else {
                $('#GodisteAutomobilaVDodaj').css('background-color', 'white');
                $('#GodisteAutomobilaVDodaj').attr('placeholder', '');
            }

            if (registarskeOznake.length < 9) {
                uspeh = "ne";
                $('#BrojRegistarskeOznakeVDodaj').css('background-color', '#ff7556');
                $('#BrojRegistarskeOznakeVDodaj').val("");
                $('#BrojRegistarskeOznakeVDodaj').attr('placeholder', 'Nevalidne tablice!');
            } else {
                let patern = new RegExp(/NS[-/_0-9]{4,9}TX$/i);
                if (patern.test($("#BrojRegistarskeOznakeVDodaj").val())) {
                    $('#BrojRegistarskeOznakeVDodaj').css('background-color', 'white');
                    $('#BrojRegistarskeOznakeVDodaj').attr('placeholder', '');
                } else {
                    uspeh = "ne";
                    $('#BrojRegistarskeOznakeVDodaj').css('background-color', '#ff7556');
                    $('#BrojRegistarskeOznakeVDodaj').val("");
                    $('#BrojRegistarskeOznakeVDodaj').attr('placeholder', 'Nevalidne tablice!');
                }

            }

            if (brojTaksiVozila.length < 3 || brojTaksiVozila.length > 5) {
                uspeh = "ne";
                $('#BrojTaksiVozilaVDodaj').css('background-color', '#ff7556');
                $('#BrojTaksiVozilaVDodaj').val("");
                $('#BrojTaksiVozilaVDodaj').attr('placeholder', 'Mora 3-5 brojeva!');
            } else {
                if (isNaN(brojTaksiVozila)) {
                    uspeh = "ne";
                    $('#BrojTaksiVozilaVDodaj').css('background-color', '#ff7556');
                    $('#BrojTaksiVozilaVDodaj').val("");
                    $('#BrojTaksiVozilaVDodaj').attr('placeholder', 'Samo brojevi!');
                } else {
                    let usao = "ne";
                    $.ajax({
                        type: 'GET',
                        url: '/api/Vozac',
                        //data: JSON.stringify(NovVozac),
                        contentType: 'application/json;charset=utf-8',
                        dataType: 'json',
                        success: function (data) {
                            for (var i = 0; i < data.length; i++) {
                                if (data[i].Automobil.BrojTaksiVozila == brojTaksiVozila) {
                                    $('#BrojTaksiVozilaVDodaj').css('background-color', '#ff7556');
                                    alert("Broj taksi vozila koje ste uneli već postoji!");
                                    uspeh = "ne";
                                    usao = "da";
                                    break;
                                }
                            }

                            if (usao == "ne") {
                                $('#BrojTaksiVozilaVDodaj').css('background-color', 'white');
                                $('#BrojTaksiVozilaVDodaj').attr('placeholder', '');
                            }
                        }
                    })
                }
            }

            if (uspeh == "da") {

                let pol;
                if ($('#Pol1VDodaj').prop('checked')) {
                    pol = 'Muski';
                } else if ($('#Pol2VDodaj').prop('checked')) {
                    pol = 'Zenski';
                }
                let tipAutomobila;
                if ($('#TipAutomobila1VDodaj').prop('checked')) {
                    tipAutomobila = 'Putnicki';
                } else if ($('#TipAutomobila2VDodaj').prop('checked')) {
                    tipAutomobila = 'Kombi';
                }

                let adresa = {
                    UlicaBroj: `${$('#UlicaBrojVDodaj').val()}`,
                    NaseljenoMesto: `${$('#NaseljenoMestoVDodaj').val()}`,
                    PozivniBroj: `${$('#PozivniBrojVDodaj').val()}`
                }

                let lokacija = {
                    X: `${$('#LokacijaXVDodaj').val()}`,
                    Y: `${$('#LokacijaYVDodaj').val()}`,
                    Adresa: adresa
                }
                let automobil = {
                    IdVozaca: "",
                    GodisteAutomobila: `${$('#GodisteAutomobilaVDodaj').val()}`,
                    BrojRegistarskeOznake: `${$('#BrojRegistarskeOznakeVDodaj').val()}`,
                    BrojTaksiVozila: `${$('#BrojTaksiVozilaVDodaj').val()}`,
                    TipAutomobila: tipAutomobila
                }
                let NovVozac = {
                    Id: "",
                    KorisnickoIme: `${$('#KorisnickoImeVDodaj').val()}`,
                    Lozinka: `${$('#LozinkaVDodaj').val()}`,
                    Ime: `${$('#ImeVDodaj').val()}`,
                    Prezime: `${$('#PrezimeVDodaj').val()}`,
                    Pol: pol,
                    JMBG: `${$('#JMBGVDodaj').val()}`,
                    KontaktTelefon: `${$('#KontaktTelefonVDodaj').val()}`,
                    Email: `${$('#EmailVDodaj').val()}`,
                    Uloga: `${'Vozac'}`,
                    Voznje: `${'nema'}`,
                    Banovan: `${"NE"}`,
                    Lokacija: lokacija,
                    Automobil: automobil
                };

                $.ajax({
                    type: 'POST',
                    url: '/api/Vozac',
                    data: JSON.stringify(NovVozac),
                    contentType: 'application/json;charset=utf-8',
                    dataType: 'json',
                    success: function (data) {
                        if (!data) {
                            $('#KorisnickoImeVDodaj').css('background-color', '#ff7556');
                            alert("Korisničko ime koje ste uneli već postoji!");
                        } else {
                            $('#KorisnickoImeVDodaj').css('background-color', 'white');
                            alert("Uspešno ste dodali novog vozača!");
                        }
                    }
                })
            }
        }
    })
            //KRAJ DODAVANJA VOZACA




    //KLIK NA DUGME OBRADI U TABELI
    $(document).on('click', '.obradibtn', function () {
        let idVoznje = $(this).prop('name');
        idVoznja = idVoznje;
        $.ajax({
            type: 'GET',
            url: '/api/Voznja/' + idVoznja,
            // data: JSON.stringify(KomentarOtkazaneVoznja),
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (data) {
                $.ajax({
                    type: 'GET',
                    url: '/api/Vozac',
                    // data: JSON.stringify(KomentarOtkazaneVoznja),
                    contentType: 'application/json;charset=utf-8',
                    dataType: 'json',
                    success: function (dataV) {
                        if (dataV.length > 0) {
                            let s = '';
                            let usao = "ne";
                            s += `<div style="position:absolute;"><h3>Moguć izbor vozača:</h3><br>Vozacev username: <select name="biloKo" id="biloKo">`;
                            for (var i = 0; i < dataV.length; i++) {
                                if (dataV[i].Zauzet == "NE") {
                                    if (data.Automobil == 2) {
                                        s += `<option value=${dataV[i].KorisnickoIme}>${dataV[i].KorisnickoIme}</option>`;
                                        usao = "da";
                                    } else if (data.Automobil == dataV[i].Automobil.TipAutomobila) {
                                        s += `<option value=${dataV[i].KorisnickoIme}>${dataV[i].KorisnickoIme}</option>`;
                                        usao = "da";
                                    }
                                }
                            }
                            if (usao == "da") {
                                s += '<input type="button" name="dodeli" id="dodeli" value="Dodeli"/></div>';
                                $('#glavni2').hide();
                                $('#glavni2').html(s);
                                $('#glavni2').fadeIn(500);

                            } else {
                                s = '';
                                alert("Nemamo odgovarajućeg vozača!");
                                $(location).attr('href', 'main.html');
                            }
                        } else {
                            alert("Nema vozača u sistemu!");
                            $(location).attr('href', 'main.html');
                        }
                    }
                })
            }
        })
    })

    $('#glavni2').on('click', '#dodeli', function () {
        let odabranVozac = $('#biloKo').prop('value');

        //sledi update vozaca na zauzet
        $.ajax({
            type: 'GET',
            url: '/api/Vozac',
            data: { KorisnickoIme: `${odabranVozac}` },
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (dataV) {
                let VozacAdresaMenjamStanje = {
                    UlicaBroj: `${dataV.Lokacija.Adresa.UlicaBroj}`,
                    NaseljenoMesto: `${dataV.Lokacija.Adresa.NaseljenoMesto}`,
                    PozivniBroj: `${dataV.Lokacija.Adresa.PozivniBroj}`
                }

                let VozacLokacijaMenjamStanje = {
                    X: `${dataV.Lokacija.X}`,
                    Y: `${dataV.Lokacija.Y}`,
                    Adresa: VozacAdresaMenjamStanje
                }

                let Auto = {
                    IdVozaca: `${dataV.Automobil.IdVozaca}`,
                    GodisteAutomobila: `${dataV.Automobil.GodisteAutomobila}`,
                    BrojRegistarskeOznake: `${dataV.Automobil.BrojRegistarskeOznake}`,
                    BrojTaksiVozila: `${dataV.Automobil.BrojTaksiVozila}`,
                    TipAutomobila: `${dataV.Automobil.TipAutomobila}`
                }

                let NovoStanjeVozac = {
                    Id: `${dataV.Id}`,
                    KorisnickoIme: `${dataV.KorisnickoIme}`,
                    Lozinka: `${dataV.Lozinka}`,
                    Ime: `${dataV.Ime}`,
                    Prezime: `${dataV.Prezime}`,
                    Pol: `${dataV.Pol}`,
                    JMBG: `${dataV.JMBG}`,
                    KontaktTelefon: `${dataV.KontaktTelefon}`,
                    Email: `${dataV.Email}`,
                    Uloga: `${dataV.Uloga}`,
                    Voznje: `${dataV.Voznje}`,
                    Banovan: `${"NE"}`,
                    Lokacija: VozacLokacijaMenjamStanje,
                    Automobil: Auto,
                    Zauzet: "DA"
                }


                $.ajax({
                    type: 'PUT',
                    url: '/api/Vozac/' + dataV.Id,
                    data: JSON.stringify(NovoStanjeVozac),
                    contentType: 'application/json;charset=utf-8',
                    dataType: 'json',
                    success: function (data) {
                        if (data) {

                            $.ajax({
                                type: 'GET',
                                url: '/api/Voznja/' + idVoznja,
                                // data: JSON.stringify(KomentarOtkazaneVoznja),
                                contentType: 'application/json;charset=utf-8',
                                dataType: 'json',
                                success: function (data) {

                                    let addr = {
                                        UlicaBroj: `${data.Lokacija.Adresa.UlicaBroj}`,
                                        NaseljenoMesto: `${data.Lokacija.Adresa.NaseljenoMesto}`,
                                        PozivniBroj: `${data.Lokacija.Adresa.PozivniBroj}`
                                    }

                                    let lok = {
                                        X: `${data.Lokacija.X}`,
                                        Y: `${data.Lokacija.Y}`,
                                        Adresa: addr
                                    }

                                    let addr2 = {
                                        UlicaBroj: `${data.Odrediste.Adresa.UlicaBroj}`,
                                        NaseljenoMesto: `${data.Odrediste.Adresa.NaseljenoMesto}`,
                                        PozivniBroj: `${data.Odrediste.Adresa.PozivniBroj}`
                                    }

                                    let lok2 = {
                                        X: `${data.Odrediste.X}`,
                                        Y: `${data.Odrediste.Y}`,
                                        Adresa: addr2
                                    }

                                    let kom = {
                                        Opis: `${data.Komentar.Opis}`,
                                        DatumObjave: `${data.Komentar.DatumObjave}`,
                                        IdVoznje: `${data.Komentar.IdVoznje}`,
                                        KorisnickoIme: `${data.Komentar.KorisnickoIme}`,
                                        Ocena: `${data.Komentar.Ocena}`
                                    }

                                    let VoznjaNakonObrade = {
                                        IdVoznje: idVoznja,
                                        DatumVreme: `${data.DatumVreme}`,
                                        Lokacija: lok,
                                        Automobil: `${data.TipAutomobila}`,
                                        Musterija: `${data.Musterija}`,
                                        Odrediste: lok2,
                                        Dispecer: `${localStorage.getItem("Ulogovan")}`,
                                        Vozac: `${dataV.KorisnickoIme}`,
                                        Iznos: `${data.Iznos}`,
                                        Komentar: kom,
                                        StatusVoznje: 2//jer pri obradi voznja postaje obradjena
                                    }

                                    //update voznje
                                    $.ajax({
                                        type: 'PUT',
                                        url: '/api/Voznja/' + idVoznja,//idVoznja je lokalna koja mi cuva samo id voznje izmedju klika na otkazi i klika na dodaj komentar
                                        data: JSON.stringify(VoznjaNakonObrade),
                                        contentType: 'application/json;charset=utf-8',
                                        dataType: 'json',
                                        success: function () {
                                            alert("Uspešno ste obradili vožnju!");
                                            $(location).attr('href', 'main.html');
                                        }
                                    })

                                }
                            })
                        }
                    }
                })
            }
        })

    })





    //KRAJ KLIK NA DUGME OBRADI U TABELI




    //KLIK NA LINK DODAJ NOVU VOZNJU (DISPECERRRRR)
    $('#nV').click(function () {
        $('#glavni2').hide();

        let s = '';
        s += '<div id="divNovaVoznjaDispecer" >';
        s += '  <table style="position:absolute;margin-left:3%;margin-top:3%;">';
        s += '     <tr ><th colspan="2">Unesite podatke o novoj vožnji:</th></tr>';
        s += '    <tr ><td colsapn="2"><hr /></td></tr>';
        s += '    <tr><td >Koordinata X:</td><td><input type="text" style="margin:5px;" name="korisnikLokacijaXDispecer" id="korisnikLokacijaXDispecer" /></td></tr';
        s += '    <tr><td>Koordinata Y:</td><td><input type="text" style="margin:5px;" name="korisnikLokacijaYDispecer" id="korisnikLokacijaYDispecer" /></td></tr>';
        s += '    <tr><td>Ulica i broj:</td><td><input type="text" style="margin:5px;" name="korisnikUlicaBrojDispecer" id="korisnikUlicaBrojDispecer" /></td></tr>';
        s += '     <tr><td>Naseljeno mesto:</td><td><input type="text" style="margin:5px;" name="korisnikNaseljenoMestoDispecer" id="korisnikNaseljenoMestoDispecer" /></td></tr>';
        s += '     <tr><td>Pozivni broj:</td><td><input type="text" style="margin:5px;" name="korisnikPozivniBrojDispecer" id="korisnikPozivniBrojDispecer" /></td></tr>';
        s += '     <tr><td>Željeni tip automobila:</td><td><label>&nbspPutnički:&nbsp&nbsp</label><input type="radio" style="margin:5px;" name="korisnikTipAutaDispecer" value="Putnicki" id="korisnikTipAutaDispecer1" /><label>&nbsp&nbspKombi:&nbsp&nbsp</label><input type="radio" value="Kombi" style="margin:5px;" name="korisnikTipAutaDispecer" id="korisnikTipAutaDispecer2" /></td></tr>';
        s += '     <tr><td colspan="2" align="right"><input type="button" style="margin:5px;" name="DodajVozacaDispecer" id="DodajVozacaDispecer" value="Dodaj vozača" /></td></tr>';
        s += ' </table>';
        s += ' </div>';

        $('#glavni2').html(s);

        $('#glavni2').fadeIn(500);
    })

    $('#glavni2').on('click', '#DodajVozacaDispecer', function () {
        $('#DodajVozacaDispecer').hide();

        let s = '';
        s += `<div style="position:absolute;display:inline-block;margin-left:3%;margin-top:390px;"><h3>Moguć izbor vozača:</h3><br>Korisničko ime vozača: <select name="slobodniV" id="slobodniV">`;
        let usao = "ne";

        let tip;
        if ($('#korisnikTipAutaDispecer1').prop('checked')) {
            tip = 'Putnicki';
        } else if ($('#korisnikTipAutaDispecer2').prop('checked')) {
            tip = 'Kombi';
        } else {
            tip = 'Svejedno';
        }

        $.ajax({
            type: 'GET',
            url: '/api/Vozac',
            // data: JSON.stringify(KomentarOtkazaneVoznja),
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (data) {
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].Zauzet == "NE") {
                            if (tip == "Svejedno") {
                                s += `<option value=${data[i].KorisnickoIme}>${data[i].KorisnickoIme}</option>`;
                                usao = "da";
                            } else if (tip == vratiVozilo(data[i].Automobil.TipAutomobila)) {
                                s += `<option value=${data[i].KorisnickoIme}>${data[i].KorisnickoIme}</option>`;
                                usao = "da";
                            }
                        }
                    }
                    if (usao == "da") {
                        s += '</select>';
                        s += '     <input type="button" style="margin:5px;" name="DodajVoznjuDispecer" id="DodajVoznjuDispecer" value="Dodaj" /></div>';

                        $('#glavni2').append(s);
                        $('#glavni2').fadeIn(500);
                    } else {
                        alert("Nema odgovarajućeg vozača!");
                        $(location).attr('href', 'main.html');
                    }
                } else {
                    alert("Nema vozača u sistemu!");
                    $(location).attr('href', 'main.html');
                }
            }
        })
    })

    $('#glavni2').on('click', '#DodajVoznjuDispecer', function () {
        let odabranVozac = $('#slobodniV').prop('value');


        let tipAutomobila;

        if ($('#korisnikTipAutaDispecer1').prop('checked')) {
            tipAutomobila = 'Putnicki';
        } else if ($('#korisnikTipAutaDispecer2').prop('checked')) {
            tipAutomobila = 'Kombi';
        } else {
            tipAutomobila = 'Svejedno';
        }
        $.ajax({
            type: 'GET',
            url: '/api/Vozac',
            data: { KorisnickoIme: `${odabranVozac}` },
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (dataV) {

                let VozacAdresaMenjamStanje = {
                    UlicaBroj: `${dataV.Lokacija.Adresa.UlicaBroj}`,
                    NaseljenoMesto: `${dataV.Lokacija.Adresa.NaseljenoMesto}`,
                    PozivniBroj: `${dataV.Lokacija.Adresa.PozivniBroj}`
                }

                let VozacLokacijaMenjamStanje = {
                    X: `${dataV.Lokacija.X}`,
                    Y: `${dataV.Lokacija.Y}`,
                    Adresa: VozacAdresaMenjamStanje
                }

                let Auto = {
                    IdVozaca: `${dataV.Automobil.IdVozaca}`,
                    GodisteAutomobila: `${dataV.Automobil.GodisteAutomobila}`,
                    BrojRegistarskeOznake: `${dataV.Automobil.BrojRegistarskeOznake}`,
                    BrojTaksiVozila: `${dataV.Automobil.BrojTaksiVozila}`,
                    TipAutomobila: `${dataV.Automobil.TipAutomobila}`
                }

                let NovoStanjeVozac = {
                    Id: `${dataV.Id}`,
                    KorisnickoIme: `${dataV.KorisnickoIme}`,
                    Lozinka: `${dataV.Lozinka}`,
                    Ime: `${dataV.Ime}`,
                    Prezime: `${dataV.Prezime}`,
                    Pol: `${dataV.Pol}`,
                    JMBG: `${dataV.JMBG}`,
                    KontaktTelefon: `${dataV.KontaktTelefon}`,
                    Email: `${dataV.Email}`,
                    Uloga: `${dataV.Uloga}`,
                    Voznje: `${dataV.Voznje}`,
                    Banovan: `${"NE"}`,
                    Lokacija: VozacLokacijaMenjamStanje,
                    Automobil: Auto,
                    Zauzet: "DA"//jer mu je upravo voznja dodeljena od strane dispecera
                }

                $.ajax({
                    type: 'PUT',
                    url: '/api/Vozac/' + dataV.Id,
                    data: JSON.stringify(NovoStanjeVozac),
                    contentType: 'application/json;charset=utf-8',
                    dataType: 'json',
                    success: function (data) {
                        if (data) {

                            let AdresaKorisnikDodajeVoznju = {
                                UlicaBroj: `${$('#korisnikUlicaBrojDispecer').val()}`,
                                NaseljenoMesto: `${$('#korisnikNaseljenoMestoDispecer').val()}`,
                                PozivniBroj: `${$('#korisnikPozivniBrojDispecer').val()}`
                            }

                            let LokacijaKorisnikDodajeVoznju = {
                                X: `${$('#korisnikLokacijaXDispecer').val()}`,
                                Y: `${$('#korisnikLokacijaYDispecer').val()}`,
                                Adresa: AdresaKorisnikDodajeVoznju
                            }

                            let AdresaKorisnikDodajeVoznju2 = {
                                UlicaBroj: "",
                                NaseljenoMesto: "",
                                PozivniBroj: ""
                            }

                            let LokacijaKorisnikDodajeVoznju2 = {
                                X: "",
                                Y: "",
                                Adresa: AdresaKorisnikDodajeVoznju2
                            }

                            let komentar = {
                                Opis: "",
                                DatumObjave: "",
                                KorisnickoIme: "",
                                IdVoznje: "",
                                Ocena: ""
                            }

                            let NovaVoznjaDispecera = {
                                IdVoznje: "",
                                DatumVreme: "",
                                Lokacija: LokacijaKorisnikDodajeVoznju,
                                Automobil: tipAutomobila,
                                Musterija: "",
                                Odrediste: LokacijaKorisnikDodajeVoznju2,
                                Dispecer: `${localStorage.getItem("Ulogovan")}`,
                                Vozac: dataV.KorisnickoIme,
                                Iznos: "",
                                Komentar: komentar,
                                StatusVoznje: 1 //status voznje je formirana
                            }

                            $.ajax({
                                type: 'POST',
                                url: '/api/Voznja',
                                data: JSON.stringify(NovaVoznjaDispecera),
                                contentType: 'application/json;charset=utf-8',
                                dataType: 'json',
                                success: function (data) {
                                    if (data) {
                                        alert("Vožnja uspešno kreirana!");
                                        $(location).attr('href', 'main.html');
                                    }
                                }
                            })
                        }
                    }
                })
            }
        })
    })

})

function vratiVozilo(id) {
    switch (id) {
        case 0: return "Putnicki";
        case 1: return "Kombi";
        case 2: return "Svejedno";
    }
}
