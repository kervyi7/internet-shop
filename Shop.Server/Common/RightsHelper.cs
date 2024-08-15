using System.Security.Principal;

namespace Shop.Server.Common
{
    public static class RightsHelper
    {
        public const string Anonymous = "anonymous";

        public static string GetUserId(IPrincipal principal)
        {
            return principal.GetUserId() ?? Anonymous;
        }

        public static string GetUserName(IPrincipal principal)
        {
            return principal?.Identity?.Name ?? Anonymous;
        }

        public static bool IsAnonymous(IPrincipal principal)
        {
            return GetUserId(principal) == Anonymous;
        }

        public static bool IsAnonymous(string userId)
        {
            return userId == Anonymous;
        }
    }
}