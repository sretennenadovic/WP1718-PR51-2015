$(document).ready(function () {

    //PRETRAGA U KLIJENTU

    let prviProlaz;
    $('#pretragaKorisnik').click(function () {
        if ($("#textKom").parents("#glavni").length == 1) {
            if ($("#textKom").val() == "") {
                alert("Prvo popunite komentar!");
            }
        }
        else {

            $('#map1').hide();
            $.ajax({
                type: 'GET',
                url: '/api/Registration',

                data: { KorisnickoIme: `${localStorage.getItem("Ulogovan")}` },
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                success: function (data) {
                    if (data.Banovan === "NE") {
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
            });
        }
    });

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

        if (`${$('#datumPretragaOd').val()}` === "" && `${$('#datumPretragaDo').val()}` === "" && `${$('#ocenaPretragaOd').val()}` === "" && `${$('#ocenaPretragaDo').val()}` === "" && `${$('#cenaPretragaOd').val()}` === "" && `${$('#cenaPretragaDo').val()}` === "") {
            alert("Morate uneti bar 1 parametar po kome se vrši pretraga!");
        } else {
            if (`${$('#datumPretragaOd').val()}` !== "" && `${$('#datumPretragaDo').val()}` === "") {
                datOd = `${$('#datumPretragaOd').val()}`;
                datDo = '2025-01-01';
            } else if (`${$('#datumPretragaOd').val()}` === "" && `${$('#datumPretragaDo').val()}` !== "") {
                datDo = `${$('#datumPretragaDo').val()}`;
                datOd = '2010-01-01';
            }

            if (`${$('#ocenaPretragaOd').val()}` !== "" && `${$('#ocenaPretragaDo').val()}` === "") {
                ocenaOd = `${$('#ocenaPretragaOd').val()}`;
                ocenaDo = '5';
            } else if (`${$('#ocenaPretragaOd').val()}` === "" && `${$('#ocenaPretragaDo').val()}` !== "") {
                ocenaDo = `${$('#ocenaPretragaDo').val()}`;
                ocenaOd = '0';
            }

            if (`${$('#cenaPretragaOd').val()}` !== "" && `${$('#cenaPretragaDo').val()}` === "") {
                cenaOd = `${$('#cenaPretragaOd').val()}`;
                cenaDo = '40000';
            } else if (`${$('#cenaPretragaOd').val()}` === "" && `${$('#cenaPretragaDo').val()}` !== "") {
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
                            if (data[i].Musterija === `${localStorage.getItem("Ulogovan")}`) {
                                nizSve.push(data[i]);
                            }
                        }

                        if (nizSve.length !== 0) {
                            for (var j = 0; j < nizSve.length; j++) {

                                if (`${$('#datumPretragaOd').val()}` === "" && `${$('#datumPretragaDo').val()}` === "") {
                                    niz.push(nizSve[j]);
                                } else {
                                    if (new Date(datOd) <= new Date(nizSve[j].DatumVreme.substring(0, 10)) && new Date(datDo) >= new Date(nizSve[j].DatumVreme.substring(0, 10))) {
                                        niz.push(nizSve[j]);
                                    }
                                }
                            }

                            if (niz.length !== 0) {
                                for (var k = 0; k < niz.length; k++) {
                                    if (`${$('#ocenaPretragaOd').val()}` === "" && `${$('#ocenaPretragaDo').val()}` === "") {
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
                                        if (`${$('#cenaPretragaOd').val()}` === "" && `${$('#cenaPretragaDo').val()}` === "") {
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
                                        s += '<tr><th>Id vožnje</th><th>Datum</th><th>Dispečer</th><th>Vozač</th><th >Mesto polaska</th><th>Tip auta</th><th>Ordedište</th><th>Iznos</th><th>Komentar</th><th>Status vožnje</th></tr>';


                                        for (let i = 0; i < niz3.length; i++) {

                                            s += ("<tr><td>" + niz3[i].IdVoznje + "</td><td>");

                                            var currentdate = new Date(Date.parse(niz3[i].DatumVreme));
                                            var datum = currentdate.getFullYear() + "/" + ("0" + (currentdate.getMonth() + 1)).slice(-2) + "/" + ("0" + currentdate.getDate()).slice(-2);
                                            var vreme = ("0" + currentdate.getHours()).slice(-2) + ":" + ("0" + currentdate.getMinutes()).slice(-2);

                                            s += ("" + datum + " " + vreme + "</td>");

                                            if (niz3[i].Dispecer === "") {
                                                s += '<td>/</td>';
                                            } else {
                                                s += '<td>' + niz3[i].Dispecer + '</td>';
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

                                        if (prviProlaz === "da") {
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


                },
                error: function (ret1) {
                    alert("Greska: " + ret1.responseText);
                }
            });

        }

    });

    //KRAJ PRETRAGA U KLIJENTU


    //FILTER U KLIJENTU

    let prviFilter;
    $('#filtrirajVoznje').click(function () {
        if ($("#textKom").parents("#glavni").length == 1) {
            if ($("#textKom").val() == "") {
                alert("Prvo popunite komentar!");
            }
        }
        else {

            $('#map1').hide();
            $.ajax({
                type: 'GET',
                url: '/api/Registration',

                data: { KorisnickoIme: `${localStorage.getItem("Ulogovan")}` },
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                success: function (data) {
                    if (data.Banovan === "NE") {

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
            });
        }

    });

    $('#glavni').on('click', '#filtriranje', function () {
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
                        if (vratiStatusVoznje(dataV[i].StatusVoznje) === `${$('#filterTip').val()}` && dataV[i].Musterija === `${localStorage.getItem("Ulogovan")}`) {
                            data.push(dataV[i]);
                        }
                    }

                    if (data.length > 0) {
                        let s = '';
                        s += '<div class="voznje" style="font-size:14px;position:absolute;margin-top:100px;">';
                        s += '<table border=1 class="voznje boja"><tr><th colspan="10"><h3><b>Rezultat filtriranja</b></h3></th></tr>';
                        s += '<tr><th>Id vožnje</th><th>Datum</th><th>Dispečer</th><th>Vozač</th><th >Mesto polaska</th><th>Tip auta</th><th>Ordedište</th><th>Iznos</th><th>Komentar</th><th>Status vožnje</th></tr>';

                        for (var j = 0; j < data.length; j++) {

                            s += ("<tr><td>" + data[j].IdVoznje + "</td><td>");

                            var currentdate = new Date(Date.parse(data[j].DatumVreme));
                            var datum = currentdate.getFullYear() + "/" + ("0" + (currentdate.getMonth() + 1)).slice(-2) + "/" + ("0" + currentdate.getDate()).slice(-2);
                            var vreme = ("0" + currentdate.getHours()).slice(-2) + ":" + ("0" + currentdate.getMinutes()).slice(-2);

                            s += ("" + datum + " " + vreme + "</td>");

                            if (data[j].Dispecer === "") {
                                s += '<td>/</td>';
                            } else {
                                s += '<td>' + data[j].Dispecer + '</td>';
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

                        if (prviFilter === "da") {
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
        });

    });

    //KRAJ FILTERA U KLIJENTU


    //SORTIRAJ U KLIJENTU

    $('#sortirajDatum').click(function () {
        if ($("#textKom").parents("#glavni").length == 1) {
            if ($("#textKom").val() == "") {
                alert("Prvo popunite komentar!");
            }
        }
        else {

            $('#map1').hide();
            $.ajax({
                type: 'GET',
                url: '/api/Registration',

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
                                        if (data[i].Musterija === `${localStorage.getItem("Ulogovan")}`) {
                                            zasortiranje.push(data[i]);
                                        }
                                    }

                                    zasortiranje.sort(function (a, b) {
                                        return new Date(b.DatumVreme) - new Date(a.DatumVreme);
                                    });

                                    if (zasortiranje.length > 0) {
                                        let s = '';
                                        s += '<div class="voznje" style="font-size:14px;position:absolute;margin-top:0px;">';
                                        s += '<table border=1 class="voznje boja"><tr><th colspan="10"><h3><b>Rezultat sortiranja po datumu</b></h3></th></tr>';
                                        s += '<tr><th>Id vožnje</th><th>Datum</th><th>Dispečer</th><th>Vozač</th><th >Mesto polaska</th><th>Tip auta</th><th>Ordedište</th><th>Iznos</th><th>Komentar</th><th>Status vožnje</th></tr>';

                                        for (var k = 0; k < zasortiranje.length; k++) {
                                            s += ("<tr><td>" + zasortiranje[k].IdVoznje + "</td><td>");

                                            var currentdate = new Date(Date.parse(zasortiranje[k].DatumVreme));
                                            var datum = currentdate.getFullYear() + "/" + ("0" + (currentdate.getMonth() + 1)).slice(-2) + "/" + ("0" + currentdate.getDate()).slice(-2);
                                            var vreme = ("0" + currentdate.getHours()).slice(-2) + ":" + ("0" + currentdate.getMinutes()).slice(-2);

                                            s += ("" + datum + " " + vreme + "</td>");

                                            if (zasortiranje[k].Dispecer === "") {
                                                s += '<td>/</td>';
                                            } else {
                                                s += '<td>' + zasortiranje[k].Dispecer + '</td>';
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

                                        $('#glavni').html(s);
                                        $('#glavni').fadeIn(500);
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
        }

    });

    $('#sortirajOcena').click(function () {
        if ($("#textKom").parents("#glavni").length == 1) {
            if ($("#textKom").val() == "") {
                alert("Prvo popunite komentar!");
            }
        }
        else {

            $('#map1').hide();
            $.ajax({
                type: 'GET',
                url: '/api/Registration',

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
                                        if (data[i].Musterija === `${localStorage.getItem("Ulogovan")}` && data[i].Komentar.Ocena !== "") {
                                            zasortiranje.push(data[i]);
                                        }
                                    }

                                    zasortiranje.sort(function (a, b) {
                                        return b.Komentar.Ocena - a.Komentar.Ocena;
                                    });

                                    //cisto smestam one bez ocene na kraj tabele jer onako
                                    for (var k = 0; k < data.length; k++) {
                                        if (data[k].Musterija === `${localStorage.getItem("Ulogovan")}` && data[k].Komentar.Ocena === "") {
                                            zasortiranje.push(data[k]);
                                        }
                                    }

                                    if (zasortiranje.length > 0) {
                                        let s = '';
                                        s += '<div class="voznje" style="font-size:14px;position:absolute;margin-top:0px;">';
                                        s += '<table border=1 class="voznje boja"><tr><th colspan="10"><h3><b>Rezultat sortiranja po ocenama</b></h3></th></tr>';
                                        s += '<tr><th>Id vožnje</th><th>Datum</th><th>Dispečer</th><th>Vozač</th><th >Mesto polaska</th><th>Tip auta</th><th>Ordedište</th><th>Iznos</th><th>Komentar</th><th>Status vožnje</th></tr>';

                                        for (var j = 0; j < zasortiranje.length; j++) {
                                            s += ("<tr><td>" + zasortiranje[j].IdVoznje + "</td><td>");

                                            var currentdate = new Date(Date.parse(zasortiranje[j].DatumVreme));
                                            var datum = currentdate.getFullYear() + "/" + ("0" + (currentdate.getMonth() + 1)).slice(-2) + "/" + ("0" + currentdate.getDate()).slice(-2);
                                            var vreme = ("0" + currentdate.getHours()).slice(-2) + ":" + ("0" + currentdate.getMinutes()).slice(-2);

                                            s += ("" + datum + " " + vreme + "</td>");

                                            if (zasortiranje[j].Dispecer === "") {
                                                s += '<td>/</td>';
                                            } else {
                                                s += '<td>' + zasortiranje[j].Dispecer + '</td>';
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

                                        $('#glavni').html(s);
                                        $('#glavni').fadeIn(500);


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
        }

    });

    //KRAJ SORTIRAJ U KLIJENTU

});