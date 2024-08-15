using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Shop.Common;
using Shop.Database.Models;
using Shop.Database.Models.Jsons;
using Shop.Server.Manager;
using Shop.Server.Models;
using Shop.Server.Models.DTO;

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

        public static string GetError(this Exception exception)
        {
            var innerException = exception.InnerException;
            if (innerException != null)
            {
                return GetError(innerException);
            }
            var errorResponse = new ErrorResponseDto
            {
                ErrorDescription = exception.Message
            };
            return JsonManager.Serialize(errorResponse);
        }

        public static IEnumerable<ProductDto> ToViewModels(this IEnumerable<Product> sources)
        {
            return sources.Select(ToViewModel);
        }

        public static ProductDto ToViewModel(this Product source)
        {
            var productDto = new ProductDto()
            {
                Id = source.Id,
                Name = source.Name,
                Code = source.Code,
                Type = CreateCodeNameDto(source.Type),
                Brand = CreateCodeNameDto(source.Brand),
                Category = ToViewModel(source.Category),
                Price = source.Price,
                SalePrice = source.SalePrice,
                Count = source.Count,
                Description = source.Description,
                Currency = source.Currency,
                StringProperties = CreatePropertiesDto(source.StringProperties),
                DecimalProperties = CreatePropertiesDto(source.DecimalProperties),
                BoolProperties = CreatePropertiesDto(source.BoolProperties),
                DateProperties = CreatePropertiesDto(source.DateProperties),
                Images = ToViewModels(source.ProductImages.Select(x => x.Image))
            };
            return productDto;
        }

        public static CategoryDto ToViewModel(this Category source)
        {
            var categoryDto = new CategoryDto
            {
                Id = source.Id,
                Name = source.Name,
                Code = source.Code,
                Image = source.Image.ToViewModel(),
                PropertyTemplate = CreatePropertyTemplateDto(source.PropertyTemplate),
            };
            return categoryDto;
        }

        public static IEnumerable<ImageDto> ToViewModels(this IEnumerable<Image> sources)
        {
            return sources.Select(ToViewModel);
        }

        public static ImageDto ToViewModel(this Image source)
        {
            if (source == null)
            {
                return null;
            }
            var imageDto = new ImageDto
            {
                Id = source.Id,
                Body = Convert.ToBase64String(source.Body),
                SmallBody = Convert.ToBase64String(source.SmallBody),
                Name = source.Name,
                FileName = source.FileName,
                FileSize = source.FileSize,
                MimeType = source.MimeType,
                IsBinding = source.ProductImages.Any() || source.Category != null,
                IsTitle = source.IsTitle
            };
            return imageDto;
        }

        public static PropertyTemplateDto CreatePropertyTemplateDto(PropertyTemplate source)
        {
            if (source == null)
            {
                return null;
            }
            var propertyTemplateDto = new PropertyTemplateDto
            {
                Id = source.Id,
                Name = source.Name,
                Code = source.Code,
                Extension = JsonManager.Deserialize<TemplateExtension>(source.Extension),
                StringProperties = CreatePropertiesDto(source.StringProperties),
                DecimalProperties = CreatePropertiesDto(source.DecimalProperties),
                BoolProperties = CreatePropertiesDto(source.BoolProperties),
                DateProperties = CreatePropertiesDto(source.DateProperties),
            };
            return propertyTemplateDto;
        }

        private static CodeNameDto CreateCodeNameDto(BaseCodeName source)
        {
            var codeNameDto = new CodeNameDto
            {
                Id = source.Id,
                Name = source.Name,
                Code = source.Code,
            };
            return codeNameDto;
        }

        private static IEnumerable<PropertyDto<T>> CreatePropertiesDto<T>(IEnumerable<Property<T>> sources)
        {
            return sources.Select(CreatePropertyDto);
        }

        private static PropertyDto<T> CreatePropertyDto<T>(this Property<T> source)
        {
            var propertyDto = new PropertyDto<T>
            {
                Id = source.Id,
                Name = source.Name,
                Code = source.Code,
                IsPrimary = source.IsPrimary,
                IsTitle = source.IsTitle,
                Description = source.Description,
                Suffix = source.Suffix,
                Value = source.Value,
                ProductId = source.ProductId,
                PropertyTemplateId = source.PropertyTemplateId,
            };
            return propertyDto;
        }

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