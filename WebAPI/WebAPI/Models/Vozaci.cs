﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Hosting;

namespace WebAPI.Models
{
    public class Vozaci
    {

        public Dictionary<int, Vozac> list { get; set; }

        public Vozaci()
        {

        }
        public Vozaci(string path)
        {
            path = HostingEnvironment.MapPath(path);
            list = new Dictionary<int, Vozac>();
            FileStream stream = new FileStream(path, FileMode.Open);
            StreamReader sr = new StreamReader(stream);
            string line = "";


            while ((line = sr.ReadLine()) != null)
            {
                string[] tokens = line.Split(';');


                if (!tokens[0].Equals(""))
                {
                    Vozac k = new Vozac(Int32.Parse(tokens[0]), tokens[1], tokens[2], tokens[3], tokens[4], tokens[5], tokens[6], tokens[7], tokens[8], tokens[9], tokens[10], tokens[11], tokens[12], tokens[13], tokens[14], tokens[15], tokens[16], tokens[17], tokens[18], tokens[19], tokens[20]);
                    list.Add(k.Id, k);
                }
            }
            sr.Close();
            stream.Close();
        }
    }
}