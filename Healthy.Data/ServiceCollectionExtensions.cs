using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Healthy.Data
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddHealthyRepositories(this IServiceCollection services)
        {
            services.AddDbContext<HealthyDbContext>(
            options => options.UseSqlServer(@"Data Source=localhost;Initial Catalog=Healthy;Integrated Security=True; MultipleActiveResultSets=true "));

            return services;
        }

        
    }
}
