using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Shop.Common.Settings;
using Shop.Database;
using Shop.Database.Identity;
using Shop.Server.Auth;
using Shop.Server.Common;
using Shop.Server.Middlewares;
using System;
using System.IO.Compression;
using System.Net;
using System.Threading.Tasks;

namespace Shop.Server
{
    public class Startup
    {
        private readonly IAppSettings _appSettings;

        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            _appSettings = new AppSettings(configuration);
        }

        public void ConfigureServices(IServiceCollection services)
        {
#if DEBUG
            AddCors(services);
#endif
            services.AddDbContext<DataContext>(options =>
            {
                DataContext.UseServer(options, _appSettings);
            });
            services.AddResponseCompression(options =>
            {
                options.EnableForHttps = true;
                options.Providers.Add<GzipCompressionProvider>();
                options.Providers.Add<BrotliCompressionProvider>();
            });
            services.Configure<BrotliCompressionProviderOptions>(options =>
            {
                options.Level = CompressionLevel.Fastest;
            });
            services.Configure<GzipCompressionProviderOptions>(options =>
            {
                options.Level = CompressionLevel.Optimal;
            });
            services.AddSingleton<IAppSettings>(_appSettings);
            services.AddScoped<AuthManager>();
            AddIdentityCore(services);
            AddAuthentication(services);
            services.AddControllers(options =>
            {
                options.RespectBrowserAcceptHeader = true;
            });
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "My API",
                    Version = "v1"
                });
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                using (var dataContext = serviceScope.ServiceProvider.GetService<DataContext>())
                {
                    dataContext.MigrateAndSeed();
                }
            }
            app.UseMiddleware<ErrorHandlingMiddleware>();
#if DEBUG
            app.UseCors(AppConstants.ClientCorsPolicy);
#endif
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });
            app.UseResponseCompression();
            app.UseStaticFiles();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(MapEndpoints);
        }

        private void AddIdentityCore(IServiceCollection services)
        {
            services.AddIdentityCore<ApplicationUser>(options =>
            {
                options.Password.RequireDigit = _appSettings.IdentityConfig.RequireDigit;
                options.Password.RequireLowercase = _appSettings.IdentityConfig.RequireLowercase;
                options.Password.RequireUppercase = _appSettings.IdentityConfig.RequireUppercase;
                options.Password.RequireNonAlphanumeric = _appSettings.IdentityConfig.RequireNonAlphanumeric;
                options.Password.RequiredLength = _appSettings.IdentityConfig.RequiredLength;
                options.User.RequireUniqueEmail = _appSettings.IdentityConfig.RequireUniqueEmail;
                options.User.AllowedUserNameCharacters = _appSettings.IdentityConfig.UserNameRegularExpression;
            });
            var identityBuilder = new IdentityBuilder(typeof(ApplicationUser), typeof(IdentityRole), services);
            identityBuilder
                .AddEntityFrameworkStores<DataContext>()
                .AddRoleManager<RoleManager<IdentityRole>>()
                .AddDefaultTokenProviders();
        }

        // Implementacja konfiguracji JWT
        private void AddAuthentication(IServiceCollection services)
        {
            // Ustawienie domyślnego schematu autoryzacji jako JWT Bearer
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultSignInScheme = null;
            })
                // Konfiguracja sposobu weryfikacji tokenów JWT
                .AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;  // wyłączenie wymogu HTTPS w środowisku testowym
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ClockSkew = TimeSpan.Zero, // brak tolerancji czasowej
                    ValidateIssuer = true, // Weryfikacja, czy token został wydany przez zaufanego wystawcę.
                    ValidIssuer = AuthOptions.Issuer, // Wartość Issuer – nazwa lub identyfikator wystawcy tokenu (np. nazwa aplikacji).
                    ValidateAudience = false, // Brak weryfikacji odbiorcy tokenu (Audience), gdy aplikacja nie wymaga tego pola.
                    ValidAudience = AuthOptions.Audience,
                    ValidateLifetime = true, // Sprawdzenie, czy token nie wygasł (czy nadal jest ważny).
                    IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(), // Klucz kryptograficzny używany do weryfikacji podpisu tokenu.
                    ValidateIssuerSigningKey = true,  // Wymuszenie sprawdzania poprawności podpisu JWT.
                };
                // Obsługa zdarzeń związanych z tokenem JWT
                options.Events = new JwtBearerEvents
                {
                    // Reakcja na błędny lub przeterminowany token
                    OnAuthenticationFailed = context =>
                    {
                        if (context.Exception.GetType() == typeof(SecurityTokenExpiredException))
                        {
                            // Dodanie informacji w nagłówkach odpowiedzi o wygaśnięciu tokenu.
                            context.Response.Headers.Append("Access-Control-Expose-Headers", "Token-Expired");
                            context.Response.Headers.Append("Token-Expired", "true");
                        }
                        return Task.CompletedTask;
                    },
                    // Obsługa odbioru tokenu z parametrów zapytania
                    OnMessageReceived = context =>
                    {
                        var accessToken = context.Request.Query["access_token"]; // Próba odczytania tokenu z parametrów zapytania (query string).
                        var path = context.HttpContext.Request.Path; // Ścieżka żądania – wykorzystywana np. przez SignalR (notificationhub).
                        // Jeśli token istnieje i dotyczy określonego endpointu, przypisz go do kontekstu.
                        if (!string.IsNullOrEmpty(accessToken) &&
                            path.StartsWithSegments("/notificationhub"))
                        {
                            context.Token = accessToken;
                        }
                        return Task.CompletedTask;
                    }
                };
            });
        }

        private void MapEndpoints(IEndpointRouteBuilder endpoints)
        {
            endpoints.MapControllers();
            MapNotSupportedEndpoints(endpoints, "/api");
            endpoints.MapFallbackToController("Index", "Home");
        }

        private void MapNotSupportedEndpoints(IEndpointRouteBuilder endpoints, string query)
        {
            endpoints.Map(query + "/{**x}", async context =>
            {
                context.Response.StatusCode = (int)HttpStatusCode.NotFound;
                await context.Response.WriteAsync(nameof(HttpStatusCode.NotFound));
            });
        }

        private void AddCors(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(AppConstants.ClientCorsPolicy, builder => builder
                    .WithOrigins("http://localhost:4200", "https://localhost:4200")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
            });
        }
    }
}
