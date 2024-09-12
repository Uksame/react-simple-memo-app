using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class MemoDbContext : DbContext
    {
        public DbSet<Note> Notes { get; set; }

        public MemoDbContext(DbContextOptions options)
         : base(options)
        {

        }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);


        }


    }
}