using Microsoft.Extensions.DependencyInjection;

namespace Healthy.Business
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddHealthyServices(this IServiceCollection services)
        {

            return services;
        }
    }
}
