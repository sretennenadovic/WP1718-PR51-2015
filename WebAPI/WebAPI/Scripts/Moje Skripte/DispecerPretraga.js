$(document).ready(function () {


    let prvi;
    $('#pretragaVozac').click(function () {
        let s = '';
        prvi = "da";

        s += '<div style="position:relative;"><table style="position:absolute;margin-left:50%;margin-top:60px;margin-right:-50%;transform: translate(-50%, -50%)"><tr><th colspan="3" ><h3>Ovde možete izvršiti pretragu vožnji</h3></th></tr>';
        s += '<tr><td  data-balloon="Neki od parametara može ostati prazan!" data-balloon-pos="down" ><input type="text" name="imeVozacaPretraga" id="imeVozacaPretraga" placeholder="Ime vozača" style="margin:5px"/></td><td  data-balloon="Neki od parametara može ostati prazan!" data-balloon-pos="down" ><input type="text" name="prezimeVozacaPretraga" id="prezimeVozacaPretraga" placeholder="Prezime vozača" style="margin:5px"/></td>';
        s += '<td colspan="2" align="right" data-balloon="Izvrši pretragu!" data-balloon-pos="down"><input type="button" name="pretraziVozaca" id="pretraziVozaca" value="Traži" style="margin:5px" /></td></tr>';
        s += '</table></div>';


        $('#glavni2').hide();
        $('#glavni2').html(s);
        $('#glavni2').fadeIn(500);

    })

    $('#glavni2').on('click', '#pretraziVozaca', function () {
        let s = '';
        s += '<div>';
        let niz = [];

        let slucaj;


        if (`${$('#imeVozacaPretraga').val()}` == "" && `${$('#prezimeVozacaPretraga').val()}` == "") {
            slucaj = 0;
        } else if (`${$('#imeVozacaPretraga').val()}` != "" && `${$('#prezimeVozacaPretraga').val()}` == "") {
            //punim niz svim Korisnickim Imenima koja su od ovog imena
            slucaj = 1;
        } else if (`${$('#imeVozacaPretraga').val()}` == "" && `${$('#prezimeVozacaPretraga').val()}` != "") {
            //punim niz svim Korisnickim Imenima koja su od ovog prezimena
            slucaj = 2;
        } else if (`${$('#imeVozacaPretraga').val()}` != "" && `${$('#prezimeVozacaPretraga').val()}` != "") {
            //punim niz svim Korisnickim Imenima koja su od ovog prezimena i imena
            slucaj = 3;
        }


        $.ajax({
            type: 'GET',
            url: '/api/Vozac',
            //data: JSON.stringify(KomentarOtkazaneVoznja),
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (dataV) {
                if (dataV.length > 0) {
                    if (slucaj == 0) {
                        $.ajax({
                            type: 'GET',
                            url: '/api/Voznja',
                            //data: JSON.stringify(KomentarOtkazaneVoznja),
                            contentType: 'application/json;charset=utf-8',
                            dataType: 'json',
                            success: function (data) {
                                let s = '';
                                s += '<div class="voznje" style="font-size:14px;position:absolute;margin-top:100px;">';
                                s += '<table border=1 class="voznje boja"><tr><th colspan="10" data-balloon="Kako niste odabrali parametre, vraćamo vam celu listu!" data-balloon-pos="up"><h3><b>Rezultat pretrage</b></h3></th></tr>';
                                s += '<tr><th>Id vožnje</th><th>Datum</th><th>Mušterija</th><th>Vozač</th><th >Mesto polaska</th><th>Tip auta</th><th>Ordedište</th><th>Iznos</th><th>Komentar</th><th>Status vožnje</th></tr>';


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

                                    s += ("<td>" + vratiStatusVoznje(data[i].StatusVoznje) + "</td> </tr>");


                                }
                                s += '</table>';
                                if (prvi == "da") {
                                    $('#glavni2').append(s);
                                    prvi = "ne";
                                } else {
                                    $('.voznje').replaceWith(s);
                                }
                            }
                        })

                    } else if (slucaj == 1) {
                        for (var i = 0; i < dataV.length; i++) {
                            if (dataV[i].Ime == `${$('#imeVozacaPretraga').val()}`) {
                                niz.push(dataV[i].KorisnickoIme);
                            }
                        }

                        $.ajax({
                            type: 'GET',
                            url: '/api/Voznja',
                            //data: JSON.stringify(KomentarOtkazaneVoznja),
                            contentType: 'application/json;charset=utf-8',
                            dataType: 'json',
                            success: function (data) {
                                let s = '';
                                s += '<div class="voznje" style="font-size:14px;position:absolute;margin-top:100px;">';
                                s += '<table border=1 class="voznje boja"><tr><th colspan="10"><h3><b>Rezultat pretrage</b></h3></th></tr>';
                                s += '<tr><th>Id vožnje</th><th>Datum</th><th>Mušterija</th><th>Vozač</th><th >Mesto polaska</th><th>Tip auta</th><th>Ordedište</th><th>Iznos</th><th>Komentar</th><th>Status vožnje</th></tr>';

                                let konacno = uporedi(niz, data);

                                if (konacno.length > 0) {
                                    for (let i = 0; i < konacno.length; i++) {

                                        s += ("<tr><td>" + konacno[i].IdVoznje + "</td><td>" + konacno[i].DatumVreme + "</td>");

                                        if (konacno[i].Musterija == "") {
                                            s += '<td>/</td>';
                                        } else {
                                            s += ('<td>' + konacno[i].Musterija + '</td>');
                                        }

                                        if (konacno[i].Vozac == "") {
                                            s += '<td>/</td>';
                                        } else {
                                            s += ('<td>' + konacno[i].Vozac + '</td>');
                                        }

                                        s += ('<td>' + konacno[i].Lokacija.Adresa.UlicaBroj + ", " + konacno[i].Lokacija.Adresa.NaseljenoMesto + " " + konacno[i].Lokacija.Adresa.PozivniBroj + "</td><td>");

                                        switch (konacno[i].Automobil) {
                                            case 0:
                                                s += "Putnički";
                                                break;
                                            case 1:
                                                s += "Kombi";
                                                break;
                                            case 2:
                                                s += "Svejedno";
                                        }

                                        if (konacno[i].Odrediste.Adresa.UlicaBroj == "") {
                                            s += ("</td><td>/" + "</td>");
                                        }
                                        else {
                                            s += ("</td><td>" + konacno[i].Odrediste.Adresa.UlicaBroj + ", " + konacno[i].Odrediste.Adresa.NaseljenoMesto + " " + konacno[i].Odrediste.Adresa.PozivniBroj + "</td>");
                                        }

                                        if (konacno[i].Iznos != "0") {
                                            s += ("<td>" + konacno[i].Iznos + "</td>");
                                        } else {
                                            s += ("<td>/</td>");
                                        }

                                        s += ('<td><textarea rows="5" cols="30" disabled>');

                                        if (konacno[i].Komentar.Opis == "") {
                                            s += ("Komentar nije dodat!" + "</textarea ></td >");
                                        } else {
                                            s += ("Korisnicko ime: " + konacno[i].Komentar.KorisnickoIme + "\n\nOpis: " + konacno[i].Komentar.Opis + "\n\nOcena: " + konacno[i].Komentar.Ocena + "\nDatum: " + konacno[i].Komentar.DatumObjave + "</textarea ></td >");
                                        }

                                        s += ("<td>" + vratiStatusVoznje(konacno[i].StatusVoznje) + "</td></tr>");


                                    }

                                    s += '</table>';
                                    if (prvi == "da") {
                                        $('#glavni2').append(s);
                                        prvi = "ne";
                                    } else {
                                        // $('.voznje').hide();
                                        $('.voznje').replaceWith(s);
                                    }
                                } else {
                                    alert("Sa imenom " + `${$('#imeVozacaPretraga').val()}` + " nije pronadjena ni jedna vožnja!");
                                    $(location).attr('href', 'main.html');
                                }
                            }
                        })


                    } else if (slucaj == 2) {
                        for (var i = 0; i < dataV.length; i++) {
                            if (dataV[i].Prezime == `${$('#prezimeVozacaPretraga').val()}`) {
                                niz.push(dataV[i].KorisnickoIme);
                            }
                        }

                        $.ajax({
                            type: 'GET',
                            url: '/api/Voznja',
                            //data: JSON.stringify(KomentarOtkazaneVoznja),
                            contentType: 'application/json;charset=utf-8',
                            dataType: 'json',
                            success: function (data) {
                                let s = '';
                                s += '<div class="voznje" style="font-size:14px;position:absolute;margin-top:100px;">';
                                s += '<table border=1 class="voznje boja"><tr><th colspan="10"><h3><b>Rezultat pretrage</b></h3></th></tr>';
                                s += '<tr><th>Id vožnje</th><th>Datum</th><th>Mušterija</th><th>Vozač</th><th >Mesto polaska</th><th>Tip auta</th><th>Ordedište</th><th>Iznos</th><th>Komentar</th><th>Status vožnje</th></tr>';

                                let konacno = uporedi(niz, data);

                                if (konacno.length > 0) {
                                    for (let i = 0; i < konacno.length; i++) {

                                        s += ("<tr><td>" + konacno[i].IdVoznje + "</td><td>" + konacno[i].DatumVreme + "</td>");

                                        if (konacno[i].Musterija == "") {
                                            s += '<td>/</td>';
                                        } else {
                                            s += ('<td>' + konacno[i].Musterija + '</td>');
                                        }

                                        if (konacno[i].Vozac == "") {
                                            s += '<td>/</td>';
                                        } else {
                                            s += ('<td>' + konacno[i].Vozac + '</td>');
                                        }

                                        s += ('<td>' + konacno[i].Lokacija.Adresa.UlicaBroj + ", " + konacno[i].Lokacija.Adresa.NaseljenoMesto + " " + konacno[i].Lokacija.Adresa.PozivniBroj + "</td><td>");

                                        switch (konacno[i].Automobil) {
                                            case 0:
                                                s += "Putnički";
                                                break;
                                            case 1:
                                                s += "Kombi";
                                                break;
                                            case 2:
                                                s += "Svejedno";
                                        }

                                        if (konacno[i].Odrediste.Adresa.UlicaBroj == "") {
                                            s += ("</td><td>/" + "</td>");
                                        }
                                        else {
                                            s += ("</td><td>" + konacno[i].Odrediste.Adresa.UlicaBroj + ", " + konacno[i].Odrediste.Adresa.NaseljenoMesto + " " + konacno[i].Odrediste.Adresa.PozivniBroj + "</td>");
                                        }

                                        if (konacno[i].Iznos != "0") {
                                            s += ("<td>" + konacno[i].Iznos + "</td>");
                                        } else {
                                            s += ("<td>/</td>");
                                        }

                                        s += ('<td><textarea rows="5" cols="30" disabled>');

                                        if (konacno[i].Komentar.Opis == "") {
                                            s += ("Komentar nije dodat!" + "</textarea ></td >");
                                        } else {
                                            s += ("Korisnicko ime: " + konacno[i].Komentar.KorisnickoIme + "\n\nOpis: " + konacno[i].Komentar.Opis + "\n\nOcena: " + konacno[i].Komentar.Ocena + "\nDatum: " + konacno[i].Komentar.DatumObjave + "</textarea ></td >");
                                        }

                                        s += ("<td>" + vratiStatusVoznje(konacno[i].StatusVoznje) + "</td></tr>");


                                    }

                                    s += '</table>';
                                    if (prvi == "da") {
                                        $('#glavni2').append(s);
                                        prvi = "ne";
                                    } else {
                                        // $('.voznje').hide();
                                        $('.voznje').replaceWith(s);
                                    }
                                } else {
                                    alert("Sa prezimenom " + `${$('#prezimeVozacaPretraga').val()}` + " nije pronadjena ni jedna vožnja!");
                                    $(location).attr('href', 'main.html');
                                }
                            }
                        })
                    } else if (slucaj == 3) {
                        for (var i = 0; i < dataV.length; i++) {
                            if (dataV[i].Prezime == `${$('#prezimeVozacaPretraga').val()}` && dataV[i].Ime == `${$('#imeVozacaPretraga').val()}`) {
                                niz.push(dataV[i].KorisnickoIme);
                            }
                        }

                        $.ajax({
                            type: 'GET',
                            url: '/api/Voznja',
                            //data: JSON.stringify(KomentarOtkazaneVoznja),
                            contentType: 'application/json;charset=utf-8',
                            dataType: 'json',
                            success: function (data) {
                                let s = '';
                                s += '<div class="voznje" style="font-size:14px;position:absolute;margin-top:100px;">';
                                s += '<table border=1 class="voznje boja"><tr><th colspan="10"><h3><b>Rezultat pretrage</b></h3></th></tr>';
                                s += '<tr><th>Id vožnje</th><th>Datum</th><th>Mušterija</th><th>Vozač</th><th >Mesto polaska</th><th>Tip auta</th><th>Ordedište</th><th>Iznos</th><th>Komentar</th><th>Status vožnje</th></tr>';

                                let konacno = uporedi(niz, data);

                                if (konacno.length > 0) {
                                    for (let i = 0; i < konacno.length; i++) {

                                        s += ("<tr><td>" + konacno[i].IdVoznje + "</td><td>" + konacno[i].DatumVreme + "</td>");

                                        if (konacno[i].Musterija == "") {
                                            s += '<td>/</td>';
                                        } else {
                                            s += ('<td>' + konacno[i].Musterija + '</td>');
                                        }

                                        if (konacno[i].Vozac == "") {
                                            s += '<td>/</td>';
                                        } else {
                                            s += ('<td>' + konacno[i].Vozac + '</td>');
                                        }

                                        s += ('<td>' + konacno[i].Lokacija.Adresa.UlicaBroj + ", " + konacno[i].Lokacija.Adresa.NaseljenoMesto + " " + konacno[i].Lokacija.Adresa.PozivniBroj + "</td><td>");

                                        switch (konacno[i].Automobil) {
                                            case 0:
                                                s += "Putnički";
                                                break;
                                            case 1:
                                                s += "Kombi";
                                                break;
                                            case 2:
                                                s += "Svejedno";
                                        }

                                        if (konacno[i].Odrediste.Adresa.UlicaBroj == "") {
                                            s += ("</td><td>/" + "</td>");
                                        }
                                        else {
                                            s += ("</td><td>" + konacno[i].Odrediste.Adresa.UlicaBroj + ", " + konacno[i].Odrediste.Adresa.NaseljenoMesto + " " + konacno[i].Odrediste.Adresa.PozivniBroj + "</td>");
                                        }

                                        if (konacno[i].Iznos != "0") {
                                            s += ("<td>" + konacno[i].Iznos + "</td>");
                                        } else {
                                            s += ("<td>/</td>");
                                        }

                                        s += ('<td><textarea rows="5" cols="30" disabled>');

                                        if (konacno[i].Komentar.Opis == "") {
                                            s += ("Komentar nije dodat!" + "</textarea ></td >");
                                        } else {
                                            s += ("Korisnicko ime: " + konacno[i].Komentar.KorisnickoIme + "\n\nOpis: " + konacno[i].Komentar.Opis + "\n\nOcena: " + konacno[i].Komentar.Ocena + "\nDatum: " + konacno[i].Komentar.DatumObjave + "</textarea ></td >");
                                        }

                                        s += ("<td>" + vratiStatusVoznje(konacno[i].StatusVoznje) + "</td></tr>");


                                    }

                                    s += '</table>';
                                    if (prvi == "da") {
                                        $('#glavni2').append(s);
                                        prvi = "ne";
                                    } else {
                                        // $('.voznje').hide();
                                        $('.voznje').replaceWith(s);
                                    }
                                } else {
                                    alert("Sa imenom " + `${$('#imeVozacaPretraga').val()}` + " i prezimenom " + `${$('#prezimeVozacaPretraga').val()}` + " nije pronadjena ni jedna vožnja!");
                                    $(location).attr('href', 'main.html');
                                }
                            }
                        })
                    }
                } else {
                    alert("Nema vozača u sistemu!");
                    $(location).attr('href', 'main.html');
                }
            }
        })
    })


    //pretraga musterije

    let prviMusterija;
    $('#pretragaMusterija').click(function () {
        let s = '';
        prviMusterija = "da";

        s += '<div style="position:relative;"><table style="position:absolute;margin-left:50%;margin-top:60px;margin-right:-50%;transform: translate(-50%, -50%)"><tr><th colspan="3" ><h3>Ovde možete izvršiti pretragu vožnji</h3></th></tr>';
        s += '<tr><td  data-balloon="Neki od parametara može ostati prazan!" data-balloon-pos="down" ><input type="text" name="imeMusterijePretraga" id="imeMusterijePretraga" placeholder="Ime mušterije" style="margin:5px"/></td><td  data-balloon="Neki od parametara može ostati prazan!" data-balloon-pos="down" ><input type="text" name="prezimeMusterijePretraga" id="prezimeMusterijePretraga" placeholder="Prezime mušterije" style="margin:5px"/></td>';
        s += '<td colspan="2" align="right" data-balloon="Izvrši pretragu!" data-balloon-pos="down"><input type="button" name="pretraziMusteriju" id="pretraziMusteriju" value="Traži" style="margin:5px" /></td></tr>';
        s += '</table></div>';


        $('#glavni2').hide();
        $('#glavni2').html(s);
        $('#glavni2').fadeIn(500);

    })

    $('#glavni2').on('click', '#pretraziMusteriju', function () {
        let s = '';
        s += '<div>';
        let niz = [];

        let slucaj;


        if (`${$('#imeMusterijePretraga').val()}` == "" && `${$('#prezimeMusterijePretraga').val()}` == "") {
            slucaj = 0;
        } else if (`${$('#imeMusterijePretraga').val()}` != "" && `${$('#prezimeMusterijePretraga').val()}` == "") {
            //punim niz svim Korisnickim Imenima koja su od ovog imena
            slucaj = 1;
        } else if (`${$('#imeMusterijePretraga').val()}` == "" && `${$('#prezimeMusterijePretraga').val()}` != "") {
            //punim niz svim Korisnickim Imenima koja su od ovog prezimena
            slucaj = 2;
        } else if (`${$('#imeMusterijePretraga').val()}` != "" && `${$('#prezimeMusterijePretraga').val()}` != "") {
            //punim niz svim Korisnickim Imenima koja su od ovog prezimena i imena
            slucaj = 3;
        }


        $.ajax({
            type: 'GET',
            url: '/api/Registration',
            //data: JSON.stringify(KomentarOtkazaneVoznja),
            contentType: 'application/json;charset=utf-8',
            dataType: 'json',
            success: function (dataV) {
                if (dataV.length > 0) {
                    if (slucaj == 0) {
                        $.ajax({
                            type: 'GET',
                            url: '/api/Voznja',
                            //data: JSON.stringify(KomentarOtkazaneVoznja),
                            contentType: 'application/json;charset=utf-8',
                            dataType: 'json',
                            success: function (data) {
                                let s = '';
                                s += '<div class="voznje" style="font-size:14px;position:absolute;margin-top:100px;">';
                                s += '<table border=1 class="voznje boja"><tr><th colspan="10" data-balloon="Kako niste odabrali parametre, vraćamo vam celu listu!" data-balloon-pos="up"><h3><b>Rezultat pretrage</b></h3></th></tr>';
                                s += '<tr><th>Id vožnje</th><th>Datum</th><th>Mušterija</th><th>Vozač</th><th >Mesto polaska</th><th>Tip auta</th><th>Ordedište</th><th>Iznos</th><th>Komentar</th><th>Status vožnje</th></tr>';


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

                                    s += ("<td>" + vratiStatusVoznje(data[i].StatusVoznje) + "</td> </tr>");


                                }
                                s += '</table>';
                                if (prviMusterija == "da") {
                                    $('#glavni2').append(s);
                                    prviMusterija = "ne";
                                } else {
                                    $('.voznje').replaceWith(s);
                                }
                            }
                        })

                    } else if (slucaj == 1) {
                        for (var i = 0; i < dataV.length; i++) {
                            if (dataV[i].Ime == `${$('#imeMusterijePretraga').val()}`) {
                                niz.push(dataV[i].KorisnickoIme);
                            }
                        }

                        $.ajax({
                            type: 'GET',
                            url: '/api/Voznja',
                            //data: JSON.stringify(KomentarOtkazaneVoznja),
                            contentType: 'application/json;charset=utf-8',
                            dataType: 'json',
                            success: function (data) {
                                let s = '';
                                s += '<div class="voznje" style="font-size:14px;position:absolute;margin-top:100px;">';
                                s += '<table border=1 class="voznje boja"><tr><th colspan="10"><h3><b>Rezultat pretrage</b></h3></th></tr>';
                                s += '<tr><th>Id vožnje</th><th>Datum</th><th>Mušterija</th><th>Vozač</th><th >Mesto polaska</th><th>Tip auta</th><th>Ordedište</th><th>Iznos</th><th>Komentar</th><th>Status vožnje</th></tr>';

                                let konacno = uporediMusterija(niz, data);

                                if (konacno.length > 0) {
                                    for (let i = 0; i < konacno.length; i++) {

                                        s += ("<tr><td>" + konacno[i].IdVoznje + "</td><td>" + konacno[i].DatumVreme + "</td>");

                                        if (konacno[i].Musterija == "") {
                                            s += '<td>/</td>';
                                        } else {
                                            s += ('<td>' + konacno[i].Musterija + '</td>');
                                        }

                                        if (konacno[i].Vozac == "") {
                                            s += '<td>/</td>';
                                        } else {
                                            s += ('<td>' + konacno[i].Vozac + '</td>');
                                        }

                                        s += ('<td>' + konacno[i].Lokacija.Adresa.UlicaBroj + ", " + konacno[i].Lokacija.Adresa.NaseljenoMesto + " " + konacno[i].Lokacija.Adresa.PozivniBroj + "</td><td>");

                                        switch (konacno[i].Automobil) {
                                            case 0:
                                                s += "Putnički";
                                                break;
                                            case 1:
                                                s += "Kombi";
                                                break;
                                            case 2:
                                                s += "Svejedno";
                                        }

                                        if (konacno[i].Odrediste.Adresa.UlicaBroj == "") {
                                            s += ("</td><td>/" + "</td>");
                                        }
                                        else {
                                            s += ("</td><td>" + konacno[i].Odrediste.Adresa.UlicaBroj + ", " + konacno[i].Odrediste.Adresa.NaseljenoMesto + " " + konacno[i].Odrediste.Adresa.PozivniBroj + "</td>");
                                        }

                                        if (konacno[i].Iznos != "0") {
                                            s += ("<td>" + konacno[i].Iznos + "</td>");
                                        } else {
                                            s += ("<td>/</td>");
                                        }

                                        s += ('<td><textarea rows="5" cols="30" disabled>');

                                        if (konacno[i].Komentar.Opis == "") {
                                            s += ("Komentar nije dodat!" + "</textarea ></td >");
                                        } else {
                                            s += ("Korisnicko ime: " + konacno[i].Komentar.KorisnickoIme + "\n\nOpis: " + konacno[i].Komentar.Opis + "\n\nOcena: " + konacno[i].Komentar.Ocena + "\nDatum: " + konacno[i].Komentar.DatumObjave + "</textarea ></td >");
                                        }

                                        s += ("<td>" + vratiStatusVoznje(konacno[i].StatusVoznje) + "</td></tr>");


                                    }

                                    s += '</table>';
                                    if (prviMusterija == "da") {
                                        $('#glavni2').append(s);
                                        prviMusterija = "ne";
                                    } else {
                                        // $('.voznje').hide();
                                        $('.voznje').replaceWith(s);
                                    }
                                } else {
                                    alert("Sa imenom " + `${$('#imeMusterijePretraga').val()}` + " nije pronadjena ni jedna vožnja!");
                                    $(location).attr('href', 'main.html');
                                }
                            }
                        })


                    } else if (slucaj == 2) {
                        for (var i = 0; i < dataV.length; i++) {
                            if (dataV[i].Prezime == `${$('#prezimeMusterijePretraga').val()}`) {
                                niz.push(dataV[i].KorisnickoIme);
                            }
                        }

                        $.ajax({
                            type: 'GET',
                            url: '/api/Voznja',
                            //data: JSON.stringify(KomentarOtkazaneVoznja),
                            contentType: 'application/json;charset=utf-8',
                            dataType: 'json',
                            success: function (data) {
                                let s = '';
                                s += '<div class="voznje" style="font-size:14px;position:absolute;margin-top:100px;">';
                                s += '<table border=1 class="voznje boja"><tr><th colspan="10"><h3><b>Rezultat pretrage</b></h3></th></tr>';
                                s += '<tr><th>Id vožnje</th><th>Datum</th><th>Mušterija</th><th>Vozač</th><th >Mesto polaska</th><th>Tip auta</th><th>Ordedište</th><th>Iznos</th><th>Komentar</th><th>Status vožnje</th></tr>';

                                let konacno = uporediMusterija(niz, data);

                                if (konacno.length > 0) {
                                    for (let i = 0; i < konacno.length; i++) {

                                        s += ("<tr><td>" + konacno[i].IdVoznje + "</td><td>" + konacno[i].DatumVreme + "</td>");

                                        if (konacno[i].Musterija == "") {
                                            s += '<td>/</td>';
                                        } else {
                                            s += ('<td>' + konacno[i].Musterija + '</td>');
                                        }

                                        if (konacno[i].Vozac == "") {
                                            s += '<td>/</td>';
                                        } else {
                                            s += ('<td>' + konacno[i].Vozac + '</td>');
                                        }

                                        s += ('<td>' + konacno[i].Lokacija.Adresa.UlicaBroj + ", " + konacno[i].Lokacija.Adresa.NaseljenoMesto + " " + konacno[i].Lokacija.Adresa.PozivniBroj + "</td><td>");

                                        switch (konacno[i].Automobil) {
                                            case 0:
                                                s += "Putnički";
                                                break;
                                            case 1:
                                                s += "Kombi";
                                                break;
                                            case 2:
                                                s += "Svejedno";
                                        }

                                        if (konacno[i].Odrediste.Adresa.UlicaBroj == "") {
                                            s += ("</td><td>/" + "</td>");
                                        }
                                        else {
                                            s += ("</td><td>" + konacno[i].Odrediste.Adresa.UlicaBroj + ", " + konacno[i].Odrediste.Adresa.NaseljenoMesto + " " + konacno[i].Odrediste.Adresa.PozivniBroj + "</td>");
                                        }

                                        if (konacno[i].Iznos != "0") {
                                            s += ("<td>" + konacno[i].Iznos + "</td>");
                                        } else {
                                            s += ("<td>/</td>");
                                        }

                                        s += ('<td><textarea rows="5" cols="30" disabled>');

                                        if (konacno[i].Komentar.Opis == "") {
                                            s += ("Komentar nije dodat!" + "</textarea ></td >");
                                        } else {
                                            s += ("Korisnicko ime: " + konacno[i].Komentar.KorisnickoIme + "\n\nOpis: " + konacno[i].Komentar.Opis + "\n\nOcena: " + konacno[i].Komentar.Ocena + "\nDatum: " + konacno[i].Komentar.DatumObjave + "</textarea ></td >");
                                        }

                                        s += ("<td>" + vratiStatusVoznje(konacno[i].StatusVoznje) + "</td></tr>");


                                    }

                                    s += '</table>';
                                    if (prviMusterija == "da") {
                                        $('#glavni2').append(s);
                                        prviMusterija = "ne";
                                    } else {
                                        // $('.voznje').hide();
                                        $('.voznje').replaceWith(s);
                                    }
                                } else {
                                    alert("Sa prezimenom " + `${$('#prezimeMusterijePretraga').val()}` + " nije pronadjena ni jedna vožnja!");
                                    $(location).attr('href', 'main.html');
                                }
                            }
                        })
                    } else if (slucaj == 3) {
                        for (var i = 0; i < dataV.length; i++) {
                            if (dataV[i].Prezime == `${$('#prezimeMusterijePretraga').val()}` && dataV[i].Ime == `${$('#imeMusterijePretraga').val()}`) {
                                niz.push(dataV[i].KorisnickoIme);
                            }
                        }

                        $.ajax({
                            type: 'GET',
                            url: '/api/Voznja',
                            //data: JSON.stringify(KomentarOtkazaneVoznja),
                            contentType: 'application/json;charset=utf-8',
                            dataType: 'json',
                            success: function (data) {
                                let s = '';
                                s += '<div class="voznje" style="font-size:14px;position:absolute;margin-top:100px;">';
                                s += '<table border=1 class="voznje boja"><tr><th colspan="10"><h3><b>Rezultat pretrage</b></h3></th></tr>';
                                s += '<tr><th>Id vožnje</th><th>Datum</th><th>Mušterija</th><th>Vozač</th><th >Mesto polaska</th><th>Tip auta</th><th>Ordedište</th><th>Iznos</th><th>Komentar</th><th>Status vožnje</th></tr>';

                                let konacno = uporediMusterija(niz, data);

                                if (konacno.length > 0) {
                                    for (let i = 0; i < konacno.length; i++) {

                                        s += ("<tr><td>" + konacno[i].IdVoznje + "</td><td>" + konacno[i].DatumVreme + "</td>");

                                        if (konacno[i].Musterija == "") {
                                            s += '<td>/</td>';
                                        } else {
                                            s += ('<td>' + konacno[i].Musterija + '</td>');
                                        }

                                        if (konacno[i].Vozac == "") {
                                            s += '<td>/</td>';
                                        } else {
                                            s += ('<td>' + konacno[i].Vozac + '</td>');
                                        }

                                        s += ('<td>' + konacno[i].Lokacija.Adresa.UlicaBroj + ", " + konacno[i].Lokacija.Adresa.NaseljenoMesto + " " + konacno[i].Lokacija.Adresa.PozivniBroj + "</td><td>");

                                        switch (konacno[i].Automobil) {
                                            case 0:
                                                s += "Putnički";
                                                break;
                                            case 1:
                                                s += "Kombi";
                                                break;
                                            case 2:
                                                s += "Svejedno";
                                        }

                                        if (konacno[i].Odrediste.Adresa.UlicaBroj == "") {
                                            s += ("</td><td>/" + "</td>");
                                        }
                                        else {
                                            s += ("</td><td>" + konacno[i].Odrediste.Adresa.UlicaBroj + ", " + konacno[i].Odrediste.Adresa.NaseljenoMesto + " " + konacno[i].Odrediste.Adresa.PozivniBroj + "</td>");
                                        }

                                        if (konacno[i].Iznos != "0") {
                                            s += ("<td>" + konacno[i].Iznos + "</td>");
                                        } else {
                                            s += ("<td>/</td>");
                                        }

                                        s += ('<td><textarea rows="5" cols="30" disabled>');

                                        if (konacno[i].Komentar.Opis == "") {
                                            s += ("Komentar nije dodat!" + "</textarea ></td >");
                                        } else {
                                            s += ("Korisnicko ime: " + konacno[i].Komentar.KorisnickoIme + "\n\nOpis: " + konacno[i].Komentar.Opis + "\n\nOcena: " + konacno[i].Komentar.Ocena + "\nDatum: " + konacno[i].Komentar.DatumObjave + "</textarea ></td >");
                                        }

                                        s += ("<td>" + vratiStatusVoznje(konacno[i].StatusVoznje) + "</td></tr>");


                                    }

                                    s += '</table>';
                                    if (prviMusterija == "da") {
                                        $('#glavni2').append(s);
                                        prviMusterija = "ne";
                                    } else {
                                        // $('.voznje').hide();
                                        $('.voznje').replaceWith(s);
                                    }
                                } else {
                                    alert("Sa imenom " + `${$('#imeMusterijePretraga').val()}` + " i prezimenom " + `${$('#prezimeMusterijePretraga').val()}` + " nije pronadjena ni jedna vožnja!");
                                    $(location).attr('href', 'main.html');
                                }
                            }
                        })
                    }
                } else {
                    alert("Nema mušterija u sistemu!");
                    $(location).attr('href', 'main.html');
                }
            }
        })
    })



})

function uporedi(atr1, atr2) {
    const atr3 = [];

    atr1.forEach((e1) => atr2.forEach((e2) => {
        if (e1 == e2.Vozac) {
            atr3.push(e2)
        }
    }

    ));
    return atr3;
}

function uporediMusterija(atr1, atr2) {
    const atr3 = [];

    atr1.forEach((e1) => atr2.forEach((e2) => {
        if (e1 == e2.Musterija) {
            atr3.push(e2)
        }
    }

    ));
    return atr3;
}
