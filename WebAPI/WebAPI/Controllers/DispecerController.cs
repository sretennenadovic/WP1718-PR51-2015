﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Hosting;
using System.Web.Http;
using WebAPI.Models;
using static WebAPI.Models.Enumi;

namespace WebAPI.Controllers
{
    public class DispecerController : ApiController
    {

        public Korisnik Get(string KorisnickoIme)
        {
            Dispecer k = null;

           foreach (Dispecer item in Dispeceri.list.Values)
            {
                if (KorisnickoIme.Equals(item.KorisnickoIme))
                {
                    k = item;
                    break;
                }
            }
            return k;
        }

        //pri update (izmeni) dispecera
        public bool Put(int Id,[FromBody]Korisnik korisnik)
        {

            int idKorisnika = Id;
            string pol;
            string uloga;
            bool nadjen = false;

                if(korisnik.Pol == Pol.Muski)
                {
                    pol = "Muski";
                }
                else
                {
                    pol = "Zenski";
                }

                if(korisnik.Uloga == Uloga.Dispecer)
                {
                    uloga = "Dispecer";
                }
                else if(korisnik.Uloga == Uloga.Musterija)
                {
                    uloga = "Musterija";
                }
                else
                {
                    uloga = "Vozac";
                }

                Dispecer izmenjen = new Dispecer(idKorisnika, korisnik.KorisnickoIme, korisnik.Lozinka, korisnik.Ime, korisnik.Prezime, pol, korisnik.JMBG, korisnik.KontaktTelefon, korisnik.Email, uloga, korisnik.Voznje,korisnik.Banovan);

            //provera postojanja usernamea u korisnicima
            foreach (Korisnik item in Korisnici.list.Values)
            {
                if (item.KorisnickoIme.Equals(korisnik.KorisnickoIme))
                {
                    nadjen = true;
                    break;
                }
            }

            //provera postojanja usernamea u dispecerima
            foreach (Dispecer item in Dispeceri.list.Values)
            {
                if (item.KorisnickoIme.Equals(korisnik.KorisnickoIme) && item.Id != korisnik.Id)
                {
                    nadjen = true;
                    break;
                }
            }

            foreach (Vozac item in Vozaci.list.Values)
            {
                if (item.KorisnickoIme.Equals(korisnik.KorisnickoIme))
                {
                    nadjen = true;
                    break;
                }
            }

            if (!nadjen)
                {
                    bool prviPut = true;
                    Dispeceri.list[idKorisnika] = izmenjen;

                    string path = HostingEnvironment.MapPath("~/App_Data/Dispeceri.txt");
                    StringBuilder sb = new StringBuilder();

                    foreach (Dispecer item in Dispeceri.list.Values)
                    {
                        if (prviPut)
                        {
                            sb.Append(item.Id + ";" + item.KorisnickoIme + ";" + item.Lozinka + ";" + item.Ime + ";" + item.Prezime + ";" + item.Pol + ";" + item.JMBG + ";" + item.KontaktTelefon + ";" + item.Email + ";" + item.Uloga + ";" + item.Voznje + ";"+item.Banovan+"\n");
                            File.WriteAllText(path, sb.ToString());
                            prviPut = false;
                            sb.Length = 0;
                        }
                        else
                        {
                            sb.Append(item.Id + ";" + item.KorisnickoIme + ";" + item.Lozinka + ";" + item.Ime + ";" + item.Prezime + ";" + item.Pol + ";" + item.JMBG + ";" + item.KontaktTelefon + ";" + item.Email + ";" + item.Uloga + ";" + item.Voznje + ";" + item.Banovan + "\n");
                            File.AppendAllText(path, sb.ToString());
                            sb.Length = 0;
                        }
                    }

                    return true;
                }

                return false;
        }
    }
}
