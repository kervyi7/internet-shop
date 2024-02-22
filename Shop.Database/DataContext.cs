using System.Linq;
using System.Reflection;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Shop.Common.Settings;
using Shop.Database.Identity;

namespace Shop.Database
{
    public class DataContext : IdentityDbContext<ApplicationUser>
    {
        public DataContext(DbContextOptions<DataContext> options)
            : base(options) { }

        public DbSet<UserRefreshToken> UserRefreshTokens { get; set; }

        public static void UseServer(DbContextOptionsBuilder optionsBuilder, IAppSettings appSettings)
        {
            var connection = appSettings.ConnectionString;
            optionsBuilder.UseNpgsql(connection, x => x.MigrationsAssembly("Shop.Postgre.Migrations"));
        }

        public static DataContext Create(IAppSettings systemSettingsProvider)
        {
            var optionsBuilder = new DbContextOptionsBuilder<DataContext>();
            UseServer(optionsBuilder, systemSettingsProvider);
            return new DataContext(optionsBuilder.Options);
        }

        public void MigrateAndSeed()
        {
            var migrations = Database.GetPendingMigrations();
            if (migrations.Any())
            {
                Database.Migrate();
                new ContextSeed().Seed(this);
                return;
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            RemovePluralizingTableNameConvention(modelBuilder);
            RemoveCascadeDeleteConvention(modelBuilder);
            modelBuilder.HasDefaultSchema("public");
            modelBuilder.Entity<ApplicationUser>().ToTable("IdentityUser");
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
            modelBuilder.Entity<ApplicationUser>().OwnsOne(x => x.Properties,
                builder =>
                {
                    builder.ToTable("IdentityUser");
                    builder.ToJson();
                });
        }

        private void RemovePluralizingTableNameConvention(ModelBuilder modelBuilder)
        {
            foreach (IMutableEntityType entity in modelBuilder.Model.GetEntityTypes())
            {
                entity.SetTableName(entity.DisplayName());
            }
        }

        private void RemoveCascadeDeleteConvention(ModelBuilder modelBuilder)
        {
            foreach (IMutableForeignKey foreignKey in modelBuilder.Model.GetEntityTypes()
                .SelectMany(e => e.GetForeignKeys()))
            {
                foreignKey.DeleteBehavior = DeleteBehavior.Restrict;
            }
        }
    }
}
