let idVoznja;
$(document).ready(function () {
    $('#profilv').click(function () {
        //------------------------------------------------------------------------------------------------------------
        //moram da ponavljam je r kada uradim izmenu, mora opet novo da mi povuce
        $.ajax({
            type: 'GET',
            url: '/api/Vozac',

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
                } else {
                    $('#korisnik').hide();
                    $('#dispecer').hide();
                    $('#vozac').show();
                    $('#zaprofilv').hide();
                    $('#zaizmenuv').hide();
                }
                $('#glavni3').hide();

                let s = '';

                s += ' <div id="zaprofilv">';
                s += '   <h2>Korisnički profil</h2>';
                s += '  <hr />';
                s += '  <table>';
                s += '     <tr><th>Korisničko ime:</th><td id="1v"></td></tr>';
                s += '     <tr><th>Lozinka:</th><td id="2v"></td></tr>';
                s += '     <tr><th>Ime:</th><td id="3v"></td></tr>';
                s += '     <tr><th>Prezime:</th><td id="4v"></td></tr>';
                s += '     <tr><th>JMBG:</th><td id="5v"></td></tr>';
                s += '     <tr><th>Pol:</th><td id="6v"></td></tr>';
                s += '     <tr><th>Kontakt Telefon:</th><td id="7v"></td></tr>';
                s += '     <tr><th>Email:</th><td id="8v"></td></tr>';
                s += '     <tr><th>Uloga:</th><td id="19v"></td></tr>';
                s += '     <tr><th>Lokacija X:</th><td id="9v"></td></tr>';
                s += '      <tr><th>Lokacija Y:</th><td id="10v"></td></tr>';
                s += '      <tr><th>Ulica i broj:</th><td id="11v"></td></tr>';
                s += '      <tr><th>Naseljeno mesto:</th><td id="12v"></td></tr>';
                s += '     <tr><th>Pozivni broj:</th><td id="13v"></td></tr>';
                s += '     <tr><th>Id vozača:</th><td id="14v"></td></tr>';
                s += '     <tr><th>Godište automobila:</th><td id="15v"></td></tr>';
                s += '     <tr><th>Registarske oznake:</th><td id="16v"></td></tr>';
                s += '      <tr><th>Taxi broj:</th><td id="17v"></td></tr>';
                s += '      <tr><th>Vrsta vozila:</th><td id="18v"></td></tr>';
                s += '      <tr><th>Zauzetost:</th><td id="20v"></td></tr>';
                s += ' </table > ';
                s += ' </div > ';
                $('#glavni3').html(s);

                $('#1v').text(korisnik.KorisnickoIme);
                $('#2v').text(korisnik.Lozinka);
                $('#3v').text(korisnik.Ime);
                $('#4v').text(korisnik.Prezime);
                $('#5v').text(korisnik.JMBG);
                if (korisnik.Pol == 0) {
                    $('#6v').text("Muški");
                } else {
                    $('#6v').text("Ženski");
                }
                $('#7v').text(korisnik.KontaktTelefon);
                $('#8v').text(korisnik.Email);
                $('#19v').text('Vozač');
                $('#9v').text(korisnik.Lokacija.X);
                $('#10v').text(korisnik.Lokacija.Y);
                $('#11v').text(korisnik.Lokacija.Adresa.UlicaBroj);
                $('#12v').text(korisnik.Lokacija.Adresa.NaseljenoMesto);
                $('#13v').text(korisnik.Lokacija.Adresa.PozivniBroj);
                $('#14v').text(korisnik.Automobil.IdVozaca);
                $('#15v').text(korisnik.Automobil.GodisteAutomobila);
                $('#16v').text(korisnik.Automobil.BrojRegistarskeOznake);
                $('#17v').text(korisnik.Automobil.BrojTaksiVozila);
                if (korisnik.Automobil.TipAutomobila == 0) {
                    $('#18v').text("Putnički");
                } else {
                    $('#18v').text("Kombi");
                }

                if (korisnik.Zauzet == "DA") {
                    $('#20v').text("Zauzet");
                } else if (korisnik.Zauzet == "NE") {
                    $('#20v').text("Slobodan");
                }
                $('#glavni3').fadeIn(500);
            }
        })
    })


    $('#izmeniv').click(function () {
        $('#glavni3').hide();
        $.ajax({
            type: 'GET',
            url: '/api/Vozac',

            data: { KorisnickoIme: `${localStorage.getItem("Ulogovan")}` },
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (data) {
                korisnickiId = data.Id;
                korisnik = data;


                let s = '';

                s += '<div id="zaizmenuv">';
                s += ' <table class="w3-small">';
                s += '      <tr><th>Korisničko ime:</th><td><input type="text" name="KorisnickoImev" id="KorisnickoImev" style="margin:5px" /></td></tr>';
                s += '      <tr><th>Lozinka:</th><td><input type="text" name="Lozinkav" id="Lozinkav" style="margin:5px" /></td></tr>';
                s += '      <tr><th>Ime:</th><td><input type="text" name="Imev" id="Imev" style="margin:5px" /></td></tr>';
                s += '      <tr><th>Prezime:</th><td><input type="text" name="Prezimev" id="Prezimev" style="margin:5px" /></td></tr>';
                s += '     <tr><th>JMBG:</th><td><input type="text" name="JMBGv" id="JMBGv" style="margin:5px" /></td></tr>';
                s += '      <tr><th>Pol:</th><td><label>Muški:&nbsp&nbsp</label><input type="radio" name="Polv" value="Muski" id="Pol1v" /><label>&nbsp&nbspŽenski:&nbsp&nbsp</label><input type="radio" value="Zenski" name="Polv" id="Pol2v" /></td></tr>';
                s += '      <tr><th>Kontakt Telefon:</th><td><input type="text" name="KontaktTelefonv" id="KontaktTelefonv" style="margin:5px" /></td></tr>';
                s += '      <tr><th>Email:</th><td><input type="email" name="Emailv" id="Emailv" style="margin:5px" /></td></tr>';
                s += '       <tr><th>Godište automobila:</th><td><input type="text" name="GodisteAutomobila" id="GodisteAutomobila" style="margin:5px" /></td></tr>';
                s += '      <tr><th>Registarske oznake:</th><td><input type="text" name="BrojRegistarskeOznake" id="BrojRegistarskeOznake" style="margin:5px" /></td></tr>';
                s += '      <tr><th>Taxi broj:</th><td><input type="text" name="BrojTaksiVozila" id="BrojTaksiVozila" style="margin:5px" /></td></tr>';
                s += '      <tr><th>Vrsta vozila:</th><td><label>Putnički:&nbsp&nbsp</label><input type="radio" name="TipAutomobila" value="Putnički" id="TipAutomobila1" /><label>&nbsp&nbspKombi:&nbsp&nbsp</label><input type="radio" value="Kombi" name="TipAutomobila" id="TipAutomobila2" /></td></tr>';
                s += '      <tr><td colspan="2"><hr /></td></tr>';
                s += '      <tr><td colspan="2" align="right"><b><input type="button" value="Izmeni" id="izmenav" /></b></td></tr>';
                s += '   </table>';
                s += ' </div>';

                $('#glavni3').html(s);

                $('#KorisnickoImev').val(data.KorisnickoIme);
                $('#Lozinkav').val(data.Lozinka);
                $('#Imev').val(data.Ime);
                $('#Prezimev').val(data.Prezime);
                $('#JMBGv').val(data.JMBG);
                if (data.Pol == 0) {
                    $('#Pol1v').prop('checked', true);
                } else {
                    $('#Pol2v').prop('checked', true);
                }
                $('#KontaktTelefonv').val(data.KontaktTelefon);
                $('#Emailv').val(data.Email);
                $('#IdVozaca').val(data.Automobil.IdVozaca);
                $('#GodisteAutomobila').val(data.Automobil.GodisteAutomobila);
                $('#BrojRegistarskeOznake').val(data.Automobil.BrojRegistarskeOznake);
                $('#BrojTaksiVozila').val(data.Automobil.BrojTaksiVozila);
                if (data.Automobil.TipAutomobila == 0) {
                    $('#TipAutomobila1').prop('checked', true);
                } else {
                    $('#TipAutomobila2').prop('checked', true);
                }
                $('#glavni3').fadeIn(500);
            }
        })
    })
            //kraj linka izmeni



    $('#glavni3').on('click', '#izmenav', function () {

        //prvi validacija

        let uspeh = "da";
        let korisnickoIme = `${$('#KorisnickoImev').val()}`;
        let lozinka = `${$('#Lozinkav').val()}`;
        let ime = `${$('#Imev').val()}`;
        let prezime = `${$('#Prezimev').val()}`;
        let jmbg = `${$('#JMBGv').val()}`;
        let kontaktTelefon = `${$('#KontaktTelefonv').val()}`;
        let email = `${$('#Emailv').val()}`;
        let godisteAutomobila = `${$('#GodisteAutomobila').val()}`;
        let registarskeOznake = `${$('#BrojRegistarskeOznake').val()}`;
        let brojTaksiVozila = `${$('#BrojTaksiVozila').val()}`;


        if (korisnickoIme == "" || lozinka == "" || ime == "" || prezime == "" || jmbg == "" || kontaktTelefon == "" || email == "") {
            alert("Sva polja se moraju popuniti!");
            uspeh = "ne";
        } else {

            if (korisnickoIme.length < 3 || korisnickoIme.length > 15) {
                uspeh = "ne";
                $('#KorisnickoImev').css('background-color', '#ff7556');
                $('#KorisnickoImev').val("");
                $('#KorisnickoImev').attr('placeholder', 'Mora 3-15 slova!');
            } else {
                $('#KorisnickoImev').css('background-color', 'white');
                $('#KorisnickoImev').attr('placeholder', '');
            }

            if (lozinka.length < 4 || lozinka.length > 15) {
                uspeh = "ne";
                $('#Lozinkav').css('background-color', '#ff7556');
                $('#Lozinkav').val("");
                $('#Lozinkav').attr('placeholder', 'Mora 4-15 karaktera!');
            } else {
                $('#Lozinkav').css('background-color', 'white');
                $('#Lozinkav').attr('placeholder', '');
            }

            if (ime.length < 2 || ime.length > 15) {
                uspeh = "ne";
                $('#Imev').css('background-color', '#ff7556');
                $('#Imev').val("");
                $('#Imev').attr('placeholder', 'Mora 2-15 slova!');
            } else {
                $('#Imev').css('background-color', 'white');
                $('#Imev').attr('placeholder', '');
            }

            if (prezime.length < 3 || prezime.length > 15) {
                uspeh = "ne";
                $('#Prezimev').css('background-color', '#ff7556');
                $('#Prezimev').val("");
                $('#Prezimev').attr('placeholder', 'Mora 3-15 slova!');
            } else {
                $('#Prezimev').css('background-color', 'white');
                $('#Prezimev').attr('placeholder', '');
            }

            if (jmbg.length != 13) {
                uspeh = "ne";
                $('#JMBGv').css('background-color', '#ff7556');
                $('#JMBGv').val("");
                $('#JMBGv').attr('placeholder', 'Tačno 13 brojeva!');
            } else {
                if (isNaN(kontaktTelefon)) {
                    uspeh = "ne";
                    $('#JMBGv').css('background-color', '#ff7556');
                    $('#JMBGv').val("");
                    $('#JMBGv').attr('placeholder', 'Samo brojevi!');
                } else {
                    $('#JMBGv').css('background-color', 'white');
                    $('#JMBGv').attr('placeholder', '');
                }
            }

            if (kontaktTelefon.length < 6 || kontaktTelefon.length > 7) {
                uspeh = "ne";
                $('#KontaktTelefonv').css('background-color', '#ff7556');
                $('#KontaktTelefonv').val("");
                $('#KontaktTelefonv').attr('placeholder', 'Mora 6-7 brojeva!');
            } else {
                if (isNaN(kontaktTelefon)) {
                    uspeh = "ne";
                    $('#KontaktTelefonv').css('background-color', '#ff7556');
                    $('#KontaktTelefonv').val("");
                    $('#KontaktTelefonv').attr('placeholder', 'Samo brojevi!');
                } else {
                    $('#KontaktTelefonv').css('background-color', 'white');
                    $('#KontaktTelefonv').attr('placeholder', '');
                }
            }

            if (email.length < 6) {
                uspeh = "ne";
                $('#Emailv').css('background-color', '#ff7556');
                $('#Emailv').val("");
                $('#Emailv').attr('placeholder', 'Mora minimum 6 karaktera!');
            } else {
                let patern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);

                if (patern.test($("#Emailv").val())) {
                    $('#Emailv').css('background-color', 'white');
                    $('#Emailv').attr('placeholder', '');
                } else {
                    uspeh = "ne";
                    $('#Emailv').css('background-color', '#ff7556');
                    $('#Emailv').val("");
                    $('#Emailv').attr('placeholder', 'Nevalidna email adresa!');
                }
            }

            if (godisteAutomobila.length != 2 && godisteAutomobila.length != 4) {
                uspeh = "ne";
                $('#GodisteAutomobila').css('background-color', '#ff7556');
                $('#GodisteAutomobila').val("");
                $('#GodisteAutomobila').attr('placeholder', '2 ili 4 broja!');
            } else {
                $('#GodisteAutomobila').css('background-color', 'white');
                $('#GodisteAutomobila').attr('placeholder', '');
            }

            if (registarskeOznake.length < 9) {
                uspeh = "ne";
                $('#BrojRegistarskeOznake').css('background-color', '#ff7556');
                $('#BrojRegistarskeOznake').val("");
                $('#BrojRegistarskeOznake').attr('placeholder', 'Nevalidne tablice!');
            } else {
                let patern = new RegExp(/NS[-/_0-9]{4,9}TX$/i);
                if (patern.test($("#BrojRegistarskeOznake").val())) {
                    $('#BrojRegistarskeOznake').css('background-color', 'white');
                    $('#BrojRegistarskeOznake').attr('placeholder', '');
                } else {
                    uspeh = "ne";
                    $('#BrojRegistarskeOznake').css('background-color', '#ff7556');
                    $('#BrojRegistarskeOznake').val("");
                    $('#BrojRegistarskeOznake').attr('placeholder', 'Nevalidne tablice!');
                }

            }

            if (brojTaksiVozila.length < 3 || brojTaksiVozila.length > 5) {
                uspeh = "ne";
                $('#BrojTaksiVozila').css('background-color', '#ff7556');
                $('#BrojTaksiVozila').val("");
                $('#BrojTaksiVozila').attr('placeholder', 'Mora 3-5 brojeva!');
            } else {
                if (isNaN(brojTaksiVozila)) {
                    uspeh = "ne";
                    $('#BrojTaksiVozila').css('background-color', '#ff7556');
                    $('#BrojTaksiVozila').val("");
                    $('#BrojTaksiVozila').attr('placeholder', 'Samo brojevi!');
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
                                if (data[i].Automobil.BrojTaksiVozila == brojTaksiVozila && data[i].KorisnickoIme != `${localStorage.getItem("Ulogovan")}`) {
                                    $('#BrojTaksiVozila').css('background-color', '#ff7556');
                                    usao = "da";
                                    uspeh = "ne";
                                    alert("Broj taksi vozila koje ste uneli već postoji!"); 
                                    break;
                                }
                            }

                            if (usao == "ne") {
                                $('#BrojTaksiVozila').css('background-color', 'white');
                                $('#BrojTaksiVozila').attr('placeholder', '');

                            }

                            if (uspeh == "da") {


                                let pol;
                                if ($('#Pol1v').prop('checked')) {
                                    pol = 'Muski';
                                } else if ($('#Pol2v').prop('checked')) {
                                    pol = 'Zenski';
                                }
                                let tipAutomobila;
                                if ($('#TipAutomobila1').prop('checked')) {
                                    tipAutomobila = 'Putnicki';
                                } else if ($('#TipAutomobila2').prop('checked')) {
                                    tipAutomobila = 'Kombi';
                                }

                                let adresa = {
                                    UlicaBroj: korisnik.Lokacija.Adresa.UlicaBroj,
                                    NaseljenoMesto: korisnik.Lokacija.Adresa.NaseljenoMesto,
                                    PozivniBroj: korisnik.Lokacija.Adresa.PozivniBroj
                                }

                                let lokacija = {
                                    X: korisnik.Lokacija.X,
                                    Y: korisnik.Lokacija.Y,
                                    Adresa: adresa
                                }
                                let automobil = {
                                    IdVozaca: korisnickiId,
                                    GodisteAutomobila: `${$('#GodisteAutomobila').val()}`,
                                    BrojRegistarskeOznake: `${$('#BrojRegistarskeOznake').val()}`,
                                    BrojTaksiVozila: `${$('#BrojTaksiVozila').val()}`,
                                    TipAutomobila: tipAutomobila
                                }
                                let KorisnikIzmena = {
                                    Id: korisnickiId,
                                    KorisnickoIme: `${$('#KorisnickoImev').val()}`,
                                    Lozinka: `${$('#Lozinkav').val()}`,
                                    Ime: `${$('#Imev').val()}`,
                                    Prezime: `${$('#Prezimev').val()}`,
                                    Pol: pol,
                                    JMBG: `${$('#JMBGv').val()}`,
                                    KontaktTelefon: `${$('#KontaktTelefonv').val()}`,
                                    Email: `${$('#Emailv').val()}`,
                                    Uloga: 'Vozac',
                                    Voznje: 'nema',
                                    Banovan: `${"NE"}`,
                                    Lokacija: lokacija,
                                    Automobil: automobil,
                                    Zauzet: korisnik.Zauzet
                                };

                                $.ajax({
                                    type: 'PUT',
                                    url: '/api/Vozac/' + korisnickiId,
                                    data: JSON.stringify(KorisnikIzmena),
                                    contentType: 'application/json;charset=utf-8',
                                    dataType: 'json',
                                    success: function (data) {
                                        if (!data) {
                                            $('#KorisnickoImev').css('background-color', '#ff7556');
                                            alert("Korisničko ime koje zahtevate, već postoji!");
                                        } else {
                                            $('#KorisnickoIme').css('background-color', 'white');
                                            alert("Uspešno ste izmenili podatke!");
                                            localStorage.setItem("Ulogovan", KorisnikIzmena.KorisnickoIme);
                                        }
                                    }
                                })
                            }

                        }
                    })
                }
            }



        }
    })
            //kraj izmenii



    //KLIK NA DUGME U TABELI VOZACA USPESNA
    $(document).on('click', '.uspesnabtn', function () {
        let idVoznje = $(this).prop('name');
        idVoznja = idVoznje;
        //otvaram novi prozor za unos odredista i iznosa para

        let s = '';

        s += '<div>';
        s += `<table style="position:absolute;"><tr><th colspan="2" ><h2><b>Kraj vožnje</b></h2></th></tr>`;
        s += `<tr><th colspan="2"><h3>Unesite informacije o vožnji:</h3></th></tr>`;
        s += '<tr><th>Odredište X:</th><td><input type="text" name="konacnoX" id="konacnoX" style="margin:5px"/></td></tr>';
        s += '<tr><th>Odredište Y:</th><td><input type="text" name="konacnoY" id="konacnoY" style="margin:5px"/></td></tr>';
        s += '<tr><th>Ulica i broj:</th><td><input type="text" name="konacnoUlicaBroj" id="konacnoUlicaBroj" style="margin:5px"/></td></tr>';
        s += '<tr><th>Naseljeno mesto:</th><td><input type="text" name="konacnoNaseljenoMesto" id="konacnoNaseljenoMesto" style="margin:5px"/></td></tr>';
        s += '<tr><th>Pozivni broj:</th><td><input type="text" name="konacnoPozivniBroj" id="konacnoPozivniBroj" style="margin:5px"/></td></tr>';
        s += '<tr><th>Iznos novca:</th><td><input type="text" name="konacnoIznos" id="konacnoIznos" style="margin:5px"/></td></tr>';
        s += '<tr><td colspan="2" align="right"><input type="button" name="konacnoDodaj" id="konacnoDodaj" value="Završi"/></td></tr></table>';
        s += '</div>';

        $('#glavni3').hide();
        $('#glavni3').html(s);
        $('#glavni3').fadeIn(500);
    })

    $('#glavni3').on('click', '#konacnoDodaj', function () {
        let uspeh = "da";

        let iznos = `${$('#konacnoIznos').val()}`;

        if (iznos == "") {
            alert("Iznos se mora uneti!");
        }
        else {

            if (isNaN(iznos) || iznos < 0) {
                uspeh = "ne";
                $('#konacnoIznos').css('background-color', '#ff7556');
                $('#konacnoIznos').val("");
                $('#konacnoIznos').attr('placeholder', 'Nevalidan iznos!');
            } else {
                $('#konacnoIznos').css('background-color', 'white');
                $('#konacnoIznos').attr('placeholder', '');

            }

            if (uspeh == "da") {
                $.ajax({
                    type: 'GET',
                    url: '/api/Voznja/' + idVoznja,
                    //data: JSON.stringify({ "Id": `${idVoznja}` }),
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
                            UlicaBroj: `${$('#konacnoUlicaBroj').val()}`,
                            NaseljenoMesto: `${$('#konacnoNaseljenoMesto').val()}`,
                            PozivniBroj: `${$('#konacnoPozivniBroj').val()}`
                        }

                        let lok2 = {
                            X: `${$('#konacnoX').val()}`,
                            Y: `${$('#konacnoY').val()}`,
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
                            IdVoznje: `${data.IdVoznje}`,
                            DatumVreme: `${data.DatumVreme}`,
                            Lokacija: lok,
                            Automobil: `${data.TipAutomobila}`,
                            Musterija: `${data.Musterija}`,
                            Odrediste: lok2,
                            Dispecer: `${data.Dispecer}`,
                            Vozac: `${data.Vozac}`,
                            Iznos: `${$('#konacnoIznos').val()}`,
                            Komentar: kom,
                            StatusVoznje: 6//jer pri zavrsetku postaje uspesna (ako je kliknuto uspesno sto u ovom slucaju jeste)
                        }

                        //update voznje
                        $.ajax({
                            type: 'PUT',
                            url: '/api/Voznja/' + idVoznja,//idVoznja je lokalna koja mi cuva samo id voznje izmedju klika na otkazi i klika na dodaj komentar
                            data: JSON.stringify(VoznjaNakonObrade),
                            contentType: 'application/json;charset=utf-8',
                            dataType: 'json',
                            success: function () {
                                $.ajax({
                                    type: 'GET',
                                    url: '/api/Vozac',
                                    data: { KorisnickoIme: `${localStorage.getItem("Ulogovan")}` },
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
                                            Zauzet: "NE"
                                        }


                                        $.ajax({
                                            type: 'PUT',
                                            url: '/api/Vozac/' + dataV.Id,
                                            data: JSON.stringify(NovoStanjeVozac),
                                            contentType: 'application/json;charset=utf-8',
                                            dataType: 'json',
                                            success: function (data) {
                                                alert("Uspešno ste završili vožnju!");
                                                $(location).attr('href', 'main.html');
                                            }
                                        })
                                    }
                                })
                            }
                        })


                    }
                })
            }

        }
    })

    //KLIK NA DUGME U TABELI VOZACA USPESNA


    //KLIK NA DUGME NEUSPESNA U TABELI VOZACA
    $(document).on('click', '.neuspesnabtn', function () {
        let idVoznje = $(this).prop('name');
        idVoznja = idVoznje;

        $('#glavni3').hide();
        let s = '';
        s += '<div class="komentar">';
        s += '<table style="position:absolute;"><tr><td colspan="2"><label>Obavezno unesite komentar:</label></td></tr>';
        s += '<tr><td colspan="2"><textarea name="komentarNeuspesna" id="komentarNeuspesna" cols="30" rows="5" placeholder="Ovde unesite komentar" /></td></tr>';
        s += '<tr><td>Odaberite ocenu:</td><td><select name="komentarNeuspesnaOcene" id="komentarNeuspesnaOcene"><option value="0" data-toggle="tooltip" title="Ne želim da ocenim">0</option><option value="1" data-toggle="tooltip" title="Jako loše">1</option><option value="2" data-toggle="tooltip" title="Loše">2</option><option value="3" data-toggle="tooltip" title="Dobro">3</option><option value="4" data-toggle="tooltip" title="Vrlo dobro">4</option><option value="5" data-toggle="tooltip" title="Odlično">5</option></select></td></tr>';
        s += '<tr><td colspan="2"><input type="button" name="dodajKomNeuspesna" id="dodajKomNeuspesna" value="U redu"/></td></tr></table></div>';
        $('#glavni3').html(s);
        $('#glavni3').fadeIn(500);
    })

    $('#glavni3').on('click', '#dodajKomNeuspesna', function () {
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
                            Opis: `${$('#komentarNeuspesna').val()}`,
                            IdVoznje: `${idVoznja}`,
                            KorisnickoIme: `${localStorage.getItem("Ulogovan")}`,
                            Ocena: `${$('#komentarNeuspesnaOcene').val()}`
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
                            StatusVoznje: 5//voznja je neuspesna i to se update
                        }

                        $.ajax({
                            type: 'PUT',
                            url: '/api/Voznja/' + idVoznja,//idVoznja je lokalna koja mi cuva samo id voznje izmedju klika na otkazi i klika na dodaj komentar
                            data: JSON.stringify(KomentarOtkazaneVoznja),
                            contentType: 'application/json;charset=utf-8',
                            dataType: 'json',
                            success: function () {

                                //moram update vozaca da je slobodan
                                $.ajax({
                                    type: 'GET',
                                    url: '/api/Vozac',
                                    data: { KorisnickoIme: `${localStorage.getItem("Ulogovan")}` },
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
                                            Zauzet: "NE"
                                        }


                                        $.ajax({
                                            type: 'PUT',
                                            url: '/api/Vozac/' + dataV.Id,
                                            data: JSON.stringify(NovoStanjeVozac),
                                            contentType: 'application/json;charset=utf-8',
                                            dataType: 'json',
                                            success: function (data) {
                                                alert("Uspešno ste postavili status vožnje na neuspešna!");
                                                $(location).attr('href', 'main.html');
                                            }
                                        })
                                    }
                                })
                            }

                        })

                        break;//samo jednom cim je nadje vise nema potrebe da prolazi forom
                    }

                }
            }
        })
    })

            //KRAJ KLIK NA DUGME NEUSPESNA U TABELI VOZACA


    //VOZAC MENJA LOKACIJU
    $('#menjamLokaciju').click(function () {
        $('#glavni3').hide();

        let s = '';
        s += '<div id="lokacijaClass">';
        s += '  <table style="position:absolute;margin-left:3%;margin-top:3%;">';
        s += '     <tr ><th colspan="2">Unesite podatke o svojoj lokaciji:</th></tr>';
        s += '    <tr ><td colsapn="2"><hr /></td></tr>';
        s += '    <tr><td >Koordinata X:</td><td><input type="text" style="margin:5px;" name="vozacLokacijaX" id="vozacLokacijaX" /></td></tr';
        s += '    <tr><td>Koordinata Y:</td><td><input type="text" style="margin:5px;" name="vozacLokacijaY" id="vozacLokacijaY" /></td></tr>';
        s += '    <tr><td>Ulica i broj:</td><td><input type="text" style="margin:5px;" name="vozacUlicaBroj" id="vozacUlicaBroj" /></td></tr>';
        s += '     <tr><td>Naseljeno mesto:</td><td><input type="text" style="margin:5px;" name="vozacNaseljenoMesto" id="vozacNaseljenoMesto" /></td></tr>';
        s += '     <tr><td>Pozivni broj:</td><td><input type="text" style="margin:5px;" name="vozacPozivniBroj" id="vozacPozivniBroj" /></td></tr>';
        s += '     <tr><td colspan="2" align="right"><input type="button" style="margin:5px;" name="izmeniLokaciju" id="izmeniLokaciju" value="Promeni" /></td></tr>';
        s += ' </table>';
        s += ' </div>';

        $('#glavni3').html(s);

        $('#glavni3').fadeIn(500);
    })
    //klik na dugme Izmeni lokaciju

    $('#glavni3').on('click', '#izmeniLokaciju', function () {
        $.ajax({
            type: 'GET',
            url: '/api/Vozac',
            data: { KorisnickoIme: `${localStorage.getItem("Ulogovan")}` },
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (dataV) {
                if (dataV.Zauzet == "NE") {
                    let AdresaVozacMenjaLokaciju = {
                        UlicaBroj: `${$('#vozacUlicaBroj').val()}`,
                        NaseljenoMesto: `${$('#vozacNaseljenoMesto').val()}`,
                        PozivniBroj: `${$('#vozacPozivniBroj').val()}`
                    }

                    let LokacijaVozacMenjaLokaciju = {
                        X: `${$('#vozacLokacijaX').val()}`,
                        Y: `${$('#vozacLokacijaY').val()}`,
                        Adresa: AdresaVozacMenjaLokaciju
                    }

                    let Auto = {
                        IdVozaca: dataV.Id,
                        GodisteAutomobila: dataV.Automobil.GodisteAutomobila,
                        BrojRegistarskeOznake: dataV.Automobil.BrojRegistarskeOznake,
                        BrojTaksiVozila: dataV.Automobil.BrojTaksiVozila,
                        TipAutomobila: dataV.Automobil.TipAutomobila
                    }

                    let NovaLokacijaVozac = {
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
                        Lokacija: LokacijaVozacMenjaLokaciju,
                        Automobil: Auto,
                        Zauzet: `${dataV.Zauzet}`
                    }

                    $.ajax({
                        type: 'PUT',
                        url: '/api/Vozac/' + dataV.Id,
                        data: JSON.stringify(NovaLokacijaVozac),
                        contentType: 'application/json;charset=utf-8',
                        dataType: 'json',
                        success: function (data) {
                            if (!data) {
                                alert("Lokacija nije izmenjena!");
                            } else {
                                alert("Uspešno ste izmenili lokaciju!");
                            }
                        }
                    })
                } else {
                    alert("Vozač ne može promeniti lokaciju, jer je trenutno zauzet!");
                    $(location).attr('href', 'main.html');
                }
            }
        })

    })

            //KRAJ VOZAC MENJA LOKACIJU

    $('#mojeVozac').click(function () {
        $('#glavni3').hide();
        $.ajax({
            type: 'GET',
            url: '/api/Voznja',
            //data: JSON.stringify(korisnik.Id),
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (data) {
                let s = '';
                s += ' <div id="voznjeV" style="font-size:14px">';
                s += '<h3 style="margin-left:44%;position:absolute;"><b>Moje vožnje</b></h3>';
                s += '<table border=1 class="voznje boja"><tr><th>Id vožnje</th><th>Datum</th><th>Mušterija</th><th>Dispečer</th><th >Mesto polaska</th><th>Tip auta</th><th>Ordedište</th><th>Iznos</th><th>Komentar</th><th>Status vožnje</th><th>Opcije</th></tr>';

                for (let i = 0; i < data.length; i++) {
                    if (data[i].Vozac == `${localStorage.getItem("Ulogovan")}`) {
                        s += ("<tr><td>" + data[i].IdVoznje + "</td><td>" + data[i].DatumVreme + "</td>");

                        if (data[i].Musterija == "") {
                            s += '<td>/</td>';
                        } else {
                            s += ('<td>' + data[i].Musterija + '</td>');
                        }

                        if (data[i].Dispecer == "") {
                            s += '<td>/</td>';
                        } else {
                            s += ('<td>' + data[i].Dispecer + '</td>');
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

                        if (vratiStatusVoznje(data[i].StatusVoznje) == "Kreirana") {//copy paste ovde nece sigurno uci (msm u prvi slucaj jer cim ima njegov id ne moze biti kreirana (u tom stanju))
                            s += (`<input type="button" value="Prihvati" id="Prihvati" class="prihvatibtn" name=${data[i].IdVoznje} /><br /><br />`);
                        } else if (vratiStatusVoznje(data[i].StatusVoznje) == "Prihvaćena" || vratiStatusVoznje(data[i].StatusVoznje) == "Obradjena" || vratiStatusVoznje(data[i].StatusVoznje) == "Formirana") {
                            s += (`<input type="button" value=" Uspešna  " id="uspesna" class="uspesnabtn" name=${data[i].IdVoznje} /><br /><br />`);
                            s += (`<input type="button" value="Neuspešna" id="neuspesna" class="neuspesnabtn" name=${data[i].IdVoznje} /><br />`);
                        } else {
                            s += ("Nedostupne");
                        }
                        s += (`</td></tr>`);
                    }
                }

                s += '</table></div>';
                $('#glavni3').html(s);
            }
        })

        $('#glavni3').fadeIn(500);
    })

    $('#nacekanjuVozac').click(function () {
        $('#glavni3').hide();
        $.ajax({
            type: 'GET',
            url: '/api/Voznja',
            //data: JSON.stringify(korisnik.Id),
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (data) {
                //trazim ulogovanog da bi mogao ispitati njegovo zauzece zbog PRIHVATI dugmica
                $.ajax({
                    type: 'GET',
                    url: '/api/Vozac',
                    data: { KorisnickoIme: `${localStorage.getItem("Ulogovan")}` },
                    contentType: 'application/json;charset=utf-8',
                    dataType: 'json',
                    success: function (dataV) {
                        let s = '';
                        s += ' <div id="voznjeV" style="font-size:14px">';
                        s += '<h3 style="margin-left:44%;position:absolute;"><b>Vožnje na čekanju</b></h3>';
                        s += '<table border=1 class="voznje boja"><tr><th>Id vožnje</th><th>Datum</th><th>Mušterija</th><th>Dispečer</th><th >Mesto polaska</th><th>Tip auta</th><th>Ordedište</th><th>Iznos</th><th>Komentar</th><th>Status vožnje</th><th>Opcije</th></tr>';

                        for (let i = 0; i < data.length; i++) {
                            if (vratiStatusVoznje(data[i].StatusVoznje) == "Kreirana" && (dataV.Automobil.TipAutomobila == data[i].Automobil || data[i].Automobil == 2)) {
                                s += ("<tr><td>" + data[i].IdVoznje + "</td><td>" + data[i].DatumVreme + "</td>");

                                if (data[i].Musterija == "") {
                                    s += '<td>/</td>';
                                } else {
                                    s += ('<td>' + data[i].Musterija + '</td>');
                                }

                                if (data[i].Dispecer == "") {
                                    s += '<td>/</td>';
                                } else {
                                    s += ('<td>' + data[i].Dispecer + '</td>');
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
                                    s += (`<input type="button" value="Prihvati" id="Prihvati" class="prihvatibtn" name=${data[i].IdVoznje} /><br /><br />`);
                                } else {
                                    s += ("Nedostupne");
                                }
                                s += (`</td></tr>`);
                            }
                        }

                        s += '</table></div>';
                        $('#glavni3').html(s);
                    }
                })
            }
        })
        $('#glavni3').fadeIn(500);
    })

    //ya ovo iznad KAD VOZAC STISNE PRIHVATI!

    $(document).on('click', '.prihvatibtn', function () {
        let idVoznje = $(this).prop('name');

        $.ajax({
            type: 'GET',
            url: '/api/Vozac',
            data: { KorisnickoIme: `${localStorage.getItem("Ulogovan")}` },
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (dataV) {
                if (dataV.Zauzet == "NE") {
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
                                    url: '/api/Voznja/' + idVoznje,
                                    // data: JSON.stringify(KomentarOtkazaneVoznja),
                                    contentType: 'application/json;charset=utf-8',
                                    dataType: 'json',
                                    success: function (dataVZ) {

                                        let addr = {
                                            UlicaBroj: `${dataVZ.Lokacija.Adresa.UlicaBroj}`,
                                            NaseljenoMesto: `${dataVZ.Lokacija.Adresa.NaseljenoMesto}`,
                                            PozivniBroj: `${dataVZ.Lokacija.Adresa.PozivniBroj}`
                                        }

                                        let lok = {
                                            X: `${dataVZ.Lokacija.X}`,
                                            Y: `${dataVZ.Lokacija.Y}`,
                                            Adresa: addr
                                        }

                                        let addr2 = {
                                            UlicaBroj: `${dataVZ.Odrediste.Adresa.UlicaBroj}`,
                                            NaseljenoMesto: `${dataVZ.Odrediste.Adresa.NaseljenoMesto}`,
                                            PozivniBroj: `${dataVZ.Odrediste.Adresa.PozivniBroj}`
                                        }

                                        let lok2 = {
                                            X: `${dataVZ.Odrediste.X}`,
                                            Y: `${dataVZ.Odrediste.Y}`,
                                            Adresa: addr2
                                        }

                                        let kom = {
                                            Opis: `${dataVZ.Komentar.Opis}`,
                                            DatumObjave: `${dataVZ.Komentar.DatumObjave}`,
                                            IdVoznje: `${dataVZ.Komentar.IdVoznje}`,
                                            KorisnickoIme: `${dataVZ.Komentar.KorisnickoIme}`,
                                            Ocena: `${dataVZ.Komentar.Ocena}`
                                        }

                                        let VoznjaNakonObrade = {
                                            IdVoznje: idVoznje,
                                            DatumVreme: `${dataVZ.DatumVreme}`,
                                            Lokacija: lok,
                                            Automobil: `${dataVZ.TipAutomobila}`,
                                            Musterija: `${dataVZ.Musterija}`,
                                            Odrediste: lok2,
                                            Dispecer: "",
                                            Vozac: `${dataV.KorisnickoIme}`,
                                            Iznos: `${dataVZ.Iznos}`,
                                            Komentar: kom,
                                            StatusVoznje: 3//jer je prihvata vozac ide u stanje ptihvacena
                                        }

                                        //update voznje
                                        $.ajax({
                                            type: 'PUT',
                                            url: '/api/Voznja/' + idVoznje,
                                            data: JSON.stringify(VoznjaNakonObrade),
                                            contentType: 'application/json;charset=utf-8',
                                            dataType: 'json',
                                            success: function () {
                                                alert("Uspešno ste prihvatili vožnju!");
                                                $(location).attr('href', 'main.html');
                                            }
                                        })
                                    }
                                })
                            }
                        }
                    })
                } else {
                    alert("Ne možete prihvatiti vožnju, jer ste već zauzeti!");
                }
            }
        })

    })

            //KRAJ ya ovo iznad KAD VOZAC STISNE PRIHVATI!


})