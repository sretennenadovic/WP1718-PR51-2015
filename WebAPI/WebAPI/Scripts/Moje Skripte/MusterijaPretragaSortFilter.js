$(document).ready(function () {

    //PRETRAGA U KLIJENTU

    let prviProlaz;
    $('#pretragaKorisnik').click(function () {
        $('#map1').hide();
        $.ajax({
            type: 'GET',
            url: '/api/Registration',

            data: { KorisnickoIme: `${localStorage.getItem("Ulogovan")}` },
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (data) {
                if (data.Banovan == "NE") {
                    let s = '';
                    prviProlaz = "da";

                    s += '<div style="position:relative;" ><table  style="position:absolute;margin-left:50%;margin-top:70px;margin-right:-50%;transform: translate(-50%, -50%);width:60%;"><tr><th colspan="4" ><h3>Ovde možete izvršiti pretragu vožnji</h3></th></tr>';
                    s += '<tr><td  data-balloon="Datum od kog želite pretragu!" data-balloon-pos="down" style="width:30%;"><input type="date" name="datumPretragaOd" id="datumPretragaOd" placeholder="Datum OD" style="margin:5px;width:80%;"/></td><td   style="width:30%;"><input type="number" min="0" max="5" name="ocenaPretragaOd" id="ocenaPretragaOd" placeholder="Ocena OD" style="margin:5px;width:80%;"/></td><td style="width:30%;"><input type="number" name="cenaPretragaOd" id="cenaPretragaOd" placeholder="Cena OD" style="margin:5px;width:80%;" min="0" max="40000"/></td><td rawspan="3"></td></tr>';
                    s += '<tr><td  data-balloon="Datum do kog želite pretragu!" data-balloon-pos="down" style="width:30%;"><input type="date" name="datumPretragaDo" id="datumPretragaDo" placeholder="Datum DO" style="margin:5px;width:80%;"/></td><td  style="width:30%;"><input type="number" min="0" max="5" name="ocenaPretragaDo" id="ocenaPretragaDo" placeholder="Ocena DO" style="margin:5px;width:80%;"/></td><td style="width:30%;"><input type="number" name="cenaPretragaDo" id="cenaPretragaDo" placeholder="Cena DO" style="margin:5px;width:80%;" min="0" max="40000"/></td><td data-balloon="Ne moraju biti popunjeni svi parametri!" data-balloon-pos="down"><input type="button" name="traziKorisnik" id="traziKorisnik" value="Traži"/></td></tr>';
                    s += '</table></div>';


                    $('#glavni').hide();
                    $('#glavni').html(s);
                                $('#glavni').fadeIn(500);
                }
                else {
                    alert("Banovani ste sa ovog sajta!");
                    localStorage.setItem("Ulogovan", "");
                    $(location).attr('href', 'index.html');
                }
            }
        })
    })

    $('#glavni').on('click', '#traziKorisnik', function () {
        let s = '';
        s += '<div>';
        let niz = [];
        let niz2 = [];
        let niz3 = [];
        let nizSve = [];

        let datOd = `${$('#datumPretragaOd').val()}`;
        let datDo = `${$('#datumPretragaDo').val()}`;
        let ocenaOd = `${$('#ocenaPretragaOd').val()}`;
        let ocenaDo = `${$('#ocenaPretragaDo').val()}`;
        let cenaOd = `${$('#cenaPretragaOd').val()}`;
        let cenaDo = `${$('#cenaPretragaDo').val()}`;

        if (`${$('#datumPretragaOd').val()}` == "" && `${$('#datumPretragaDo').val()}` == "" && `${$('#ocenaPretragaOd').val()}` == "" && `${$('#ocenaPretragaDo').val()}` == "" && `${$('#cenaPretragaOd').val()}` == "" && `${$('#cenaPretragaDo').val()}` == "") {
            alert("Morate uneti bar 1 parametar po kome se vrši pretraga!");
        } else {
            if (`${$('#datumPretragaOd').val()}` != "" && `${$('#datumPretragaDo').val()}` == "") {
                datOd = `${$('#datumPretragaOd').val()}`;
                datDo = '2025-01-01';
            } else if (`${$('#datumPretragaOd').val()}` == "" && `${$('#datumPretragaDo').val()}` != "") {
                datDo = `${$('#datumPretragaDo').val()}`;
                datOd = '2010-01-01';
            }

            if (`${$('#ocenaPretragaOd').val()}` != "" && `${$('#ocenaPretragaDo').val()}` == "") {
                ocenaOd = `${$('#ocenaPretragaOd').val()}`;
                ocenaDo = '5';
            } else if (`${$('#ocenaPretragaOd').val()}` == "" && `${$('#ocenaPretragaDo').val()}` != "") {
                ocenaDo = `${$('#ocenaPretragaDo').val()}`;
                ocenaOd = '0';
            }

            if (`${$('#cenaPretragaOd').val()}` != "" && `${$('#cenaPretragaDo').val()}` == "") {
                cenaOd = `${$('#cenaPretragaOd').val()}`;
                cenaDo = '40000';
            } else if (`${$('#cenaPretragaOd').val()}` == "" && `${$('#cenaPretragaDo').val()}` != "") {
                cenaDo = `${$('#cenaPretragaDo').val()}`;
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
                            if (data[i].Musterija == `${localStorage.getItem("Ulogovan")}`) {
                                nizSve.push(data[i]);
                            }
                        }

                        if (nizSve.length != 0) {
                            for (var i = 0; i < nizSve.length; i++) {

                                if (`${$('#datumPretragaOd').val()}` == "" && `${$('#datumPretragaDo').val()}` == "") {
                                    niz.push(nizSve[i]);
                                } else {
                                    if (new Date(datOd) <= new Date(nizSve[i].DatumVreme.substring(0, 10)) && new Date(datDo) >= new Date(nizSve[i].DatumVreme.substring(0, 10))) {
                                        niz.push(nizSve[i]);
                                    }
                                }
                            }

                            if (niz.length != 0) {
                                for (var i = 0; i < niz.length; i++) {
                                    if (`${$('#ocenaPretragaOd').val()}` == "" && `${$('#ocenaPretragaDo').val()}` == "") {
                                        niz2.push(niz[i]);
                                    } else {
                                        if (niz[i].Komentar.Ocena != "") {
                                            if (ocenaOd <= niz[i].Komentar.Ocena && ocenaDo >= niz[i].Komentar.Ocena) {
                                                niz2.push(niz[i]);
                                            }
                                        }
                                    }
                                }

                                if (niz2.length != 0) {
                                    for (var i = 0; i < niz2.length; i++) {
                                        if (`${$('#cenaPretragaOd').val()}` == "" && `${$('#cenaPretragaDo').val()}` == "") {
                                            niz3.push(niz2[i]);
                                        } else {
                                            if (niz2[i].Iznos != "") {
                                                if (cenaOd <= niz2[i].Iznos && cenaDo >= niz2[i].Iznos) {
                                                    niz3.push(niz2[i]);
                                                }
                                            }
                                        }
                                    }

                                    if (niz3.length > 0) {

                                        let s = '';
                                        s += '<div class="voznje" style="font-size:14px;position:absolute;margin-top:120px;">';
                                        s += '<table border=1 class="voznje boja"><tr><th colspan="10"><h3><b>Rezultat pretrage</b></h3></th></tr>';
                                        s += '<tr><th>Id vožnje</th><th>Datum</th><th>Dispečer</th><th>Vozač</th><th >Mesto polaska</th><th>Tip auta</th><th>Ordedište</th><th>Iznos</th><th>Komentar</th><th>Status vožnje</th></tr>';


                                        for (let i = 0; i < niz3.length; i++) {

                                            s += ("<tr><td>" + niz3[i].IdVoznje + "</td><td>" + niz3[i].DatumVreme + "</td>");

                                            if (niz3[i].Dispecer == "") {
                                                s += '<td>/</td>';
                                            } else {
                                                s += ('<td>' + niz3[i].Dispecer + '</td>');
                                            }

                                            if (niz3[i].Vozac == "") {
                                                s += '<td>/</td>';
                                            } else {
                                                s += ('<td>' + niz3[i].Vozac + '</td>');
                                            }

                                            s += ('<td>' + niz3[i].Lokacija.Adresa.UlicaBroj + ", " + niz3[i].Lokacija.Adresa.NaseljenoMesto + " " + niz3[i].Lokacija.Adresa.PozivniBroj + "</td><td>");

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

                                            if (niz3[i].Odrediste.Adresa.UlicaBroj == "") {
                                                s += ("</td><td>/" + "</td>");
                                            }
                                            else {
                                                s += ("</td><td>" + niz3[i].Odrediste.Adresa.UlicaBroj + ", " + niz3[i].Odrediste.Adresa.NaseljenoMesto + " " + niz3[i].Odrediste.Adresa.PozivniBroj + "</td>");
                                            }

                                            if (niz3[i].Iznos != "0") {
                                                s += ("<td>" + niz3[i].Iznos + "</td>");
                                            } else {
                                                s += ("<td>/</td>");
                                            }

                                            s += ('<td><textarea rows="5" cols="30" disabled>');

                                            if (niz3[i].Komentar.Opis == "") {
                                                s += ("Komentar nije dodat!" + "</textarea ></td >");
                                            } else {
                                                s += ("Korisnicko ime: " + niz3[i].Komentar.KorisnickoIme + "\n\nOpis: " + niz3[i].Komentar.Opis + "\n\nOcena: " + niz3[i].Komentar.Ocena + "\nDatum: " + niz3[i].Komentar.DatumObjave + "</textarea ></td >");
                                            }

                                            s += ("<td>" + vratiStatusVoznje(niz3[i].StatusVoznje) + "</td></tr>");
                                        }
                                        s += '</table>';

                                        if (prviProlaz == "da") {
                                            $('#glavni').append(s);
                                            prviProlaz = "ne";
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


                }
            })

        }

    })

    //KRAJ PRETRAGA U KLIJENTU


    //FILTER U KLIJENTU

    let prviFilter;
    $('#filtrirajVoznje').click(function () {
        $('#map1').hide();
        $.ajax({
            type: 'GET',
            url: '/api/Registration',

            data: { KorisnickoIme: `${localStorage.getItem("Ulogovan")}` },
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (data) {
                if (data.Banovan == "NE") {

                    let s = '';
                    prviFilter = "da";

                    s += '<div style="position:relative;"><table style="position:absolute;margin-left:50%;margin-top:60px;margin-right:-50%;transform: translate(-50%, -50%);"><tr><th colspan="2" ><h3>Ovde možete izvršiti filtriranje po statusu vožnje</h3></th></tr>';
                    s += '<tr><td align="center"><select name="filterTip" id="filterTip"><option value="Kreirana">Kreirana</option><option value="Formirana">Formirana</option><option value="Obradjena">Obradjena</option><option value="Prihvaćena">Prihvaćena</option><option value="Otkazana">Otkazana</option><option value="Neuspešna">Neuspešna</option><option value="Uspešna">Uspešna</option></select></td><td><input type="button" name="filtriranje" id="filtriranje" value="Filtriraj"/></td></tr>';
                    s += '</table></div>';

                    $('#glavni').html(s);
                                $('#glavni').fadeIn(500);
                }
                else {
                    alert("Banovani ste sa ovog sajta!");
                    localStorage.setItem("Ulogovan", "");
                    $(location).attr('href', 'index.html');
                }
            }
        })

    })

    $('#glavni').on('click', '#filtriranje', function () {
        let data = [];
        $.ajax({
            type: 'GET',
            url: '/api/Voznja',
            //data: JSON.stringify(KomentarOtkazaneVoznja),
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (dataV) {
                if (dataV.length != 0) {

                    for (var i = 0; i < dataV.length; i++) {
                        if (vratiStatusVoznje(dataV[i].StatusVoznje) == `${$('#filterTip').val()}` && dataV[i].Musterija == `${localStorage.getItem("Ulogovan")}`) {
                            data.push(dataV[i]);
                        }
                    }

                    if (data.length > 0) {
                        let s = '';
                        s += '<div class="voznje" style="font-size:14px;position:absolute;margin-top:100px;">';
                        s += '<table border=1 class="voznje boja"><tr><th colspan="10"><h3><b>Rezultat filtriranja</b></h3></th></tr>';
                        s += '<tr><th>Id vožnje</th><th>Datum</th><th>Dispečer</th><th>Vozač</th><th >Mesto polaska</th><th>Tip auta</th><th>Ordedište</th><th>Iznos</th><th>Komentar</th><th>Status vožnje</th></tr>';

                        for (var i = 0; i < data.length; i++) {

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

                            s += ("<td>" + vratiStatusVoznje(data[i].StatusVoznje) + "</td></tr>");

                        }
                        s += '</table>';

                        if (prviFilter == "da") {
                            $('#glavni').append(s);
                            prviFilter = "ne";
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
        })

    })

    //KRAJ FILTERA U KLIJENTU


    //SORTIRAJ U KLIJENTU

    $('#sortirajDatum').click(function () {
        $('#map1').hide();
        $.ajax({
            type: 'GET',
            url: '/api/Registration',

            data: { KorisnickoIme: `${localStorage.getItem("Ulogovan")}` },
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (data) {
                if (data.Banovan == "NE") {

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
                                    if (data[i].Musterija == `${localStorage.getItem("Ulogovan")}`) {
                                        zasortiranje.push(data[i]);
                                    }
                                }

                                zasortiranje.sort(function (a, b) {
                                    return new Date(b.DatumVreme) - new Date(a.DatumVreme);
                                })

                                if (zasortiranje.length > 0) {
                                    let s = '';
                                    s += '<div class="voznje" style="font-size:14px;position:absolute;margin-top:0px;">';
                                    s += '<table border=1 class="voznje boja"><tr><th colspan="10"><h3><b>Rezultat sortiranja po datumu</b></h3></th></tr>';
                                    s += '<tr><th>Id vožnje</th><th>Datum</th><th>Dispečer</th><th>Vozač</th><th >Mesto polaska</th><th>Tip auta</th><th>Ordedište</th><th>Iznos</th><th>Komentar</th><th>Status vožnje</th></tr>';

                                    for (var i = 0; i < zasortiranje.length; i++) {
                                        s += ("<tr><td>" + zasortiranje[i].IdVoznje + "</td><td>" + zasortiranje[i].DatumVreme + "</td>");

                                        if (zasortiranje[i].Dispecer == "") {
                                            s += '<td>/</td>';
                                        } else {
                                            s += ('<td>' + zasortiranje[i].Dispecer + '</td>');
                                        }

                                        if (zasortiranje[i].Vozac == "") {
                                            s += '<td>/</td>';
                                        } else {
                                            s += ('<td>' + zasortiranje[i].Vozac + '</td>');
                                        }

                                        s += ('<td>' + zasortiranje[i].Lokacija.Adresa.UlicaBroj + ", " + zasortiranje[i].Lokacija.Adresa.NaseljenoMesto + " " + zasortiranje[i].Lokacija.Adresa.PozivniBroj + "</td><td>");

                                        switch (zasortiranje[i].Automobil) {
                                            case 0:
                                                s += "Putnički";
                                                break;
                                            case 1:
                                                s += "Kombi";
                                                break;
                                            case 2:
                                                s += "Svejedno";
                                        }

                                        if (zasortiranje[i].Odrediste.Adresa.UlicaBroj == "") {
                                            s += ("</td><td>/" + "</td>");
                                        }
                                        else {
                                            s += ("</td><td>" + zasortiranje[i].Odrediste.Adresa.UlicaBroj + ", " + zasortiranje[i].Odrediste.Adresa.NaseljenoMesto + " " + zasortiranje[i].Odrediste.Adresa.PozivniBroj + "</td>");
                                        }

                                        if (zasortiranje[i].Iznos != "0") {
                                            s += ("<td>" + zasortiranje[i].Iznos + "</td>");
                                        } else {
                                            s += ("<td>/</td>");
                                        }

                                        s += ('<td><textarea rows="5" cols="30" disabled>');

                                        if (zasortiranje[i].Komentar.Opis == "") {
                                            s += ("Komentar nije dodat!" + "</textarea ></td >");
                                        } else {
                                            s += ("Korisnicko ime: " + zasortiranje[i].Komentar.KorisnickoIme + "\n\nOpis: " + zasortiranje[i].Komentar.Opis + "\n\nOcena: " + zasortiranje[i].Komentar.Ocena + "\nDatum: " + zasortiranje[i].Komentar.DatumObjave + "</textarea ></td >");
                                        }

                                        s += ("<td>" + vratiStatusVoznje(zasortiranje[i].StatusVoznje) + "</td></tr>");
                                    }
                                    s += '</table>';

                                    $('#glavni').html(s);
                                } else {
                                    alert("Korisnik " + `${localStorage.getItem("Ulogovan")}` + ", nema registrovanih vožnji!");
                                }

                            } else {
                                alert("U sistemu ne postoji ni jedna vožnja!");
                            }
                        }
                                })
                }
                else {
                    alert("Banovani ste sa ovog sajta!");
                    localStorage.setItem("Ulogovan", "");
                    $(location).attr('href', 'index.html');
                }
            }
        })

    })

    $('#sortirajOcena').click(function () {
        $('#map1').hide();
        $.ajax({
            type: 'GET',
            url: '/api/Registration',

            data: { KorisnickoIme: `${localStorage.getItem("Ulogovan")}` },
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (data) {
                if (data.Banovan == "NE") {

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
                                    if (data[i].Musterija == `${localStorage.getItem("Ulogovan")}` && data[i].Komentar.Ocena != "") {
                                        zasortiranje.push(data[i]);
                                    }
                                }

                                zasortiranje.sort(function (a, b) {
                                    return b.Komentar.Ocena - a.Komentar.Ocena;
                                })

                                //cisto smestam one bez ocene na kraj tabele jer onako
                                for (var i = 0; i < data.length; i++) {
                                    if (data[i].Musterija == `${localStorage.getItem("Ulogovan")}` && data[i].Komentar.Ocena == "") {
                                        zasortiranje.push(data[i]);
                                    }
                                }

                                if (zasortiranje.length > 0) {
                                    let s = '';
                                    s += '<div class="voznje" style="font-size:14px;position:absolute;margin-top:0px;">';
                                    s += '<table border=1 class="voznje boja"><tr><th colspan="10"><h3><b>Rezultat sortiranja po ocenama</b></h3></th></tr>';
                                    s += '<tr><th>Id vožnje</th><th>Datum</th><th>Dispečer</th><th>Vozač</th><th >Mesto polaska</th><th>Tip auta</th><th>Ordedište</th><th>Iznos</th><th>Komentar</th><th>Status vožnje</th></tr>';

                                    for (var i = 0; i < zasortiranje.length; i++) {
                                        s += ("<tr><td>" + zasortiranje[i].IdVoznje + "</td><td>" + zasortiranje[i].DatumVreme + "</td>");

                                        if (zasortiranje[i].Dispecer == "") {
                                            s += '<td>/</td>';
                                        } else {
                                            s += ('<td>' + zasortiranje[i].Dispecer + '</td>');
                                        }

                                        if (zasortiranje[i].Vozac == "") {
                                            s += '<td>/</td>';
                                        } else {
                                            s += ('<td>' + zasortiranje[i].Vozac + '</td>');
                                        }

                                        s += ('<td>' + zasortiranje[i].Lokacija.Adresa.UlicaBroj + ", " + zasortiranje[i].Lokacija.Adresa.NaseljenoMesto + " " + zasortiranje[i].Lokacija.Adresa.PozivniBroj + "</td><td>");

                                        switch (zasortiranje[i].Automobil) {
                                            case 0:
                                                s += "Putnički";
                                                break;
                                            case 1:
                                                s += "Kombi";
                                                break;
                                            case 2:
                                                s += "Svejedno";
                                        }

                                        if (zasortiranje[i].Odrediste.Adresa.UlicaBroj == "") {
                                            s += ("</td><td>/" + "</td>");
                                        }
                                        else {
                                            s += ("</td><td>" + zasortiranje[i].Odrediste.Adresa.UlicaBroj + ", " + zasortiranje[i].Odrediste.Adresa.NaseljenoMesto + " " + zasortiranje[i].Odrediste.Adresa.PozivniBroj + "</td>");
                                        }

                                        if (zasortiranje[i].Iznos != "0") {
                                            s += ("<td>" + zasortiranje[i].Iznos + "</td>");
                                        } else {
                                            s += ("<td>/</td>");
                                        }

                                        s += ('<td><textarea rows="5" cols="30" disabled>');

                                        if (zasortiranje[i].Komentar.Opis == "") {
                                            s += ("Komentar nije dodat!" + "</textarea ></td >");
                                        } else {
                                            s += ("Korisnicko ime: " + zasortiranje[i].Komentar.KorisnickoIme + "\n\nOpis: " + zasortiranje[i].Komentar.Opis + "\n\nOcena: " + zasortiranje[i].Komentar.Ocena + "\nDatum: " + zasortiranje[i].Komentar.DatumObjave + "</textarea ></td >");
                                        }

                                        s += ("<td>" + vratiStatusVoznje(zasortiranje[i].StatusVoznje) + "</td></tr>");
                                    }
                                    s += '</table>';

                                    $('#glavni').html(s);

                                } else {
                                    alert("Korisnik " + `${localStorage.getItem("Ulogovan")}` + ", trenutno ne poseduje vožnju!");
                                }
                            } else {
                                alert("Nema vožnji u sistemu!");
                            }
                        }
                                })
                }
                else {
                    alert("Banovani ste sa ovog sajta!");
                    localStorage.setItem("Ulogovan", "");
                    $(location).attr('href', 'index.html');
                }
            }
        })

    })

            //KRAJ SORTIRAJ U KLIJENTU

})