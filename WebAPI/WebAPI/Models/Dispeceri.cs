using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Hosting;

namespace WebAPI.Models
{
    public class Dispeceri
    {
        public Dictionary<int, Dispecer> list { get; set; }

        public Dispeceri()
        {

        }
        public Dispeceri(string path)
        {
            path = HostingEnvironment.MapPath(path);
            list = new Dictionary<int, Dispecer>();
            FileStream stream = new FileStream(path, FileMode.Open);
            StreamReader sr = new StreamReader(stream);
            string line = "";
            while ((line = sr.ReadLine()) != null)
            {
                string[] tokens = line.Split(';');
                Dispecer k = new Dispecer(Int32.Parse(tokens[0]), tokens[1], tokens[2], tokens[3], tokens[4], tokens[5], tokens[6], tokens[7], tokens[8], tokens[9], tokens[10]);
                list.Add(k.Id, k);
            }
            sr.Close();
            stream.Close();
        }
    }
}