using System;
using System.IO;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Shop.Common;

namespace Shop.Server.Common
{
    public static class Extensions
    {
        public static string ToStringBase64(this string source)
        {
            var toEncodeAsBytes = ASCIIEncoding.UTF8.GetBytes(source);
            var returnValue = Convert.ToBase64String(toEncodeAsBytes);
            return returnValue;
        }

        public static string GetOrigin(this HttpRequest httpRequest)
        {
            return $"{httpRequest.Scheme}://{httpRequest.Host.ToUriComponent()}";
        }

        public static async Task<string> GetRequestBodyAsync(this HttpContext context)
        {
            if (context.Request.ContentType != ContentTypeConstants.ContentJson || context.Request.Body == null)
            {
                return string.Empty;
            }
            context.Request.Body.Seek(0, SeekOrigin.Begin);
            using (StreamReader stream = new StreamReader(context.Request.Body, Encoding.UTF8))
            {
                return await stream.ReadToEndAsync();
            }
        }

        public static async Task<string> GetRequestCopyBodyAsync(this HttpContext context)
        {
            if (context.Request.ContentType != ContentTypeConstants.ContentJson || context.Request.Body == null)
            {
                return string.Empty;
            }
            context.Request.Body.Seek(0, SeekOrigin.Begin);
            using (var moryStream = new MemoryStream())
            {
                await context.Request.Body.CopyToAsync(moryStream);
                moryStream.Seek(0, SeekOrigin.Begin);
                context.Request.Body.Seek(0, SeekOrigin.Begin);
                using (StreamReader stream = new StreamReader(moryStream, Encoding.UTF8))
                {
                    return await stream.ReadToEndAsync();
                }
            }
        }

        //public static UserViewModel ToViewModel(this ApplicationUser source, bool withAvatar = false)
        //{
        //    var model = source.ToViewModelWithoutPage(withAvatar);
        //    return model;
        //}

        //public static UserViewModel ToViewModelWithoutPage(this ApplicationUser source, bool withAvatar = false)
        //{
        //    return new UserViewModel
        //    {
        //        UserId = source.Id,
        //        FirstName = source.FirstName,
        //        LastName = source.LastName,
        //        Patronymic = source.Patronymic,
        //        Login = source.UserName,
        //        Email = source.Email,
        //        PhoneNumber = source.PhoneNumber,
        //        Address = source.Address,
        //        Avatar = withAvatar ? source.Avatar : null,
        //        UseEDS = source.UseEDS,
        //        INN = source.INN,
        //        Active = source.Active,
        //        RequireConfirmEmail = !source.Confirmed,
        //        DashboardPageCode = source.DashboardPageCode,
        //        Properties = source.Properties?.ToViewModel()
        //    };
        //}

        //public static UserPropertiesViewModel ToViewModel(this UserProperties source)
        //{
        //    return new UserPropertiesViewModel
        //    {
        //       NotificationMute = source.NotificationMute,
        //       NotificationVolume = source.NotificationVolume,
        //       TwoFactorAuthType = source.TwoFactorAuthType
        //    };
        //}

        //public static UserProperties ToModel(this UserPropertiesViewModel source)
        //{
        //    return new UserProperties
        //    {
        //        NotificationMute = source.NotificationMute,
        //        NotificationVolume = source.NotificationVolume,
        //        TwoFactorAuthType = source.TwoFactorAuthType
        //    };
        //}

        public static byte[] ToBytes(this Stream input)
        {
            var buffer = new byte[AppConstants.BytesBufferSize];
            using (MemoryStream memoryStream = new MemoryStream())
            {
                int read;
                while ((read = input.Read(buffer, 0, buffer.Length)) > 0)
                {
                    memoryStream.Write(buffer, 0, read);
                }
                return memoryStream.ToArray();
            }
        }

        public static bool IsMatchWithIgnoreCase(this string source, string term)
        {
            if (string.IsNullOrEmpty(source))
            {
                return false;
            }
            return Regex.IsMatch(source, term, RegexOptions.IgnoreCase);
        }

        public static string GetUserId(this IPrincipal principal)
        {
            return principal.GetClaimValue(ClaimTypes.NameIdentifier);
        }

        public static string GetClaimValue(this IPrincipal principal, string type)
        {
            var claimsIdentity = (ClaimsIdentity)principal?.Identity;
            return claimsIdentity?.FindFirst(type)?.Value;
        }
    }
}