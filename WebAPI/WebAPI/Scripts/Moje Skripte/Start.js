function vratiStatusVoznje(id) {
    switch (id) {
        case 0: return "Kreirana";
        case 1: return "Formirana";
        case 2: return "Obradjena";
        case 3: return "Prihvaćena";
        case 4: return "Otkazana";
        case 5: return "Neuspešna";
        case 6: return "Uspešna";
        case 7: return "Utoku";
    }
}

function proveriUlogovanog() {
    let korisnickoIme = localStorage.getItem("Ulogovan");
    if (korisnickoIme === "") {
        $(location).attr('href', 'index.html');
    }
}

proveriUlogovanog();



$(document).ready(function () {
    $('#vozac').hide();
    $('#dispecer').hide();
    $('#korisnik').hide();
    $('#map1').hide();


    let korisnik;
    let korisnickoIme = localStorage.getItem("Ulogovan");

    let korisnickiId;


    //pomocu korisnickog imena yahtevam preko get metode od servera da mi vrati celog korisnika (dole u ajaxu nastavak)
    let Korisnik = {
        KorisnickoIme: `${korisnickoIme}`
    };

    $.ajax({
        type: 'GET',
        url: '/api/LogIn',
        data: { KorisnickoIme: `${localStorage.getItem("Ulogovan")}` },
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        success: function (data) {
            if (data !== null) {
                korisnik = data;// MORAM IZBACITI JER SVAKI PUT IDE GET
                korisnickiId = data.Id;
                //prikaz odredjenog diva za odredjenu ulogu korisnika
                if (korisnik.Uloga === 0) {
                    $('#vozac').hide();
                    $('#dispecer').hide();
                    $('#korisnik').show();
                    //zahtev za voznjama ako je korisnik musterija
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
                                if (data[i].Musterija === localStorage.getItem("Ulogovan")) {
                                    s += ("<tr><td>" + data[i].IdVoznje + "</td><td>");

                                    var currentdate = new Date(Date.parse(data[i].DatumVreme));
                                    var datum = currentdate.getFullYear() + "/" + ("0" + (currentdate.getMonth() + 1)).slice(-2) + "/" + ("0" + currentdate.getDate()).slice(-2);
                                    var vreme = ("0" + currentdate.getHours()).slice(-2) + ":" + ("0" + currentdate.getMinutes()).slice(-2);

                                    s += ("" + datum + " " + vreme + "</td>");

                                    if (data[i].Dispecer === "") {
                                        s += '<td>/</td>';
                                    } else {
                                        s += '<td>' + data[i].Dispecer + '</td>';
                                    }

                                    if (data[i].Vozac === "") {
                                        s += '<td>/</td>';
                                    } else {
                                        s += '<td>' + data[i].Vozac + '</td>';
                                    }

                                    s += '<td>' + data[i].Lokacija.Adresa.UlicaBroj + ", " + data[i].Lokacija.Adresa.NaseljenoMesto + " " + data[i].Lokacija.Adresa.PozivniBroj + "</td><td>";

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

                                    if (data[i].Odrediste.Adresa.UlicaBroj === "") {
                                        s += "<td>/" + "</td>";
                                    }
                                    else {
                                        s += "<td>" + data[i].Odrediste.Adresa.UlicaBroj + ", " + data[i].Odrediste.Adresa.NaseljenoMesto + " " + data[i].Odrediste.Adresa.PozivniBroj + "</td>";
                                    }

                                    if (data[i].Iznos !== "0") {
                                        s += "<td>" + data[i].Iznos + "</td>";
                                    } else {
                                        s += "<td>/</td>";
                                    }

                                    s += '<td><textarea rows="5" cols="30" disabled>';

                                    if (data[i].Komentar.Opis === "") {
                                        s += "Komentar nije dodat!" + "</textarea ></td >";
                                    } else {
                                        s += "Korisnicko ime: " + data[i].Komentar.KorisnickoIme + "\n\nOpis: " + data[i].Komentar.Opis + "\n\nOcena: " + data[i].Komentar.Ocena + "\nDatum: " + data[i].Komentar.DatumObjave + "</textarea ></td >";
                                    }

                                    s += "<td>" + vratiStatusVoznje(data[i].StatusVoznje) + "</td> <td>";

                                    if (vratiStatusVoznje(data[i].StatusVoznje) === "Kreirana") {
                                        s += `<input type="button" value="Odustani" id="odustani" class="obtn" name=${data[i].IdVoznje} /><br /><br />`;
                                        s += `<input type="button" value="  Izmeni " id="izmeniV" class="ibtn" name=${data[i].IdVoznje} />`;
                                    } else if (vratiStatusVoznje(data[i].StatusVoznje) === "Uspešna") {
                                        s += `<input type="button" value=" Komentar " id="dodajKomentarUspesna" class="kombtn" name=${data[i].IdVoznje} />`;
                                    } else {
                                        s += "Nedostupne";
                                    }
                                    s += `</td></tr>`;
                                }
                            }

                            s += '</table></div>';
                            $('#glavni').append(s);
                        },
                        error: function (ret1) {
                            alert("Greska: " + ret1.responseText);
                        }
                    });
                } else if (korisnik.Uloga === 1) {
                    $('#vozac').hide();
                    $('#korisnik').hide();
                    $('#dispecer').show();
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
                                if (data[i].Dispecer === localStorage.getItem("Ulogovan")) {
                                    s += ("<tr><td>" + data[i].IdVoznje + "</td><td>");

                                    var currentdate = new Date(Date.parse(data[i].DatumVreme));
                                    var datum = currentdate.getFullYear() + "/" + ("0" + (currentdate.getMonth() + 1)).slice(-2) + "/" + ("0" + currentdate.getDate()).slice(-2);
                                    var vreme = ("0" + currentdate.getHours()).slice(-2) + ":" + ("0" + currentdate.getMinutes()).slice(-2);

                                    s += ("" + datum + " " + vreme + "</td>");

                                    if (data[i].Musterija === "") {
                                        s += '<td>/</td>';
                                    } else {
                                        s += '<td>' + data[i].Musterija + '</td>';
                                    }

                                    if (data[i].Vozac === "") {
                                        s += '<td>/</td>';
                                    } else {
                                        s += '<td>' + data[i].Vozac + '</td>';
                                    }

                                    s += '<td>' + data[i].Lokacija.Adresa.UlicaBroj + ", " + data[i].Lokacija.Adresa.NaseljenoMesto + " " + data[i].Lokacija.Adresa.PozivniBroj + "</td><td>";

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

                                    if (data[i].Odrediste.Adresa.UlicaBroj === "") {
                                        s += "</td><td>/" + "</td>";
                                    }
                                    else {
                                        s += "</td><td>" + data[i].Odrediste.Adresa.UlicaBroj + ", " + data[i].Odrediste.Adresa.NaseljenoMesto + " " + data[i].Odrediste.Adresa.PozivniBroj + "</td>";
                                    }

                                    if (data[i].Iznos !== "0") {
                                        s += "<td>" + data[i].Iznos + "</td>";
                                    } else {
                                        s += "<td>/</td>";
                                    }

                                    s += '<td><textarea rows="5" cols="30" disabled>';

                                    if (data[i].Komentar.Opis === "") {
                                        s += "Komentar nije dodat!" + "</textarea ></td >";
                                    } else {
                                        s += "Korisnicko ime: " + data[i].Komentar.KorisnickoIme + "\n\nOpis: " + data[i].Komentar.Opis + "\n\nOcena: " + data[i].Komentar.Ocena + "\nDatum: " + data[i].Komentar.DatumObjave + "</textarea ></td >";
                                    }

                                    s += "<td>" + vratiStatusVoznje(data[i].StatusVoznje) + "</td> <td>";

                                    if (vratiStatusVoznje(data[i].StatusVoznje) === "Kreirana") {
                                        s += `<input type="button" value="Obradi" id="obradi" class="obradibtn" name=${data[i].IdVoznje} /><br /><br />`;
                                    } else {
                                        s += "Nedostupne";
                                    }
                                    s += `</td></tr>`;
                                }
                            }

                            s += '</table>';
                            $('#glavni2').append(s);
                        },
                        error: function (ret1) {
                            alert("Greska: " + ret1.responseText);
                        }
                    });
                } else {
                    $('#korisnik').hide();
                    $('#dispecer').hide();
                    $('#vozac').show();

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
                                if (data[i].Vozac === localStorage.getItem("Ulogovan")) {
                                    s += ("<tr><td>" + data[i].IdVoznje + "</td><td>");

                                    var currentdate = new Date(Date.parse(data[i].DatumVreme));
                                    var datum = currentdate.getFullYear() + "/" + ("0" + (currentdate.getMonth() + 1)).slice(-2) + "/" + ("0" + currentdate.getDate()).slice(-2);
                                    var vreme = ("0" + currentdate.getHours()).slice(-2) + ":" + ("0" + currentdate.getMinutes()).slice(-2);

                                    s += ("" + datum + " " + vreme + "</td>");

                                    if (data[i].Musterija === "") {
                                        s += '<td>/</td>';
                                    } else {
                                        s += '<td>' + data[i].Musterija + '</td>';
                                    }

                                    if (data[i].Dispecer === "") {
                                        s += '<td>/</td>';
                                    } else {
                                        s += '<td>' + data[i].Dispecer + '</td>';
                                    }

                                    s += '<td>' + data[i].Lokacija.Adresa.UlicaBroj + ", " + data[i].Lokacija.Adresa.NaseljenoMesto + " " + data[i].Lokacija.Adresa.PozivniBroj + "</td><td>";

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

                                    if (data[i].Odrediste.Adresa.UlicaBroj === "") {
                                        s += "</td><td>/" + "</td>";
                                    }
                                    else {
                                        s += "</td><td>" + data[i].Odrediste.Adresa.UlicaBroj + ", " + data[i].Odrediste.Adresa.NaseljenoMesto + " " + data[i].Odrediste.Adresa.PozivniBroj + "</td>";
                                    }

                                    if (data[i].Iznos !== "0") {
                                        s += "<td>" + data[i].Iznos + "</td>";
                                    } else {
                                        s += "<td>/</td>";
                                    }

                                    s += '<td><textarea rows="5" cols="30" disabled>';

                                    if (data[i].Komentar.Opis === "") {
                                        s += "Komentar nije dodat!" + "</textarea ></td >";
                                    } else {
                                        s += "Korisnicko ime: " + data[i].Komentar.KorisnickoIme + "\n\nOpis: " + data[i].Komentar.Opis + "\n\nOcena: " + data[i].Komentar.Ocena + "\nDatum: " + data[i].Komentar.DatumObjave + "</textarea ></td >";
                                    }

                                    s += "<td>" + vratiStatusVoznje(data[i].StatusVoznje) + "</td> <td>";

                                    if (vratiStatusVoznje(data[i].StatusVoznje) === "Kreirana" && data[i].Zauzet !== "DA") {//ovo ovde cu ostaviti ne steti ali nije ispravno!
                                        s += `<input type="button" value="Prihvati" id="Prihvati" class="prihvatibtn" name=${data[i].IdVoznje} /><br /><br />`;
                                    } else if (vratiStatusVoznje(data[i].StatusVoznje) === "Prihvaćena" || vratiStatusVoznje(data[i].StatusVoznje) === "Obradjena" || vratiStatusVoznje(data[i].StatusVoznje) === "Formirana") {
                                        s += `<input type="button" value=" Uspešna  " id="uspesna" class="uspesnabtn" name=${data[i].IdVoznje} /><br /><br />`;
                                        s += `<input type="button" value="Neuspešna" id="neuspesna" class="neuspesnabtn" name=${data[i].IdVoznje} /><br />`;
                                    } else {
                                        s += "Nedostupne";
                                    }
                                    s += `</td></tr>`;
                                }
                            }

                            s += '</table></div>';
                            $('#glavni3').append(s);
                        },
                        error: function (ret1) {
                            alert("Greska: " + ret1.responseText);
                        }
                    });
                }
            }
        }
    });

    //ZA LOG OUT CISTO DA STOJI ODVOJEN OD OSTALIH
    $('#odjavi,#odjavid,#odjaviv').click(function () {
        localStorage.setItem("Ulogovan", "");
        $(location).attr('href', 'index.html');

    });


});