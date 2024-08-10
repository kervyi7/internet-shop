using System;
using System.Linq;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Shop.Common.Settings;
using Shop.Database.Identity;
using Shop.Database.Models;
namespace Shop.Database
{
    public class DataContext : IdentityDbContext<ApplicationUser>
    {
        public DataContext(DbContextOptions<DataContext> options)
            : base(options) { }

        public DbSet<UserRefreshToken> UserRefreshTokens { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductImage> ProductImages { get; set; }
        public DbSet<Property<string>> StringProperties { get; set; }
        public DbSet<Property<decimal>> DecimalProperties { get; set; }
        public DbSet<Property<bool>> BoolProperties { get; set; }
        public DbSet<Property<DateTime>> DateProperties { get; set; }
        public DbSet<ProductType> ProductTypes { get; set; }
        public DbSet<ProductBrand> ProductBrands { get; set; }
        public DbSet<PropertyTemplate> PropertyTemplate { get; set; }

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

        private CheckConstraintBuilder GetPropertyConstraint<T>(TableBuilder<T> builder, string name) where T : class
        {
            return builder.HasCheckConstraint(
               $"ckProperty{name}_ProductOrTemplate",
               $"\"{nameof(BaseProperty.ProductId)}\" IS NOT NULL OR \"{nameof(BaseProperty.PropertyTemplateId)}\" IS NOT NULL");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            RemovePluralizingTableNameConvention(modelBuilder);
            RemoveCascadeDeleteConvention(modelBuilder);
            modelBuilder.HasDefaultSchema("public");
            modelBuilder.Entity<ApplicationUser>().ToTable("IdentityUser");
            modelBuilder.Entity<PropertyTemplate>().ToTable("PropertyTemplate");
            modelBuilder.Entity<ApplicationUser>().OwnsOne(x => x.Properties,
                builder =>
                {
                    builder.ToTable("IdentityUser");
                    builder.ToJson();
                });
            modelBuilder.Entity<Category>()
                 .HasOne(x => x.Image)
                 .WithOne(x => x.Category)
                 .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Property<bool>>()
                 .HasOne(x => x.Product)
                 .WithMany(x => x.BoolProperties)
                 .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Property<decimal>>()
                 .HasOne(x => x.Product)
                 .WithMany(x => x.DecimalProperties)
                 .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Property<string>>()
                 .HasOne(x => x.Product)
                 .WithMany(x => x.StringProperties)
                 .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Property<DateTime>>()
                 .HasOne(x => x.Product)
                 .WithMany(x => x.DateProperties)
                 .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Property<bool>>()
                .ToTable(t => GetPropertyConstraint(t, "Bool"));
            modelBuilder.Entity<Property<decimal>>()
                .ToTable(t => GetPropertyConstraint(t, "Decimal"));
            modelBuilder.Entity<Property<string>>()
                .ToTable(t => GetPropertyConstraint(t, "String"));
            modelBuilder.Entity<Property<DateTime>>()
                .ToTable(t => GetPropertyConstraint(t, "DateTime"));
            modelBuilder.Entity<ProductImage>()
                 .HasOne(x => x.Product)
                 .WithMany(x => x.ProductImages)
                 .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<ProductImage>()
                 .HasOne(x => x.Image)
                 .WithMany(x => x.ProductImages)
                 .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Category>()
                 .HasOne(x => x.PropertyTemplate)
                 .WithOne(x => x.Category)
                 .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Property<bool>>()
                 .HasOne(x => x.PropertyTemplate)
                 .WithMany(x => x.BoolProperties)
                 .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Property<decimal>>()
                 .HasOne(x => x.PropertyTemplate)
                 .WithMany(x => x.DecimalProperties)
                 .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Property<string>>()
                 .HasOne(x => x.PropertyTemplate)
                 .WithMany(x => x.StringProperties)
                 .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Property<DateTime>>()
                 .HasOne(x => x.PropertyTemplate)
                 .WithMany(x => x.DateProperties)
                 .OnDelete(DeleteBehavior.Cascade);
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
