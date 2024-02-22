using System.Linq;
using Microsoft.AspNetCore.Identity;
using Shop.Common.Enums;
using Shop.Database.Identity;

namespace Shop.Database
{
    internal sealed class ContextSeed
    {
        private const string DefAdministratorLanguage = "uk-UA";

        public void Seed(DataContext context)
        {
            SeedAdminIdentity(context);
        }

        private void SeedAdminIdentity(DataContext context)
        {
            var adminRole = new IdentityRole
            {
                Id = "0f13cad7-a225-428b-898d-539ff7771540",
                Name = nameof(ApplicationUserRole.Administrator),
                ConcurrencyStamp = "5bcded54-b952-4485-bd4b-c6c465e4b74f",
                NormalizedName = "ADMINISTRATOR"
            };
            if (context.Roles.Any(x => x.Id == adminRole.Id))
            {
                return;
            }
            else
            {
                context.Roles.Add(adminRole);
            }
            var administrator = new ApplicationUser
            {
                Id = "00000000-0000-0000-0000-000000000000",
                PasswordHash = "AQAAAAEAACcQAAAAEEJS6HNEniWTkMQdHqy5LgxTB+/cMWt1KrGQhzThn9J8Mm01aRydfFv+JW54S23Kuw==",
                SecurityStamp = "3X5WHZ3VGQ4PJDOX64FYRU5CQLUMXR35",
                ConcurrencyStamp = "3f2b28d7-4e02-420d-a831-d7155c89d357",
                UserName = "Administrator",
                NormalizedUserName = "ADMINISTRATOR",
                FirstName = "Administrator",
                LastName = "Administrator",
                Language = DefAdministratorLanguage,
                RegisterType = nameof(RegisterTypes.Admin),
                Confirmed = true,
                Active = true
            };
            if (!context.Users.Any(x => x.Id == administrator.Id))
            {
                context.Set<ApplicationUser>().Add(administrator);
            }
            if (!context.UserRoles.Any(x => x.UserId == administrator.Id && x.RoleId == adminRole.Id))
            {
                context.UserRoles.Add(
                        new IdentityUserRole<string>
                        {
                            RoleId = adminRole.Id,
                            UserId = administrator.Id
                        });
            }
            context.SaveChanges();
        }
    }
} 