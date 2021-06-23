using ConsoleApp2.Interfaces;
using Healthy.Api.Helpers;
using Healthy.Api.Interfaces;
using Healthy.Api.Services;
using Healthy.Business;
using Healthy.Data;
using Healthy.Data.Entities;
using Healthy.Data.Interfaces;
using Healthy.Data.Repositories;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using WebApi.Helpers;
using WebApi.Services;

namespace Healthy.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();
            services.AddCors();
            services.AddScoped<JwtService>();

            services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));
            services.Configure<CookiePolicyOptions>(options =>
            {
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });
            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme); 

            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IDoctorService, DoctorService>();
            services.AddScoped<IPatientService, PatientService>();
            services.AddScoped<IPrescriptionService, PrescriptionService>();
            services.AddScoped<IDrugsService, DrugsService>();


            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IDoctorRepository, DoctorRepository>();
            services.AddScoped<IRepository<Doctor>, DoctorRepository>();
            services.AddScoped<IRepository<Patient>, PatientRepository>();
            services.AddScoped<IRepository<PacientDoctor>, PatientDoctorRepository>();
            services.AddScoped<IRepository<Prescription>, PrescriptionRepository>();
            services.AddScoped<IRepository<Drug>, DrugRepository>();



            services.AddControllersWithViews()
            .AddNewtonsoftJson(options =>
            options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

            services.AddHealthyRepositories();
            services.AddHealthyServices();
            services.AddControllersWithViews()
            .AddNewtonsoftJson(options =>
            options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
);
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(options => options
                .WithOrigins(new[] { "http://localhost:3000" })
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials()
            );

            app.UseAuthorization();

            app.UseMiddleware<JwtMiddleware>();

            app.UseCors(builder => builder
                .WithOrigins("http://localhost:3000")
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials());

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
