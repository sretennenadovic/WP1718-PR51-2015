let idVoznja;
$(document).ready(function () {
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


})