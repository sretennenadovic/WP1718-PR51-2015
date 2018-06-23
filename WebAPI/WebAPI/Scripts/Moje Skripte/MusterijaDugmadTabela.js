
$(document).ready(function () {

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