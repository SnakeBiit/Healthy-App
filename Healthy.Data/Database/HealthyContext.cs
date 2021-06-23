using Healthy.Data.Entities;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Healthy.Data
{
    public class HealthyDbContext : DbContext
    {
        public HealthyDbContext(DbContextOptions<HealthyDbContext> options)
        : base(options)
        {

        }

        public DbSet<Certification> Certification { get; set; }

        public DbSet<Doctor> Doctor { get; set; }

        public DbSet<Drug> Drug { get; set; }

        public DbSet<Patient> Pacient { get; set; }

        public DbSet<Prescription> Prescription { get; set; }

        public DbSet<User> User { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }

            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");
           
            modelBuilder.Entity<PacientDoctor>()
                .HasOne(bc => bc.Pacient)
                .WithMany(b => b.PacientDoctors)
                .HasForeignKey(bc => bc.PacientId);
            modelBuilder.Entity<PacientDoctor>()
                .HasOne(bc => bc.Doctor)
                .WithMany(c => c.PacientDoctors)
                .HasForeignKey(bc => bc.DoctorId);

        }
    }

 
}