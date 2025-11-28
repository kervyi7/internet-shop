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

        public static string GetErrorDtoJson(this Exception exception)
        {
            var exceptionMessage = GetErrorMessage(exception);
            var errorResponse = new ErrorResponseDto
            {
                ErrorDescription = exceptionMessage
            };
            return JsonManager.Serialize(errorResponse);
        }

        public static IEnumerable<ProductDto> ToViewModels(this IEnumerable<Product> sources)
        {
            return sources.Select(ToViewModel);
        }

        public static IEnumerable<FavoriteProductDto> ToViewModels(this IEnumerable<FavoriteProduct> sources)
        {
            return sources.Select(ToViewModel);
        }

        public static FavoriteProductDto ToViewModel(this FavoriteProduct source)
        {
            var dto = new FavoriteProductDto()
            {
                ProductId = source.ProductId,
                Product = source.Product.ToViewModel()

            };
            return dto;
        }

        public static IEnumerable<OrderDto> ToViewModels(this IEnumerable<Order> sources)
        {
            return sources.Select(ToViewModel);
        }

        public static OrderDto ToViewModel(this Order source)
        {
            if (source == null)
                return null;

            return new OrderDto
            {
                Id = source.Id,
                UserId = source.UserId,
                DeliveryAddressId = source.DeliveryAddressId,
                ShippingOptionId = source.ShippingOptionId,
                Status = source.Status,
                Notes = source.Notes,
                Date = source.CreatedAt,
                TotalPrice = source.TotalPrice,
                DeliveryAddress = source.DeliveryAddress?.ToViewModel(),
                ShippingOption = source.ShippingOption?.ToViewModel(),
                Items = source.Items?.Select(i => i.ToViewModel()).ToList()
            };
        }


        public static DeliveryAddressDto ToViewModel(this DeliveryAddress source)
        {
            if (source == null)
                return null;

            return new DeliveryAddressDto
            {
                FirstName = source.FirstName,
                LastName = source.LastName,
                Phone = source.Phone,
                Email = source.Email,
                Country = source.Country,
                City = source.City,
                Street = source.Street,
                HouseNumber = source.HouseNumber,
                Apartment = source.Apartment,
                Postcode = source.Postcode,
                Notes = source.Notes,
                IsDefault = source.IsDefault
            };
        }

        public static ShippingOptionDto ToViewModel(this ShippingOption source)
        {
            if (source == null)
                return null;

            return new ShippingOptionDto
            {
                Id = source.Id,
                Name = source.Name,
                Cost = source.Cost,
                Description = source.Description
            };
        }

        public static OrderItemDto ToViewModel(this OrderItem source)
        {
            if (source == null)
                return null;

            return new OrderItemDto
            {
                ProductId = source.ProductId,
                Quantity = source.Quantity,
                PriceAtPurchase = source.PriceAtPurchase,
                Product = source.Product?.ToShortViewModel()
            };
        }


        public static ProductDto ToViewModel(this Product source)
        {
            if (source == null) return null;

            return new ProductDto
            {
                Id = source.Id,
                Name = source.Name,
                Code = source.Code,
                Type = CreateCodeNameDto(source.Type),
                Brand = CreateCodeNameDto(source.Brand),
                Category = ToViewModel(source.Category),
                Price = source.Price,
                DiscountedPrice = source.DiscountedPrice,
                Count = source.Count,
                Description = source.Description,
                Currency = source.Currency,
                StringProperties = CreatePropertiesDto(source.StringProperties),
                DecimalProperties = CreatePropertiesDto(source.DecimalProperties),
                BoolProperties = CreatePropertiesDto(source.BoolProperties),
                Images = source.ProductImages?
                               .OrderByDescending(pi => pi.IsTitle)
                               .ToViewModels()
                               .ToList()
            };
        }

        public static ShortProductDto ToShortViewModel(this Product source)
        {
            if (source == null) return null;

            return new ShortProductDto
            {
                Id = source.Id,
                Code = source.Code,
                Name = source.Name,
                Category = source.Category?.Name,
                Images = source.ProductImages?
                               .OrderByDescending(pi => pi.IsTitle)
                               .ToViewModels()
                               .ToList()
            };
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

        public static IEnumerable<ImageDto> ToViewModels(this IEnumerable<ProductImage> sources)
        {
            if (sources == null) return Enumerable.Empty<ImageDto>();
            return sources.Select(ToViewModel);
        }

        public static IEnumerable<ImageDto> ToViewModels(this IEnumerable<Image> sources)
        {
            if (sources == null) return Enumerable.Empty<ImageDto>();
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
                IsBinding = source.ProductImages.Any(),
            };
            return imageDto;
        }

        public static ImageDto ToViewModel(this ProductImage productImage)
        {
            if (productImage == null || productImage.Image == null)
                return null;

            var image = productImage.Image;
            return new ImageDto
            {
                Id = image.Id,
                Body = Convert.ToBase64String(image.Body),
                SmallBody = image.SmallBody != null ? Convert.ToBase64String(image.SmallBody) : null,
                Name = image.Name,
                FileName = image.FileName,
                FileSize = image.FileSize,
                MimeType = image.MimeType,
                IsBinding = image.ProductImages.Any(),
                IsTitle = productImage.IsTitle // ключевое изменение — теперь фронт видит, что это титульная
            };
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
            };
            return propertyTemplateDto;
        }

        private static CodeNameDto CreateCodeNameDto(BaseCodeName source)
        {
            if (source == null)
            {
                return null;
            }
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

        private static string GetErrorMessage(Exception exception)
        {
            var innerException = exception.InnerException;
            if (innerException != null)
            {
                return GetErrorMessage(innerException);
            }
            return exception.Message;
        }
    }
}