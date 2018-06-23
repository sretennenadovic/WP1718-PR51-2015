
$(document).ready(function () {
    /*pri kliku na link profil*/
    $('#profil').click(function () {
        $.ajax({
            type: 'GET',
            url: '/api/Registration',

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
                    $('#divNovaVoznja').hide();
                } else if (korisnik.Uloga == 1) {
                    $('#vozac').hide();
                    $('#korisnik').hide();
                    $('#dispecer').show();
                    $('#zaprofild').hide();
                    $('#zaizmenud').hide();
                } else {
                    $('#korisnik').hide();
                    $('#dispecer').hide();
                    $('#vozac').show();
                }
                $('#glavni').hide();

                let s = '';

                s += '<div id="zaprofil">';
                s += '<h2>Korisnički profil</h2>';
                s += '<hr />';
                s += '<table>';
                s += '<tr><th>Korisničko ime:</th><td id="1"></td></tr>';
                s += '<tr><th>Lozinka:</th><td id="2"></td></tr>';
                s += '<tr><th>Ime:</th><td id="3"></td></tr>';
                s += '<tr><th>Prezime:</th><td id="4"></td></tr>';
                s += '<tr><th>JMBG:</th><td id="5"></td></tr>';
                s += '<tr><th>Pol:</th><td id="6"></td></tr>';
                s += '<tr><th>Kontakt Telefon:</th><td id="7"></td></tr>';
                s += '<tr><th>Email:</th><td id="8"></td></tr>';
                s += '<tr><th>Uloga:</th><td id="9"></td></tr>';
                s += '</table>';
                s += '</div>';
                $('#glavni').html(s);

                $('#1').text(korisnik.KorisnickoIme);
                $('#2').text(korisnik.Lozinka);
                $('#3').text(korisnik.Ime);
                $('#4').text(korisnik.Prezime);
                $('#5').text(korisnik.JMBG);
                if (korisnik.Pol == 0) {
                    $('#6').text("Muški");
                } else {
                    $('#6').text("Ženski");
                }
                $('#7').text(korisnik.KontaktTelefon);
                $('#8').text(korisnik.Email);
                $('#9').text('Mušterija');
                $('#glavni').fadeIn(500);
            }
        })
    })

    $('#izmeni').click(function () {
        $('#glavni').hide();

        let s = '';
        s += '<div id="zaizmenu">';
        s += '  <table>';
        s += '      <tr><th>Korisničko ime:</th><td><input type="text" name="KorisnickoIme" id="KorisnickoIme" style="margin:5px" /></td></tr>';
        s += '     <tr><th>Lozinka:</th><td><input type="text" name="Lozinka" id="Lozinka" style="margin:5px" /></td></tr>';
        s += '     <tr><th>Ime:</th><td><input type="text" name="Ime" id="Ime" style="margin:5px" /></td></tr>';
        s += '     <tr><th>Prezime:</th><td><input type="text" name="Prezime" id="Prezime" style="margin:5px" /></td></tr>';
        s += '     <tr><th>JMBG:</th><td><input type="text" name="JMBG" id="JMBG" style="margin:5px" /></td></tr>';
        s += '     <tr><th>Pol:</th><td><label>Muški:&nbsp&nbsp</label><input type="radio" name="Pol" value="Muski" id="Pol1" /><label>&nbsp&nbspŽenski:&nbsp&nbsp</label><input type="radio" value="Zenski" name="Pol" id="Pol2" /></td></tr>';
        s += '     <tr><th>Kontakt Telefon:</th><td><input type="text" name="KontaktTelefon" id="KontaktTelefon" style="margin:5px" /></td></tr>';
        s += '     <tr><th>Email:</th><td><input type="email" name="Email" id="Email" style="margin:5px" /></td></tr>';
        s += '     <tr ><td colspan="2"><hr /></td></tr>';
        s += '     <tr><td colspan="2" align="right"><b><input type="button" value="Izmeni" id="izmena" /></b></td></tr';
        s += '  </table>';
        s += ' </div>';

        $('#glavni').html(s);

        $('#KorisnickoIme').val(korisnik.KorisnickoIme);
        $('#Lozinka').val(korisnik.Lozinka);
        $('#Ime').val(korisnik.Ime);
        $('#Prezime').val(korisnik.Prezime);
        $('#JMBG').val(korisnik.JMBG);
        if (korisnik.Pol == 0) {
            $('#Pol1').prop('checked', true);
        } else {
            $('#Pol2').prop('checked', true);
        }
        $('#KontaktTelefon').val(korisnik.KontaktTelefon);
        $('#Email').val(korisnik.Email);
        $('#glavni').fadeIn(500);
    })


    //dugme izmeniii
    $('#glavni').on('click', '#izmena', function () {
        let pol;
        if ($('#Pol1').prop('checked')) {
            pol = 'Muski';
        } else if ($('#Pol2').prop('checked')) {
            pol = 'Zenski';
        }
        let KorisnikIzmena = {
            Id: korisnickiId,
            KorisnickoIme: `${$('#KorisnickoIme').val()}`,
            Lozinka: `${$('#Lozinka').val()}`,
            Ime: `${$('#Ime').val()}`,
            Prezime: `${$('#Prezime').val()}`,
            Pol: pol,
            JMBG: `${$('#JMBG').val()}`,
            KontaktTelefon: `${$('#KontaktTelefon').val()}`,
            Email: `${$('#Email').val()}`,
            Uloga: `${'Musterija'}`,
            Voznje: `${'nema'}`,
            Banovan: `${"NE"}`
        };

        $.ajax({
            type: 'PUT',
            url: '/api/Registration/' + KorisnikIzmena.Id,
            data: JSON.stringify(KorisnikIzmena),
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (data) {
                if (!data) {
                    alert("Korisničko ime koje zahtevate, već postoji!");
                } else {
                    alert("Uspešno ste izmenili podatke!");
                    localStorage.setItem("Ulogovan", KorisnikIzmena.KorisnickoIme);
                    Korisnik.KorisnickoIme = KorisnikIzmena.KorisnickoIme;
                }
            }
        })
    })


    //dodaj posle da se sakrije i za pretragu i sve novije dodato
    $('#dugmeHome').click(function () {
        $('#glavni').hide();

        //opet ide zahtev za voznjama da bi ucitali eventualno nove dodate
        $.ajax({
            type: 'GET',
            url: '/api/Voznja',
            //data: JSON.stringify(korisnik.Id),
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (data) {

                let s = '';
                s += '<div id="voznje" style="font-size:14px">';
                s += '<h3 style="margin-left:44%;position:absolute;"><b>Moje vožnje</b></h3>';
                s += '<table border=1 class="voznje boja"><tr><th>Id vožnje</th><th>Datum</th><th>Dispečer</th><th>Vozač</th><th >Mesto polaska</th><th>Tip auta</th><th>Ordedište</th><th>Iznos</th><th>Komentar</th><th>Status vožnje</th><th>Opcije</th></tr>';


                for (let i = 0; i < data.length; i++) {
                    if (data[i].Musterija == localStorage.getItem("Ulogovan")) {
                        s += ("<tr><td>" + data[i].IdVoznje + "</td><td>" + data[i].DatumVreme + "</td>");

                        if (data[i].Dispecer == "") {
                            s += '<td>/</td>';
                        } else {
                            s += ('<td>' + data[i].Dispecer + '</td>');
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
                            s += (`<input type="button" value="Odustani" id="odustani" class="obtn" name=${data[i].IdVoznje} /><br /><br />`);
                            s += (`<input type="button" value="  Izmeni " id="izmeniVoznjuD" class="ibtn" name=${data[i].IdVoznje} />`);
                        } else if (vratiStatusVoznje(data[i].StatusVoznje) == "Uspešna") {
                            s += (`<input type="button" value=" Komentar " id="dodajKomentarUspesna" class="kombtn" name=${data[i].IdVoznje} />`);
                        } else {
                            s += ("Nedostupne");
                        }
                        s += (`</td></tr>`)
                    }
                }

                s += '</table></div>';
                $('#glavni').html(s);
            }
        })

        $('#glavni').fadeIn(500);
    })



    //KORISNIK DODAJE VOZNJU

    $('#korisnikDodajVoznju').click(function () {
        $('#glavni').hide();

        let s = '';
        s += '<div id="divNovaVoznja">';
        s += '  <table style="position:absolute;margin-left:3%;margin-top:3%;">';
        s += '     <tr ><th colspan="2">Unesite podatke o novoj vožnji:</th></tr>';
        s += '    <tr ><td colsapn="2"><hr /></td></tr>';
        s += '    <tr><td >Koordinata X:</td><td><input type="text" style="margin:5px;" name="korisnikLokacijaX" id="korisnikLokacijaX" /></td></tr';
        s += '    <tr><td>Koordinata Y:</td><td><input type="text" style="margin:5px;" name="korisnikLokacijaY" id="korisnikLokacijaY" /></td></tr>';
        s += '    <tr><td>Ulica i broj:</td><td><input type="text" style="margin:5px;" name="korisnikUlicaBroj" id="korisnikUlicaBroj" /></td></tr>';
        s += '     <tr><td>Naseljeno mesto:</td><td><input type="text" style="margin:5px;" name="korisnikNaseljenoMesto" id="korisnikNaseljenoMesto" /></td></tr>';
        s += '     <tr><td>Pozivni broj:</td><td><input type="text" style="margin:5px;" name="korisnikPozivniBroj" id="korisnikPozivniBroj" /></td></tr>';
        s += '     <tr><td>Željeni tip automobila:</td><td><label>&nbspPutnički:&nbsp&nbsp</label><input type="radio" style="margin:5px;" name="korisnikTipAuta" value="Putnicki" id="korisnikTipAuta1" /><label>&nbsp&nbspKombi:&nbsp&nbsp</label><input type="radio" value="Kombi" style="margin:5px;" name="korisnikTipAuta" id="korisnikTipAuta2" /></td></tr>';
        s += '     <tr><td colspan="2" align="right"><input type="button" style="margin:5px;" name="DodajVoznju" id="DodajVoznju" value="Dodaj" /></td></tr>';
        s += ' </table>';
        s += ' </div>';

        $('#glavni').html(s);

        $('#glavni').fadeIn(500);
    })

    $('#glavni').on('click', '#DodajVoznju', function () {
        let tipAutomobila;

        if ($('#korisnikTipAuta1').prop('checked')) {
            tipAutomobila = 'Putnicki';
        } else if ($('#korisnikTipAuta2').prop('checked')) {
            tipAutomobila = 'Kombi';
        } else {
            tipAutomobila = 'Svejedno';
        }

        let AdresaKorisnikDodajeVoznju = {
            UlicaBroj: `${$('#korisnikUlicaBroj').val()}`,
            NaseljenoMesto: `${$('#korisnikNaseljenoMesto').val()}`,
            PozivniBroj: `${$('#korisnikPozivniBroj').val()}`
        }

        let LokacijaKorisnikDodajeVoznju = {
            X: `${$('#korisnikLokacijaX').val()}`,
            Y: `${$('#korisnikLokacijaY').val()}`,
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

        let NovaVoznjaKorisnika = {
            IdVoznje: "",
            DatumVreme: "",
            Lokacija: LokacijaKorisnikDodajeVoznju,
            Automobil: tipAutomobila,
            Musterija: `${localStorage.getItem("Ulogovan")}`,
            Odrediste: LokacijaKorisnikDodajeVoznju2,
            Dispecer: "",
            Vozac: "",
            Iznos: "",
            Komentar: komentar,
            StatusVoznje: 0
        }

        $.ajax({
            type: 'POST',
            url: '/api/Voznja',
            data: JSON.stringify(NovaVoznjaKorisnika),
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (data) {
                if (!data) {
                    alert("Vožnja nije dodata!");
                } else {
                    alert("Uspešno ste dodali novu vožnju!");
                }
            }
        })
    })

            //KRAJ KORISNIK DODAJE VOZNJU




    //KLIK NA DUGME ODUSTANI U TABELI

    $(document).on('click', '.obtn', function () {
        let idVoznje = $(this).prop('name');
        idVoznja = idVoznje;


        $('#glavni').hide();
        let s = '';
        s += '<div class="komentar">';
        s += '<table style="position:absolute;"><tr><td colspan="2"><label>Obavezno unesite komentar:</label></td></tr>';
        s += '<tr><td colspan="2"><textarea name="textKom" id="textKom" cols="30" rows="5" placeholder="Ovde unesite komentar" /></td></tr>';
        s += '<tr><td>Odaberite ocenu:</td><td><select name="ocene" id="ocene"><option value="0" data-toggle="tooltip" title="Ne želim da ocenim">0</option><option value="1" data-toggle="tooltip" title="Jako loše">1</option><option value="2" data-toggle="tooltip" title="Loše">2</option><option value="3" data-toggle="tooltip" title="Dobro">3</option><option value="4" data-toggle="tooltip" title="Vrlo dobro">4</option><option value="5" data-toggle="tooltip" title="Odlično">5</option></select></td></tr>';
        s += '<tr><td colspan="2"><input type="button" name="dodajKom" id="dodajKom" value="U redu"/></td></tr></table></div>';
        $('#glavni').html(s);
        $('#glavni').fadeIn(500);

        // }

        // })
    })

    //KRAJ KLIK NA DUGME ODUSTANI U TABELI


    //KLIK NA DUGME IZMENI U TABELI
    $(document).on('click', '.ibtn', function () {
        let idVoznje = $(this).prop('name');
        idVoznja = idVoznje;

        $.ajax({
            type: 'GET',
            url: '/api/Voznja',
            //data: JSON.stringify(idVoznja),
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (data) {

                for (let i = 0; i < data.length; i++) {
                    if (data[i].IdVoznje == idVoznja) {

                        $('#glavni').hide();
                        let s = '';
                        s += '<div class="izmenaVoznje"><h3>Ovde možete izmeniti svoju vožnju</h3>';
                        s += '<table style="position:absolute" >';
                        s += '<tr><td colspan="2"><hr/></td></tr>';
                        s += '<tr><td >Koordinata X:</td><td><input type="text" style="margin:5px;" name="izmenaKoordinataX" id="izmenaKoordinataX" required /></td></tr>';
                        s += '<tr><td>Koordinata Y:</td> <td><input type="text" style="margin:5px;" name="izmenaKoordinataY" id="izmenaKoordinataY" required /></td></tr >';
                        s += '<tr><td>Ulica i broj:</td> <td><input type="text" style="margin:5px;" name="izmenaUlicaBroj" id="izmenaUlicaBroj" required /></td></tr >';
                        s += '<tr><td>Naseljeno mesto:</td><td><input type="text" style="margin:5px;" name="izmenaNaseljenoMesto" id="izmenaNaseljenoMesto" required /></td></tr>';
                        s += '<tr><td> Pozivni broj:</td><td><input type="text" style="margin:5px;" name="izmenaPozivniBroj" id="izmenaPozivniBroj" required /></td></tr>';
                        s += '<tr><td>Željeni tip automobila:</td><td data-balloon="Ako vam je svejedno, nemojte odabrati tip!" data-balloon-pos="down"><label>&nbspPutnički:&nbsp&nbsp</label><input type="radio" style="margin:5px;" name="izmenaTipAuta" value="Putnicki" id="izmenaTipAuta1" /><label>&nbsp&nbspKombi:&nbsp&nbsp</label><input type="radio" value="Kombi" style="margin:5px;" name="izmenaTipAuta" id="izmenaTipAuta2" /></td></tr>';
                        s += '<tr><td colspan="2"><hr/></td></tr>';
                        s += '<tr><td colspan="2" style="text-align:right;"><input type="button" name="izmeniVoznju" id="izmeniVoznju" value="Izmeni"/></td></tr>';
                        s += "</table></div>";

                        $('#glavni').html(s);

                        $('#izmenaKoordinataX').val(data[i].Lokacija.X);
                        $('#izmenaKoordinataY').val(data[i].Lokacija.Y);
                        $('#izmenaUlicaBroj').val(data[i].Lokacija.Adresa.UlicaBroj);
                        $('#izmenaNaseljenoMesto').val(data[i].Lokacija.Adresa.NaseljenoMesto);
                        $('#izmenaPozivniBroj').val(data[i].Lokacija.Adresa.PozivniBroj);
                        if (data[i].TipAutomobila == 0) {
                            $('#izmenaTipAuta1').prop('checked', true);
                        } else if (data[i].TipAutomobila == 1) {
                            $('#izmenaTipAuta2').prop('checked', true);
                        }
                    }
                }
                $('#glavni').fadeIn(500);
            }
        })
    })


    //KLIK NA DUGME DODAJ KOM
    $('#glavni').on('click', '#dodajKom', function () {
        $.ajax({
            type: 'GET',
            url: '/api/Voznja',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (data) {

                for (let i = 0; i < data.length; i++) {

                    if (data[i].IdVoznje == idVoznja) {

                        let addr = {
                            UlicaBroj: data[i].Lokacija.Adresa.UlicaBroj,
                            NaseljenoMesto: data[i].Lokacija.Adresa.NaseljenoMesto,
                            PozivniBroj: data[i].Lokacija.Adresa.PozivniBroj
                        }

                        let lok = {
                            X: data[i].Lokacija.X,
                            Y: data[i].Lokacija.Y,
                            Adresa: addr
                        }

                        let addr2 = {
                            UlicaBroj: data[i].Odrediste.Adresa.UlicaBroj,
                            NaseljenoMesto: data[i].Odrediste.Adresa.NaseljenoMesto,
                            PozivniBroj: data[i].Odrediste.Adresa.PozivniBroj
                        }

                        let lok2 = {
                            X: data[i].Odrediste.X,
                            Y: data[i].Odrediste.Y,
                            Adresa: addr2
                        }

                        let kom = {
                            Opis: $('#textKom').val(),
                            IdVoznje: idVoznja,
                            KorisnickoIme: korisnik.KorisnickoIme,
                            Ocena: $('#ocene').val()
                        }

                        let KomentarOtkazaneVoznja = {
                            IdVoznje: idVoznja,
                            DatumVreme: data[i].DatumVreme,
                            Lokacija: lok,
                            Automobil: data[i].Automobil,
                            Musterija: data[i].Musterija,
                            Odrediste: lok2,
                            Dispecer: data[i].Dispecer,
                            Vozac: data[i].Vozac,
                            Iznos: data[i].Iznos,
                            Komentar: kom,
                            StatusVoznje: 4
                        }

                        $.ajax({
                            type: 'PUT',
                            url: '/api/Voznja/' + idVoznja,//idVoznja je lokalna koja mi cuva samo id voznje izmedju klika na otkazi i klika na dodaj komentar
                            data: JSON.stringify(KomentarOtkazaneVoznja),
                            contentType: 'application/json;charset=utf-8',
                            dataType: 'json',
                            success: function () {
                                alert("Uspešno ste otkazali vožnju!");
                                $(location).attr('href', 'main.html');
                            }
                        })
                    }
                }
            }
        })
    })
    //KRAJ KLIK NA DUGME DODAJ KOM

    //KLIK NA DUGME IZMENI VOZNJU

    $('#glavni').on('click', '#izmeniVoznju', function () {
        $.ajax({
            type: 'GET',
            url: '/api/Voznja',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (data) {

                for (let i = 0; i < data.length; i++) {

                    if (data[i].IdVoznje == idVoznja) {

                        let tipAutomobila;

                        if ($('#izmenaTipAuta1').prop('checked')) {
                            tipAutomobila = 0;
                        } else if ($('#izmenaTipAuta2').prop('checked')) {
                            tipAutomobila = 1;
                        } else {
                            tipAutomobila = 2;
                        }

                        let addr = {
                            UlicaBroj: $('#izmenaUlicaBroj').val(),
                            NaseljenoMesto: $('#izmenaNaseljenoMesto').val(),
                            PozivniBroj: $('#izmenaPozivniBroj').val()
                        }

                        let lok = {
                            X: $('#izmenaKoordinataX').val(),
                            Y: $('#izmenaKoordinataY').val(),
                            Adresa: addr
                        }

                        let addr2 = {
                            UlicaBroj: data[i].Odrediste.Adresa.UlicaBroj,
                            NaseljenoMesto: data[i].Odrediste.Adresa.NaseljenoMesto,
                            PozivniBroj: data[i].Odrediste.Adresa.PozivniBroj
                        }

                        let lok2 = {
                            X: data[i].Odrediste.X,
                            Y: data[i].Odrediste.Y,
                            Adresa: addr2
                        }

                        let kom = {
                            Opis: data[i].Komentar.Opis,
                            DatumObjave: data[i].Komentar.DatumObjave,
                            IdVoznje: data[i].Komentar.IdVoznje,
                            KorisnickoIme: data[i].Komentar.KorisnickoIme,
                            Ocena: data[i].Komentar.Ocena
                        }

                        let KomentarOtkazaneVoznja = {
                            IdVoznje: idVoznja,
                            DatumVreme: data[i].DatumVreme,
                            Lokacija: lok,
                            Automobil: tipAutomobila,
                            Musterija: data[i].Musterija,
                            Odrediste: lok2,
                            Dispecer: data[i].Dispecer,
                            Vozac: data[i].Vozac,
                            Iznos: data[i].Iznos,
                            Komentar: kom,
                            StatusVoznje: 0//jer pri izmeni voznja ostaje u statusu kreirana
                        }

                        $.ajax({
                            type: 'PUT',
                            url: '/api/Voznja/' + idVoznja,//idVoznja je lokalna koja mi cuva samo id voznje izmedju klika na otkazi i klika na dodaj komentar
                            data: JSON.stringify(KomentarOtkazaneVoznja),
                            contentType: 'application/json;charset=utf-8',
                            dataType: 'json',
                            success: function () {
                                alert("Uspešno ste izmenili vožnju!");
                                $(location).attr('href', 'main.html');
                            }
                        })
                    }
                }
            }
        })

    })

            //KRAJ KLIK NA DUGME IZMENI VOZNJU


    //KLIK NA DUGME KOMENTAR U TABELI KOD KORISNIKA NAKON STO JE VOZNJA USPESNA
    $(document).on('click', '.kombtn', function () {
        let idVoznje = $(this).prop('name');
        idVoznja = idVoznje;

        $('#glavni').hide();
        let s = '';
        s += '<div class="komentar">';
        s += '<table style="position:absolute;"><tr><td colspan="2"><label>Ovde možete ostaviti komentar:</label></td></tr>';
        s += '<tr><td colspan="2"><textarea name="uspesanKomentar" id="uspesanKomentar" cols="30" rows="5" placeholder="Ovde unesite komentar" /></td></tr>';
        s += '<tr><td>Odaberite ocenu:</td><td><select name="oceneUspesanKomentar" id="oceneUspesanKomentar"><option value="0" data-toggle="tooltip" title="Ne želim da ocenim">0</option><option value="1" data-toggle="tooltip" title="Jako loše">1</option><option value="2" data-toggle="tooltip" title="Loše">2</option><option value="3" data-toggle="tooltip" title="Dobro">3</option><option value="4" data-toggle="tooltip" title="Vrlo dobro">4</option><option value="5" data-toggle="tooltip" title="Odlično">5</option></select></td></tr>';
        s += '<tr><td colspan="2"><input type="button" name="dodajUspesanKomentar" id="dodajUspesanKomentar" value="U redu"/></td></tr></table></div>';
        $('#glavni').html(s);
        $('#glavni').fadeIn(500);

    })

    $('#glavni').on('click', '#dodajUspesanKomentar', function () {
        $.ajax({
            type: 'GET',
            url: '/api/Voznja',
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (data) {

                for (let i = 0; i < data.length; i++) {

                    if (data[i].IdVoznje == idVoznja) {

                        let addr = {
                            UlicaBroj: `${data[i].Lokacija.Adresa.UlicaBroj}`,
                            NaseljenoMesto: `${data[i].Lokacija.Adresa.NaseljenoMesto}`,
                            PozivniBroj: `${data[i].Lokacija.Adresa.PozivniBroj}`
                        }

                        let lok = {
                            X: `${data[i].Lokacija.X}`,
                            Y: `${data[i].Lokacija.Y}`,
                            Adresa: addr
                        }

                        let addr2 = {
                            UlicaBroj: `${data[i].Odrediste.Adresa.UlicaBroj}`,
                            NaseljenoMesto: `${data[i].Odrediste.Adresa.NaseljenoMesto}`,
                            PozivniBroj: `${data[i].Odrediste.Adresa.PozivniBroj}`
                        }

                        let lok2 = {
                            X: `${data[i].Odrediste.X}`,
                            Y: `${data[i].Odrediste.Y}`,
                            Adresa: addr2
                        }

                        let kom = {
                            Opis: `${$('#uspesanKomentar').val()}`,
                            IdVoznje: `${idVoznja}`,
                            KorisnickoIme: `${localStorage.getItem("Ulogovan")}`,
                            Ocena: `${$('#oceneUspesanKomentar').val()}`
                        }

                        let KomentarOtkazaneVoznja = {
                            IdVoznje: `${idVoznja}`,
                            DatumVreme: `${data[i].DatumVreme}`,
                            Lokacija: lok,
                            Automobil: `${data[i].Automobil}`,
                            Musterija: `${data[i].Musterija}`,
                            Odrediste: lok2,
                            Dispecer: `${data[i].Dispecer}`,
                            Vozac: `${data[i].Vozac}`,
                            Iznos: `${data[i].Iznos}`,
                            Komentar: kom,
                            StatusVoznje: `${data[i].StatusVoznje}`
                        }

                        $.ajax({
                            type: 'PUT',
                            url: '/api/Voznja/' + idVoznja,//idVoznja je lokalna koja mi cuva samo id voznje izmedju klika na otkazi i klika na dodaj komentar
                            data: JSON.stringify(KomentarOtkazaneVoznja),
                            contentType: 'application/json;charset=utf-8',
                            dataType: 'json',
                            success: function () {
                                alert("Uspešno ste komentarisali vožnju!");
                                $(location).attr('href', 'main.html');
                            }
                        })
                    }
                }
            }
        })

    })


})