﻿$(document).ready(function () {
    $('#profild').click(function () {
        $('#map1').hide();
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
        $('#map1').hide();

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
                s += '<tr><th colspan="2" align="center" style="margin:5px" ><h2>Forma za izmenu</h2></th></tr>';
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
        $('#map1').hide();
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
                        s += ("<tr><td>" + data[i].IdVoznje + "</td><td>");

                        var currentdate = new Date(Date.parse(data[i].DatumVreme));
                        var datum = currentdate.getFullYear() + "/" + ("0" + (currentdate.getMonth() + 1)).slice(-2) + "/" + ("0" + currentdate.getDate()).slice(-2);
                        var vreme = ("0" + currentdate.getHours()).slice(-2) + ":" + ("0" + currentdate.getMinutes()).slice(-2);

                        s += ("" + datum + " " + vreme + "</td>");
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
            },
            error: function (ret1) {
                alert("Greska: " + ret1.responseText);
            }
        })
        $('#glavni2').fadeIn(500);
    })


    $('#sve').click(function () {
        $('#glavni2').hide();
        $('#map1').hide();
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
                    s += ("<tr><td>" + data[i].IdVoznje + "</td><td>");

                    var currentdate = new Date(Date.parse(data[i].DatumVreme));
                    var datum = currentdate.getFullYear() + "/" + ("0" + (currentdate.getMonth() + 1)).slice(-2) + "/" + ("0" + currentdate.getDate()).slice(-2);
                    var vreme = ("0" + currentdate.getHours()).slice(-2) + ":" + ("0" + currentdate.getMinutes()).slice(-2);

                    s += ("" + datum + " " + vreme + "</td>");

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
            },
            error: function (ret1) {
                alert("Greska: " + ret1.responseText);
            }
        })
        $('#glavni2').fadeIn(500);
    })


    $('#nacekanju').click(function () {
        $('#glavni2').hide();
        $('#map1').hide();
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
                        s += ("<tr><td>" + data[i].IdVoznje + "</td><td>");

                        var currentdate = new Date(Date.parse(data[i].DatumVreme));
                        var datum = currentdate.getFullYear() + "/" + ("0" + (currentdate.getMonth() + 1)).slice(-2) + "/" + ("0" + currentdate.getDate()).slice(-2);
                        var vreme = ("0" + currentdate.getHours()).slice(-2) + ":" + ("0" + currentdate.getMinutes()).slice(-2);

                        s += ("" + datum + " " + vreme + "</td>");

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
            },
            error: function (ret1) {
                alert("Greska: " + ret1.responseText);
            }
        })
        $('#glavni2').fadeIn(500);
    })


    //dodaj vozaca iz dispecera (NIJE DUGME)
    $('#novVozac').click(function () {
        $('#glavni2').hide();
        $('#map1').hide();

        let s = '';

        s += '<div id="dodavanjeVozaca">';
        s += '  <table class="w3-small">';
        s += '<tr><th colspan="2" align="center" style="margin:5px" ><h3>Forma za dodavanje vozača</h3></th></tr>';
        s += '      <tr><th>Korisničko ime:</th><td><input type="text" name="KorisnickoImeVDodaj" id="KorisnickoImeVDodaj" style="margin:5px" /></td></tr>';
        s += '      <tr><th>Lozinka:</th><td><input type="text" name="LozinkaVDodaj" id="LozinkaVDodaj" style="margin:5px" /></td></tr>';
        s += '      <tr><th>Ime:</th><td><input type="text" name="ImeVDodaj" id="ImeVDodaj" style="margin:5px" /></td></tr>';
        s += '      <tr><th>Prezime:</th><td><input type="text" name="PrezimeVDodaj" id="PrezimeVDodaj" style="margin:5px" /></td></tr>';
        s += '     <tr><th>JMBG:</th><td><input type="text" name="JMBGVDodaj" id="JMBGVDodaj" style="margin:5px" /></td></tr>';
        s += '      <tr><th>Pol:</th><td><label>Muški:&nbsp&nbsp</label><input type="radio" name="PolVDodaj" value="Muski" id="Pol1VDodaj" checked/><label>&nbsp&nbspŽenski:&nbsp&nbsp</label><input type="radio" value="Zenski" name="PolVDodaj" id="Pol2VDodaj" /></td></tr>';
        s += '      <tr><th>Kontakt Telefon:</th><td><input type="text" name="KontaktTelefonVDodaj" id="KontaktTelefonVDodaj" style="margin:5px" /></td></tr>';
        s += '      <tr><th>Email:</th><td><input type="email" name="EmailVDodaj" id="EmailVDodaj" style="margin:5px" /></td></tr>';
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

            if (brojTaksiVozila.length < 3 || brojTaksiVozila.length > 5 || isNaN(brojTaksiVozila)) {
                uspeh = "ne";
                $('#BrojTaksiVozilaVDodaj').css('background-color', '#ff7556');
                $('#BrojTaksiVozilaVDodaj').val("");
                $('#BrojTaksiVozilaVDodaj').attr('placeholder', 'Mora 3-5 brojeva!');
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
                                    UlicaBroj: "",
                                    NaseljenoMesto: "",
                                    PozivniBroj: ""
                                }

                                let lokacija = {
                                    X: "",
                                    Y: "",
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
                                    Voznje: "",
                                    Zauzet: `${"NE"}`,
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
            }

            
        }
    })
    //KRAJ DODAVANJA VOZACA




    //KLIK NA DUGME OBRADI U TABELI
    $(document).on('click', '.obradibtn', function () {
        let idVoznje = $(this).prop('name');
        idVoznja = idVoznje;
        let rastojanja;
        let odgovarajuci = [];
        let petNajblizih = [];

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
                            s += `<div style="position:absolute;margin-left:50px;margin-top:3%;"><h3>Moguć izbor vozača:</h3><br>Korisničko ime vozača: <select name="biloKo" id="biloKo">`;
                            for (var i = 0; i < dataV.length; i++) {
                                if (dataV[i].Zauzet == "NE") {
                                    if (vratiVozilo(data.Automobil) == "Svejedno") {
                                        odgovarajuci.push(dataV[i]);
                                        // s += `<option value=${data[i].KorisnickoIme}>${data[i].KorisnickoIme}</option>`;
                                        usao = "da";
                                    } else if (vratiVozilo(data.Automobil) == vratiVozilo(dataV[i].Automobil.TipAutomobila)) {
                                        odgovarajuci.push(dataV[i]);
                                        //  s += `<option value=${data[i].KorisnickoIme}>${data[i].KorisnickoIme}</option>`;
                                        usao = "da";
                                    }
                                }
                            }

                            if (usao == "da") {
                                if (odgovarajuci.length > 5) {
                                    for (var i = 0; i < odgovarajuci.length; i++) {
                                        rastojanja = Math.sqrt(Math.pow(data.Lokacija.X - odgovarajuci[i].Lokacija.X, 2) + Math.pow(data.Lokacija.Y - odgovarajuci[i].Lokacija.Y, 2));

                                        let vozac = {
                                            Id: odgovarajuci[i].Id,
                                            Rastojanje: rastojanja
                                        }

                                        petNajblizih.push(vozac);
                                    }

                                    petNajblizih.sort(function (a, b) {
                                        return a.Rastojanje - b.Rastojanje;
                                    })

                                    for (var j = 0; j < 5; j++) {
                                        for (var i = 0; i < odgovarajuci.length; i++) {
                                            if (petNajblizih[j].Id == odgovarajuci[i].Id) {
                                                s += `<option value=${odgovarajuci[i].KorisnickoIme}>${odgovarajuci[i].KorisnickoIme}</option>`;
                                            }
                                        }
                                    }

                                } else {
                                    for (var i = 0; i < odgovarajuci.length; i++) {
                                        s += `<option value=${odgovarajuci[i].KorisnickoIme}>${odgovarajuci[i].KorisnickoIme}</option>`;
                                    }

                                }

                                s += '</select>';                                s += '<input type="button" name="dodeli" id="dodeli" value="Dodeli"/></div>';
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
            },
            error: function (ret1) {
                alert("Greska: " + ret1.responseText);
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
                    success: function (datav) {
                        if (datav) {

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

                                },
                                error: function (ret1) {
                                    alert("Greska: " + ret1.responseText);
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
        if ($("#kritican").parents("#map1").length == 1) {
            $("#kritican").remove();
        }
        if ($("#divNovaVoznjaDispecer").parents("#map1").length == 1) {
            $("#divNovaVoznjaDispecer").remove();
        }
        /*
        if (ima == "da") {
            $('#map1 div:last-child').remove();
        }*/
        

        let s = '';
        s += '<div id="divNovaVoznjaDispecer" >';
        s += '  <table style="position:absolute;margin-left:50px;margin-top:30px;">';
        //s += '     <tr ><th colspan="2">Unesite podatke o novoj vožnji:</th></tr>';
        //s += '    <tr ><td colsapn="2"><hr /></td></tr>';
        //s += '    <tr><td >Koordinata X:</td><td><input type="text" style="margin:5px;" name="korisnikLokacijaXDispecer" id="korisnikLokacijaXDispecer" /></td></tr';
        //s += '    <tr><td>Koordinata Y:</td><td><input type="text" style="margin:5px;" name="korisnikLokacijaYDispecer" id="korisnikLokacijaYDispecer" /></td></tr>';
        //s += '    <tr><td>Ulica i broj:</td><td><input type="text" style="margin:5px;" name="korisnikUlicaBrojDispecer" id="korisnikUlicaBrojDispecer" /></td></tr>';
        //s += '     <tr><td>Naseljeno mesto:</td><td><input type="text" style="margin:5px;" name="korisnikNaseljenoMestoDispecer" id="korisnikNaseljenoMestoDispecer" /></td></tr>';
        //s += '     <tr><td>Pozivni broj:</td><td><input type="text" style="margin:5px;" name="korisnikPozivniBrojDispecer" id="korisnikPozivniBrojDispecer" /></td></tr>';
        s += '     <tr><td>Željeni tip automobila:</td><td><label>&nbspPutnički:&nbsp&nbsp</label><input type="radio" style="margin:5px;" name="korisnikTipAutaDispecer" value="Putnicki" id="korisnikTipAutaDispecer1" /><label>&nbsp&nbspKombi:&nbsp&nbsp</label><input type="radio" value="Kombi" style="margin:5px;" name="korisnikTipAutaDispecer" id="korisnikTipAutaDispecer2" /></td></tr>';
        s += '     <tr><td colspan="2" align="right"><input type="button" style="margin:5px;" name="DodajVozacaDispecer" id="DodajVozacaDispecer" value="Dodaj vozača" /></td></tr>';
        s += ' </table>';
        s += ' </div>';

        $('#map1').append(s);

        $('#map1').fadeIn(500);
    })

    $('#map1').on('click', '#DodajVozacaDispecer', function () {

        let addr = KompletAdresa.split(',');

        if (addr[0] != "") {
            $('#DodajVozacaDispecer').hide();

            let odgovarajuci = [];
            let petNajblizih = [];
            let rastojanja;
            let addr = KompletAdresa.split(',');

            let s = '';
            s += `<div id="kritican" style="position:absolute;display:inline-block;margin-left:50px;margin-top:70px;"><h4>Moguć izbor vozača:</h4>Korisničko ime vozača: <select name="slobodniV" id="slobodniV">`;
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
                                    odgovarajuci.push(data[i]);
                                    // s += `<option value=${data[i].KorisnickoIme}>${data[i].KorisnickoIme}</option>`;
                                    usao = "da";
                                } else if (tip == vratiVozilo(data[i].Automobil.TipAutomobila)) {
                                    odgovarajuci.push(data[i]);
                                    //  s += `<option value=${data[i].KorisnickoIme}>${data[i].KorisnickoIme}</option>`;
                                    usao = "da";
                                }
                            }
                        }

                        if (usao == "da") {
                            if (odgovarajuci.length > 5) {
                                for (var i = 0; i < odgovarajuci.length; i++) {
                                    rastojanja = Math.sqrt(Math.pow(addr[0] - odgovarajuci[i].Lokacija.X, 2) + Math.pow(addr[1] - odgovarajuci[i].Lokacija.Y, 2));

                                    let vozac = {
                                        Id: odgovarajuci[i].Id,
                                        Rastojanje: rastojanja
                                    }

                                    petNajblizih.push(vozac);
                                }

                                petNajblizih.sort(function (a, b) {
                                    return a.Rastojanje - b.Rastojanje;
                                })




                                for (var j = 0; j < 5; j++) {
                                    for (var i = 0; i < odgovarajuci.length; i++) {
                                        if (petNajblizih[j].Id == odgovarajuci[i].Id) {
                                            s += `<option value=${odgovarajuci[i].KorisnickoIme}>${odgovarajuci[i].KorisnickoIme}</option>`;
                                        }
                                    }
                                }

                            } else {
                                for (var i = 0; i < odgovarajuci.length; i++) {
                                    s += `<option value=${odgovarajuci[i].KorisnickoIme}>${odgovarajuci[i].KorisnickoIme}</option>`;
                                }

                            }

                            s += '</select>';
                            s += '     <input type="button" style="margin:5px;" name="DodajVoznjuDispecer" id="DodajVoznjuDispecer" value="Dodaj" /></div>';

                            $('#map1').append(s);
                            $('#map1').fadeIn(500);
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
        } else {
            alert("Prvo odaberite lokaciju!");
        }
    })

    $('#map1').on('click', '#DodajVoznjuDispecer', function () {
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

                            let addr = KompletAdresa.split(',');

                            if (addr[0] != "") {

                                let AdresaKorisnikDodajeVoznju = {
                                    UlicaBroj: addr[2],
                                    NaseljenoMesto: addr[3],
                                    PozivniBroj: ""
                                }

                                let LokacijaKorisnikDodajeVoznju = {
                                    X: addr[0],
                                    Y: addr[1],
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
                                            $('#map1').hide();
                                            alert("Vožnja uspešno kreirana!");
                                            $(location).attr('href', 'main.html');
                                        }
                                    }
                                })
                            } else {
                                alert("Morate uneti lokaciju!");
                            }
                        }
                    }
                })
            }
        })
    })

    $('#clanovi').click(function () {
        $('#map1').hide();
        $.ajax({
        type: 'GET',
        url: '/api/Vozac',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
            success: function (dataV) {
                let s = '';
                s += '<div class="voznje" style="font-size:14px;position:absolute;margin-top:0px;">';
                s += '<table border=1 class="voznje boja" ><tr><th colspan="10" ><h3><b>Svi članovi (korisnici/vozači)</b></h3></th></tr>';
                s += '<tr><th>Korisničko ime</th><th>Uloga</th><th>Ime</th><th>Prezime</th><th>Opcije</th></tr>';


                for (let i = 0; i < dataV.length; i++) {
                    s += ("<tr><td>" + dataV[i].KorisnickoIme + "</td><td> Vozač </td><td>" + dataV[i].Ime + "</td><td>" + dataV[i].Prezime + '</td><td style="padding:5px;">');
                    if (dataV[i].Banovan == "DA") {
                        s += (`<input type="button" value="Odbanuj" id="odbanuj" class="odbbtn" name=${dataV[i].KorisnickoIme} /></td></tr>`);
                    } else {
                        s += (`<input type="button" value=" Banuj " id="banuj" class="banbtn" name=${dataV[i].KorisnickoIme} /></td></tr>`);

                    }

                }



            $.ajax({
                type: 'GET',
                url: '/api/Registration',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                success: function (data) {

                    for (let i = 0; i < data.length; i++) {
                        s += ("<tr><td>" + data[i].KorisnickoIme + "</td><td> Mušterija </td><td>" + data[i].Ime + "</td><td>" + data[i].Prezime + '</td><td style="padding:5px;">');
                        if (data[i].Banovan == "DA") {
                            s += (`<input type="button" value="Odbanuj" id="odbanuj" class="odbbtn" name=${data[i].KorisnickoIme} /></td></tr>`);
                        } else {
                            s += (`<input type="button" value=" Banuj " id="banuj" class="banbtn" name=${data[i].KorisnickoIme} /></td></tr>`);

                        }
         
                    }
                    s += '</table>';

                    $('#glavni2').html(s);
                    $('#glavni2').fadeIn(500);
                }
            })
        }
        })
    })

    $(document).on('click', '.odbbtn', function () {
        let korisnickoIme = $(this).prop('name');
        let nasao = "ne";
        let nadjen;

        $.ajax({
            type: 'GET',
            url: '/api/Vozac',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (dataV) {
                for (var i = 0; i < dataV.length; i++) {
                    if (korisnickoIme == dataV[i].KorisnickoIme) {
                        nasao = "da";
                        nadjen = dataV[i];
                        break;
                    }
                }

                if (nasao == "da") {
                    nadjen.Zauzet = "NE";
                    nadjen.Banovan = "NE";

                    $.ajax({
                        type: 'PUT',
                        url: '/api/Vozac/' + nadjen.Id,
                        data: JSON.stringify(nadjen),
                        contentType: 'application/json;charset=utf-8',
                        dataType: 'json',
                        success: function (data) {
                            if (data) {
                                alert("Vozač je uspešno odbanovan!");
                                $(location).attr('href', 'main.html');
                            }

                        }
                    })

                } else {
                    $.ajax({
                        type: 'GET',
                        url: '/api/Registration',
                        contentType: 'application/json;charset=utf-8',
                        dataType: 'json',
                        success: function (data) {
                            for (var i = 0; i < data.length; i++) {
                                if (korisnickoIme == data[i].KorisnickoIme) {
                                    nasao = "da";
                                    nadjen = data[i];
                                    break;
                                }
                            }

                            if (nasao == "da") {
                                nadjen.Banovan = "NE";

                                $.ajax({
                                    type: 'PUT',
                                    url: '/api/Registration/' + nadjen.Id,
                                    data: JSON.stringify(nadjen),
                                    contentType: 'application/json;charset=utf-8',
                                    dataType: 'json',
                                    success: function (data) {
                                        if (data) {
                                            alert("Mušterija je uspešno odbanovana!");
                                            $(location).attr('href', 'main.html');
                                        }

                                    }
                                })

                            }
                        }
                    })
                }
            }
        })

    })


    $(document).on('click', '.banbtn', function () {
        let korisnickoIme = $(this).prop('name');
        let nasao = "ne";
        let nadjen;

        $.ajax({
            type: 'GET',
            url: '/api/Vozac',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (dataV) {
                for (var i = 0; i < dataV.length; i++) {
                    if (korisnickoIme == dataV[i].KorisnickoIme) {
                        nasao = "da";
                        nadjen = dataV[i];
                        break;
                    }
                }

                if (nasao == "da") {
                    nadjen.Banovan = "DA";

                    $.ajax({
                        type: 'PUT',
                        url: '/api/Vozac/' + nadjen.Id,
                        data: JSON.stringify(nadjen),
                        contentType: 'application/json;charset=utf-8',
                        dataType: 'json',
                        success: function (data) {
                            if (data) {
                                alert("Vozač je uspešno banovan!");
                                $(location).attr('href', 'main.html');
                            }

                        }
                    })

                } else {
                    $.ajax({
                        type: 'GET',
                        url: '/api/Registration',
                        contentType: 'application/json;charset=utf-8',
                        dataType: 'json',
                        success: function (data) {
                            for (var i = 0; i < data.length; i++) {
                                if (korisnickoIme == data[i].KorisnickoIme) {
                                    nasao = "da";
                                    nadjen = data[i];
                                    break;
                                }
                            }

                            if (nasao == "da") {
                                nadjen.Zauzet = "NE";
                                nadjen.Banovan = "DA";

                                $.ajax({
                                    type: 'PUT',
                                    url: '/api/Registration/' + nadjen.Id,
                                    data: JSON.stringify(nadjen),
                                    contentType: 'application/json;charset=utf-8',
                                    dataType: 'json',
                                    success: function (data) {
                                        if (data) {
                                            alert("Mušterija je uspešno banovana!");
                                            $(location).attr('href', 'main.html');
                                        }

                                    }
                                })

                            }
                        }
                    })
                }
            }
        })

    })

    let pp;
    $('#razno').click(function () {
        $('#map1').hide();
        $.ajax({
            type: 'GET',
            url: '/api/Dispecer',

            data: { KorisnickoIme: `${localStorage.getItem("Ulogovan")}` },
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (data) {
                if (data.Banovan === "NE") {
                    let s = '';
                    pp = "da";

                    s += '<div style="position:relative;" ><table  style="position:absolute;margin-left:50%;margin-top:70px;margin-right:-50%;transform: translate(-50%, -50%);width:60%;"><tr><th colspan="4" ><h3>Ovde možete izvršiti pretragu vožnji</h3></th></tr>';
                    s += '<tr><td  data-balloon="Datum od kog želite pretragu!" data-balloon-pos="down" style="width:30%;"><input type="date" name="datumPretragaOdD" id="datumPretragaOdD" placeholder="Datum OD" style="margin:5px;width:80%;"/></td><td   style="width:30%;"><input type="number" min="0" max="5" name="ocenaPretragaOdD" id="ocenaPretragaOdD" placeholder="Ocena OD" style="margin:5px;width:80%;"/></td><td style="width:30%;"><input type="number" name="cenaPretragaOdD" id="cenaPretragaOdD" placeholder="Cena OD" style="margin:5px;width:80%;" min="0" max="40000"/></td><td rawspan="3"></td></tr>';
                    s += '<tr><td  data-balloon="Datum do kog želite pretragu!" data-balloon-pos="down" style="width:30%;"><input type="date" name="datumPretragaDoD" id="datumPretragaDoD" placeholder="Datum DO" style="margin:5px;width:80%;"/></td><td  style="width:30%;"><input type="number" min="0" max="5" name="ocenaPretragaDoD" id="ocenaPretragaDoD" placeholder="Ocena DO" style="margin:5px;width:80%;"/></td><td style="width:30%;"><input type="number" name="cenaPretragaDoD" id="cenaPretragaDoD" placeholder="Cena DO" style="margin:5px;width:80%;" min="0" max="40000"/></td><td data-balloon="Ne moraju biti popunjeni svi parametri!" data-balloon-pos="down"><input type="button" name="traziKorisnikD" id="traziKorisnikD" value="Traži"/></td></tr>';
                    s += '</table></div>';


                    $('#glavni2').hide();
                    $('#glavni2').html(s);
                    $('#glavni2').fadeIn(500);
                }
                else {
                    alert("Banovani ste sa ovog sajta!");
                    localStorage.setItem("Ulogovan", "");
                    $(location).attr('href', 'index.html');
                }
            }
        });
    });

    $('#glavni2').on('click', '#traziKorisnikD', function () {
        let s = '';
        s += '<div>';
        let niz = [];
        let niz2 = [];
        let niz3 = [];
        let nizSve = [];

        let datOd = `${$('#datumPretragaOdD').val()}`;
        let datDo = `${$('#datumPretragaDoD').val()}`;
        let ocenaOd = `${$('#ocenaPretragaOdD').val()}`;
        let ocenaDo = `${$('#ocenaPretragaDoD').val()}`;
        let cenaOd = `${$('#cenaPretragaOdD').val()}`;
        let cenaDo = `${$('#cenaPretragaDoD').val()}`;

        if (`${$('#datumPretragaOdD').val()}` === "" && `${$('#datumPretragaDoD').val()}` === "" && `${$('#ocenaPretragaOdD').val()}` === "" && `${$('#ocenaPretragaDoD').val()}` === "" && `${$('#cenaPretragaOdD').val()}` === "" && `${$('#cenaPretragaDoD').val()}` === "") {
            alert("Morate uneti bar 1 parametar po kome se vrši pretraga!");
        } else {
            if (`${$('#datumPretragaOdD').val()}` !== "" && `${$('#datumPretragaDoD').val()}` === "") {
                datOd = `${$('#datumPretragaOdD').val()}`;
                datDo = '2025-01-01';
            } else if (`${$('#datumPretragaOdD').val()}` === "" && `${$('#datumPretragaDoD').val()}` !== "") {
                datDo = `${$('#datumPretragaDoD').val()}`;
                datOd = '2010-01-01';
            }

            if (`${$('#ocenaPretragaOdD').val()}` !== "" && `${$('#ocenaPretragaDoD').val()}` === "") {
                ocenaOd = `${$('#ocenaPretragaOdD').val()}`;
                ocenaDo = '5';
            } else if (`${$('#ocenaPretragaOdD').val()}` === "" && `${$('#ocenaPretragaDoD').val()}` !== "") {
                ocenaDo = `${$('#ocenaPretragaDoD').val()}`;
                ocenaOd = '0';
            }

            if (`${$('#cenaPretragaOdD').val()}` !== "" && `${$('#cenaPretragaDoD').val()}` === "") {
                cenaOd = `${$('#cenaPretragaOdD').val()}`;
                cenaDo = '40000';
            } else if (`${$('#cenaPretragaOdD').val()}` === "" && `${$('#cenaPretragaDoD').val()}` !== "") {
                cenaDo = `${$('#cenaPretragaDoD').val()}`;
                cenaOd = '0';
            }

            $.ajax({
                type: 'GET',
                url: '/api/Voznja',
                //data: JSON.stringify(KomentarOtkazaneVoznja),
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                success: function (data) {
                    if (data.length > 0) {
                        for (var i = 0; i < data.length; i++) {
                                nizSve.push(data[i]);
                        }

                        if (nizSve.length !== 0) {
                            for (var j = 0; j < nizSve.length; j++) {

                                if (`${$('#datumPretragaOdD').val()}` === "" && `${$('#datumPretragaDoD').val()}` === "") {
                                    niz.push(nizSve[j]);
                                } else {
                                    if (new Date(datOd) <= new Date(nizSve[j].DatumVreme.substring(0, 10)) && new Date(datDo) >= new Date(nizSve[j].DatumVreme.substring(0, 10))) {
                                        niz.push(nizSve[j]);
                                    }
                                }
                            }

                            if (niz.length !== 0) {
                                for (var k = 0; k < niz.length; k++) {
                                    if (`${$('#ocenaPretragaOdD').val()}` === "" && `${$('#ocenaPretragaDoD').val()}` === "") {
                                        niz2.push(niz[k]);
                                    } else {
                                        if (niz[k].Komentar.Ocena !== "") {
                                            if (ocenaOd <= niz[k].Komentar.Ocena && ocenaDo >= niz[k].Komentar.Ocena) {
                                                niz2.push(niz[k]);
                                            }
                                        }
                                    }
                                }

                                if (niz2.length !== 0) {
                                    for (var l = 0; l < niz2.length; l++) {
                                        if (`${$('#cenaPretragaOdD').val()}` === "" && `${$('#cenaPretragaDoD').val()}` === "") {
                                            niz3.push(niz2[l]);
                                        } else {
                                            if (niz2[l].Iznos !== "") {
                                                if (cenaOd <= niz2[l].Iznos && cenaDo >= niz2[l].Iznos) {
                                                    niz3.push(niz2[l]);
                                                }
                                            }
                                        }
                                    }

                                    if (niz3.length > 0) {

                                        let s = '';
                                        s += '<div class="voznje" style="font-size:14px;position:absolute;margin-top:120px;">';
                                        s += '<table border=1 class="voznje boja"><tr><th colspan="10"><h3><b>Rezultat pretrage</b></h3></th></tr>';
                                        s += '<tr><th>Id vožnje</th><th>Datum</th><th>Mušterija</th><th>Vozač</th><th >Mesto polaska</th><th>Tip auta</th><th>Ordedište</th><th>Iznos</th><th>Komentar</th><th>Status vožnje</th></tr>';


                                        for (let i = 0; i < niz3.length; i++) {

                                            s += ("<tr><td>" + niz3[i].IdVoznje + "</td><td>");

                                            var currentdate = new Date(Date.parse(niz3[i].DatumVreme));
                                            var datum = currentdate.getFullYear() + "/" + ("0" + (currentdate.getMonth() + 1)).slice(-2) + "/" + ("0" + currentdate.getDate()).slice(-2);
                                            var vreme = ("0" + currentdate.getHours()).slice(-2) + ":" + ("0" + currentdate.getMinutes()).slice(-2);

                                            s += ("" + datum + " " + vreme + "</td>");

                                            if (niz3[i].Musterija === "") {
                                                s += '<td>/</td>';
                                            } else {
                                                s += '<td>' + niz3[i].Musterija + '</td>';
                                            }

                                            if (niz3[i].Vozac === "") {
                                                s += '<td>/</td>';
                                            } else {
                                                s += '<td>' + niz3[i].Vozac + '</td>';
                                            }

                                            s += '<td>' + niz3[i].Lokacija.Adresa.UlicaBroj + ", " + niz3[i].Lokacija.Adresa.NaseljenoMesto + " " + niz3[i].Lokacija.Adresa.PozivniBroj + "</td><td>";

                                            switch (niz3[i].Automobil) {
                                                case 0:
                                                    s += "Putnički";
                                                    break;
                                                case 1:
                                                    s += "Kombi";
                                                    break;
                                                case 2:
                                                    s += "Svejedno";
                                            }

                                            if (niz3[i].Odrediste.Adresa.UlicaBroj === "") {
                                                s += "</td><td>/" + "</td>";
                                            }
                                            else {
                                                s += "</td><td>" + niz3[i].Odrediste.Adresa.UlicaBroj + ", " + niz3[i].Odrediste.Adresa.NaseljenoMesto + " " + niz3[i].Odrediste.Adresa.PozivniBroj + "</td>";
                                            }

                                            if (niz3[i].Iznos !== "0") {
                                                s += "<td>" + niz3[i].Iznos + "</td>";
                                            } else {
                                                s += "<td>/</td>";
                                            }

                                            s += '<td><textarea rows="5" cols="30" disabled>';

                                            if (niz3[i].Komentar.Opis === "") {
                                                s += "Komentar nije dodat!" + "</textarea ></td >";
                                            } else {
                                                s += "Korisnicko ime: " + niz3[i].Komentar.KorisnickoIme + "\n\nOpis: " + niz3[i].Komentar.Opis + "\n\nOcena: " + niz3[i].Komentar.Ocena + "\nDatum: " + niz3[i].Komentar.DatumObjave + "</textarea ></td >";
                                            }

                                            s += "<td>" + vratiStatusVoznje(niz3[i].StatusVoznje) + "</td></tr>";
                                        }
                                        s += '</table>';

                                        if (pp === "da") {
                                            $('#glavni2').append(s);
                                            pp = "ne";
                                        } else {
                                            // $('.voznje').hide();
                                            $('.voznje').replaceWith(s);
                                        }
                                        // $('#glavni').append(s);
                                    }
                                    else {
                                        alert("Nemate voznje zadate ovom pretragom!");
                                    }
                                } else {
                                    alert("Za dat interval ocena, ni jedna voznja se ne uklapa!");
                                }

                            } else {
                                alert("Za odabrano vreme, ni jedna voznja se ne moze pronaci!");
                            }
                        } else {
                            alert("Korisnik ne poseduje ni jednu voznju!");
                        }
                    } else {
                        alert("Nema vožnji u sistemu!");
                    }


                },
                error: function (ret1) {
                    alert("Greska: " + ret1.responseText);
                }
            });

        }

    });


    let prviFilterD;
    $('#filtrirajVoznjeD').click(function () {
        $('#map1').hide();
        $.ajax({
            type: 'GET',
            url: '/api/Dispecer',

            data: { KorisnickoIme: `${localStorage.getItem("Ulogovan")}` },
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (data) {
                if (data.Banovan === "NE") {

                    let s = '';
                    prviFilterD = "da";

                    s += '<div style="position:relative;"><table style="position:absolute;margin-left:50%;margin-top:60px;margin-right:-50%;transform: translate(-50%, -50%);"><tr><th colspan="2" ><h3>Ovde možete izvršiti filtriranje po statusu vožnje</h3></th></tr>';
                    s += '<tr><td align="center"><select name="filterTipD" id="filterTipD"><option value="Kreirana">Kreirana</option><option value="Formirana">Formirana</option><option value="Obradjena">Obradjena</option><option value="Prihvaćena">Prihvaćena</option><option value="Otkazana">Otkazana</option><option value="Neuspešna">Neuspešna</option><option value="Uspešna">Uspešna</option></select></td><td><input type="button" name="filtriranjeD" id="filtriranjeD" value="Filtriraj"/></td></tr>';
                    s += '</table></div>';

                    $('#glavni2').html(s);
                    $('#glavni2').fadeIn(500);
                }
                else {
                    alert("Banovani ste sa ovog sajta!");
                    localStorage.setItem("Ulogovan", "");
                    $(location).attr('href', 'index.html');
                }
            }
        });

    });

    $('#glavni2').on('click', '#filtriranjeD', function () {
        let data = [];
        $.ajax({
            type: 'GET',
            url: '/api/Voznja',
            //data: JSON.stringify(KomentarOtkazaneVoznja),
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (dataV) {
                if (dataV.length !== 0) {

                    for (var i = 0; i < dataV.length; i++) {
                        if (vratiStatusVoznje(dataV[i].StatusVoznje) === `${$('#filterTipD').val()}`) {
                            data.push(dataV[i]);
                        }
                    }

                    if (data.length > 0) {
                        let s = '';
                        s += '<div class="voznje" style="font-size:14px;position:absolute;margin-top:100px;">';
                        s += '<table border=1 class="voznje boja"><tr><th colspan="10"><h3><b>Rezultat filtriranja</b></h3></th></tr>';
                        s += '<tr><th>Id vožnje</th><th>Datum</th><th>Mušterija</th><th>Vozač</th><th >Mesto polaska</th><th>Tip auta</th><th>Ordedište</th><th>Iznos</th><th>Komentar</th><th>Status vožnje</th></tr>';

                        for (var j = 0; j < data.length; j++) {

                            s += ("<tr><td>" + data[j].IdVoznje + "</td><td>");

                            var currentdate = new Date(Date.parse(data[j].DatumVreme));
                            var datum = currentdate.getFullYear() + "/" + ("0" + (currentdate.getMonth() + 1)).slice(-2) + "/" + ("0" + currentdate.getDate()).slice(-2);
                            var vreme = ("0" + currentdate.getHours()).slice(-2) + ":" + ("0" + currentdate.getMinutes()).slice(-2);

                            s += ("" + datum + " " + vreme + "</td>");

                            if (data[j].Musterija === "") {
                                s += '<td>/</td>';
                            } else {
                                s += '<td>' + data[j].Musterija + '</td>';
                            }

                            if (data[j].Vozac === "") {
                                s += '<td>/</td>';
                            } else {
                                s += '<td>' + data[j].Vozac + '</td>';
                            }

                            s += '<td>' + data[j].Lokacija.Adresa.UlicaBroj + ", " + data[j].Lokacija.Adresa.NaseljenoMesto + " " + data[j].Lokacija.Adresa.PozivniBroj + "</td><td>";

                            switch (data[j].Automobil) {
                                case 0:
                                    s += "Putnički";
                                    break;
                                case 1:
                                    s += "Kombi";
                                    break;
                                case 2:
                                    s += "Svejedno";
                            }

                            if (data[j].Odrediste.Adresa.UlicaBroj === "") {
                                s += "</td><td>/" + "</td>";
                            }
                            else {
                                s += "</td><td>" + data[j].Odrediste.Adresa.UlicaBroj + ", " + data[j].Odrediste.Adresa.NaseljenoMesto + " " + data[j].Odrediste.Adresa.PozivniBroj + "</td>";
                            }

                            if (data[j].Iznos !== "0") {
                                s += "<td>" + data[j].Iznos + "</td>";
                            } else {
                                s += "<td>/</td>";
                            }

                            s += '<td><textarea rows="5" cols="30" disabled>';

                            if (data[j].Komentar.Opis === "") {
                                s += "Komentar nije dodat!" + "</textarea ></td >";
                            } else {
                                s += "Korisnicko ime: " + data[j].Komentar.KorisnickoIme + "\n\nOpis: " + data[j].Komentar.Opis + "\n\nOcena: " + data[j].Komentar.Ocena + "\nDatum: " + data[j].Komentar.DatumObjave + "</textarea ></td >";
                            }

                            s += "<td>" + vratiStatusVoznje(data[j].StatusVoznje) + "</td></tr>";

                        }
                        s += '</table>';

                        if (prviFilterD === "da") {
                            $('#glavni2').append(s);
                            prviFilterD = "ne";
                        } else {
                            // $('.voznje').hide();
                            $('.voznje').replaceWith(s);
                        }

                    } else {
                        alert("Korisnik " + `${localStorage.getItem("Ulogovan")}` + ", nema vožnji za odabrani filter!");
                    }

                } else {
                    alert("Nema voznji u sistemu!");
                }
            },
            error: function (ret1) {
                alert("Greska: " + ret1.responseText);
            }
        });

    });

    $('#sortirajDatumD').click(function () {
        $('#map1').hide();
        $.ajax({
            type: 'GET',
            url: '/api/Dispecer',

            data: { KorisnickoIme: `${localStorage.getItem("Ulogovan")}` },
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (data) {
                if (data.Banovan === "NE") {

                    let zasortiranje = [];
                    $.ajax({
                        type: 'GET',
                        url: '/api/Voznja',
                        //data: JSON.stringify(KomentarOtkazaneVoznja),
                        contentType: 'application/json;charset=utf-8',
                        dataType: 'json',
                        success: function (data) {
                            if (data.length > 0) {
                                for (var i = 0; i < data.length; i++) {
                                        zasortiranje.push(data[i]);
                                }

                                zasortiranje.sort(function (a, b) {
                                    return new Date(b.DatumVreme) - new Date(a.DatumVreme);
                                });

                                if (zasortiranje.length > 0) {
                                    let s = '';
                                    s += '<div class="voznje" style="font-size:14px;position:absolute;margin-top:0px;">';
                                    s += '<table border=1 class="voznje boja"><tr><th colspan="10"><h3><b>Rezultat sortiranja po datumu</b></h3></th></tr>';
                                    s += '<tr><th>Id vožnje</th><th>Datum</th><th>Mušterija</th><th>Vozač</th><th >Mesto polaska</th><th>Tip auta</th><th>Ordedište</th><th>Iznos</th><th>Komentar</th><th>Status vožnje</th></tr>';

                                    for (var k = 0; k < zasortiranje.length; k++) {
                                        s += ("<tr><td>" + zasortiranje[k].IdVoznje + "</td><td>");

                                        var currentdate = new Date(Date.parse(zasortiranje[k].DatumVreme));
                                        var datum = currentdate.getFullYear() + "/" + ("0" + (currentdate.getMonth() + 1)).slice(-2) + "/" + ("0" + currentdate.getDate()).slice(-2);
                                        var vreme = ("0" + currentdate.getHours()).slice(-2) + ":" + ("0" + currentdate.getMinutes()).slice(-2);

                                        s += ("" + datum + " " + vreme + "</td>");

                                        if (zasortiranje[k].Musterija === "") {
                                            s += '<td>/</td>';
                                        } else {
                                            s += '<td>' + zasortiranje[k].Musterija + '</td>';
                                        }

                                        if (zasortiranje[k].Vozac === "") {
                                            s += '<td>/</td>';
                                        } else {
                                            s += '<td>' + zasortiranje[k].Vozac + '</td>';
                                        }

                                        s += '<td>' + zasortiranje[k].Lokacija.Adresa.UlicaBroj + ", " + zasortiranje[k].Lokacija.Adresa.NaseljenoMesto + " " + zasortiranje[k].Lokacija.Adresa.PozivniBroj + "</td><td>";

                                        switch (zasortiranje[k].Automobil) {
                                            case 0:
                                                s += "Putnički";
                                                break;
                                            case 1:
                                                s += "Kombi";
                                                break;
                                            case 2:
                                                s += "Svejedno";
                                        }

                                        if (zasortiranje[k].Odrediste.Adresa.UlicaBroj === "") {
                                            s += "</td><td>/" + "</td>";
                                        }
                                        else {
                                            s += "</td><td>" + zasortiranje[k].Odrediste.Adresa.UlicaBroj + ", " + zasortiranje[k].Odrediste.Adresa.NaseljenoMesto + " " + zasortiranje[k].Odrediste.Adresa.PozivniBroj + "</td>";
                                        }

                                        if (zasortiranje[k].Iznos !== "0") {
                                            s += "<td>" + zasortiranje[k].Iznos + "</td>";
                                        } else {
                                            s += "<td>/</td>";
                                        }

                                        s += '<td><textarea rows="5" cols="30" disabled>';

                                        if (zasortiranje[k].Komentar.Opis === "") {
                                            s += "Komentar nije dodat!" + "</textarea ></td >";
                                        } else {
                                            s += "Korisnicko ime: " + zasortiranje[k].Komentar.KorisnickoIme + "\n\nOpis: " + zasortiranje[k].Komentar.Opis + "\n\nOcena: " + zasortiranje[k].Komentar.Ocena + "\nDatum: " + zasortiranje[k].Komentar.DatumObjave + "</textarea ></td >";
                                        }

                                        s += "<td>" + vratiStatusVoznje(zasortiranje[k].StatusVoznje) + "</td></tr>";
                                    }
                                    s += '</table>';

                                    $('#glavni2').html(s);
                                    $('#glavni2').fadeIn(500);
                                } else {
                                    alert("Korisnik " + `${localStorage.getItem("Ulogovan")}` + ", nema registrovanih vožnji!");
                                }

                            } else {
                                alert("U sistemu ne postoji ni jedna vožnja!");
                            }
                        },
                        error: function (ret1) {
                            alert("Greska: " + ret1.responseText);
                        }
                    });
                }
                else {
                    alert("Banovani ste sa ovog sajta!");
                    localStorage.setItem("Ulogovan", "");
                    $(location).attr('href', 'index.html');
                }
            }
        });

    });

    $('#sortirajOcenaD').click(function () {
        $('#map1').hide();
        $.ajax({
            type: 'GET',
            url: '/api/Dispecer',

            data: { KorisnickoIme: `${localStorage.getItem("Ulogovan")}` },
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (data) {
                if (data.Banovan === "NE") {

                    let zasortiranje = [];
                    $.ajax({
                        type: 'GET',
                        url: '/api/Voznja',
                        //data: JSON.stringify(KomentarOtkazaneVoznja),
                        contentType: 'application/json;charset=utf-8',
                        dataType: 'json',
                        success: function (data) {
                            if (data.length > 0) {
                                for (var i = 0; i < data.length; i++) {
                                    if (data[i].Komentar.Ocena !== "") {
                                        zasortiranje.push(data[i]);
                                    }
                                }

                                zasortiranje.sort(function (a, b) {
                                    return b.Komentar.Ocena - a.Komentar.Ocena;
                                });

                                //cisto smestam one bez ocene na kraj tabele jer onako
                                for (var k = 0; k < data.length; k++) {
                                    if (data[k].Komentar.Ocena === "") {
                                        zasortiranje.push(data[k]);
                                    }
                                }

                                if (zasortiranje.length > 0) {
                                    let s = '';
                                    s += '<div class="voznje" style="font-size:14px;position:absolute;margin-top:0px;">';
                                    s += '<table border=1 class="voznje boja"><tr><th colspan="10"><h3><b>Rezultat sortiranja po ocenama</b></h3></th></tr>';
                                    s += '<tr><th>Id vožnje</th><th>Datum</th><th>Mušterija</th><th>Vozač</th><th >Mesto polaska</th><th>Tip auta</th><th>Ordedište</th><th>Iznos</th><th>Komentar</th><th>Status vožnje</th></tr>';

                                    for (var j = 0; j < zasortiranje.length; j++) {
                                        s += ("<tr><td>" + zasortiranje[j].IdVoznje + "</td><td>");

                                        var currentdate = new Date(Date.parse(zasortiranje[j].DatumVreme));
                                        var datum = currentdate.getFullYear() + "/" + ("0" + (currentdate.getMonth() + 1)).slice(-2) + "/" + ("0" + currentdate.getDate()).slice(-2);
                                        var vreme = ("0" + currentdate.getHours()).slice(-2) + ":" + ("0" + currentdate.getMinutes()).slice(-2);

                                        s += ("" + datum + " " + vreme + "</td>");

                                        if (zasortiranje[j].Musterija === "") {
                                            s += '<td>/</td>';
                                        } else {
                                            s += '<td>' + zasortiranje[j].Musterija + '</td>';
                                        }

                                        if (zasortiranje[j].Vozac === "") {
                                            s += '<td>/</td>';
                                        } else {
                                            s += '<td>' + zasortiranje[j].Vozac + '</td>';
                                        }

                                        s += '<td>' + zasortiranje[j].Lokacija.Adresa.UlicaBroj + ", " + zasortiranje[j].Lokacija.Adresa.NaseljenoMesto + " " + zasortiranje[j].Lokacija.Adresa.PozivniBroj + "</td><td>";

                                        switch (zasortiranje[j].Automobil) {
                                            case 0:
                                                s += "Putnički";
                                                break;
                                            case 1:
                                                s += "Kombi";
                                                break;
                                            case 2:
                                                s += "Svejedno";
                                        }

                                        if (zasortiranje[j].Odrediste.Adresa.UlicaBroj === "") {
                                            s += "</td><td>/" + "</td>";
                                        }
                                        else {
                                            s += "</td><td>" + zasortiranje[j].Odrediste.Adresa.UlicaBroj + ", " + zasortiranje[j].Odrediste.Adresa.NaseljenoMesto + " " + zasortiranje[j].Odrediste.Adresa.PozivniBroj + "</td>";
                                        }

                                        if (zasortiranje[j].Iznos !== "0") {
                                            s += "<td>" + zasortiranje[j].Iznos + "</td>";
                                        } else {
                                            s += "<td>/</td>";
                                        }

                                        s += '<td><textarea rows="5" cols="30" disabled>';

                                        if (zasortiranje[j].Komentar.Opis === "") {
                                            s += "Komentar nije dodat!" + "</textarea ></td >";
                                        } else {
                                            s += "Korisnicko ime: " + zasortiranje[j].Komentar.KorisnickoIme + "\n\nOpis: " + zasortiranje[j].Komentar.Opis + "\n\nOcena: " + zasortiranje[j].Komentar.Ocena + "\nDatum: " + zasortiranje[j].Komentar.DatumObjave + "</textarea ></td >";
                                        }

                                        s += "<td>" + vratiStatusVoznje(zasortiranje[j].StatusVoznje) + "</td></tr>";
                                    }
                                    s += '</table>';

                                    $('#glavni2').html(s);
                                    $('#glavni2').fadeIn(500);


                                } else {
                                    alert("Korisnik " + `${localStorage.getItem("Ulogovan")}` + ", trenutno ne poseduje vožnju!");
                                }
                            } else {
                                alert("Nema vožnji u sistemu!");
                            }
                        },
                        error: function (ret1) {
                            alert("Greska: " + ret1.responseText);
                        }
                    });
                }
                else {
                    alert("Banovani ste sa ovog sajta!");
                    localStorage.setItem("Ulogovan", "");
                    $(location).attr('href', 'index.html');
                }
            }
        });

    });



})

function vratiVozilo(id) {
    switch (id) {
        case 0: return "Putnicki";
        case 1: return "Kombi";
        case 2: return "Svejedno";
    }
}
