using Microsoft.AspNetCore.Identity;
using Shop.Common.Enums;
using Shop.Database.Identity;
using Shop.Database.Models;
using System.Collections.Generic;
using System.Linq;

namespace Shop.Database
{
    internal sealed class ContextSeed
    {
        public void Seed(DataContext context)
        {
            SeedRoles(context);
            SeedAdminIdentity(context);
            SeedInfoPages(context);
        }

        private void SeedRoles(DataContext context)
        {
            var adminRole = new IdentityRole
            {
                Id = "0f13cad7-a225-428b-898d-539ff7771540",
                Name = nameof(ApplicationUserRole.Administrator),
                ConcurrencyStamp = "5bcded54-b952-4485-bd4b-c6c465e4b74f",
                NormalizedName = "ADMINISTRATOR"
            };

            var userRole = new IdentityRole
            {
                Id = "0f13cad7-a225-428b-898d-539ff3453445",
                Name = nameof(ApplicationUserRole.User),
                ConcurrencyStamp = "23332464-b952-4485-bd4b-c6c465e4b74f",
                NormalizedName = "USER"
            };

            bool rolesChanged = false;

            if (!context.Roles.Any(x => x.Id == adminRole.Id))
            {
                context.Roles.Add(adminRole);
                rolesChanged = true;
            }

            if (!context.Roles.Any(x => x.Id == userRole.Id))
            {
                context.Roles.Add(userRole);
                rolesChanged = true;
            }

            if (rolesChanged)
                context.SaveChanges();
        }

        private void SeedAdminIdentity(DataContext context)
        {
            var adminRoleId = "0f13cad7-a225-428b-898d-539ff7771540";

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
                RegisterType = nameof(RegisterTypes.Admin),
                Confirmed = true,
                Active = true
            };

            if (!context.Users.Any(x => x.Id == administrator.Id))
            {
                context.Set<ApplicationUser>().Add(administrator);
            }

            if (!context.UserRoles.Any(x => x.UserId == administrator.Id && x.RoleId == adminRoleId))
            {
                context.UserRoles.Add(new IdentityUserRole<string>
                {
                    RoleId = adminRoleId,
                    UserId = administrator.Id
                });
            }

            context.SaveChanges();
        }

        private void SeedInfoPages(DataContext context)
        {
            if (context.Set<InfoPage>().Any())
                return;

            var infoPages = new List<InfoPage>
        {
            new InfoPage
            {
                Id = 1,
                Key = "privacy",
                Header = "Privacy",
                HtmlContent = "<p>Admin has to add this page</p>"
            },
            new InfoPage
            {
                Id = 2,
                Key = "terms",
                Header = "Terms",
                HtmlContent = "<p>Admin has to add this page</p>"
            },
            new InfoPage
            {
                Id = 3,
                Key = "legal",
                Header = "Legal",
                HtmlContent = "<p>Admin has to add this page</p>"
            },
            new InfoPage
            {
                Id = 3,
                Key = "refund",
                Header = "Refund",
                HtmlContent = "<p>Admin has to add this page</p>"
            },
            new InfoPage
            {
                Id = 3,
                Key = "shipping",
                Header = "Shipping",
                HtmlContent = "<p>Admin has to add this page</p>"
            }
        };

            context.Set<InfoPage>().AddRange(infoPages);
            context.SaveChanges();
        }
    }
}