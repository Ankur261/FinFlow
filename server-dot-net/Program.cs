
using Microsoft.EntityFrameworkCore;
using server_dot_net.Data;
using server_dot_net.Repositories;
using server_dot_net.Services;
//using Microsoft.AspNetCore.Builder;
//using Microsoft.Extensions.DependencyInjection;
//using Microsoft.Extensions.Hosting;


namespace server_dot_net
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowFrontend",
                    policy =>
                    {
                        policy.WithOrigins("http://localhost:5173") // frontend origin
                              .AllowAnyHeader()
                              .AllowAnyMethod();
                    });
            });
            builder.Services.AddControllers();
            builder.Services.AddDbContext<ApplicationDbContext>(options =>
            options.UseMySql(
            builder.Configuration.GetConnectionString("DefaultConnection"),
            ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))
    ));

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Register services/repositories here
            builder.Services.AddScoped<IMerchantRepository, MerchantRepository>();
            builder.Services.AddScoped<IMerchantService, MerchantService>();
            builder.Services.AddScoped<IExpenseService, ExpenseService>();
            builder.Services.AddScoped<IExpenseRepository, ExpenseRepository>();



            var app = builder.Build();
            app.UseCors("AllowFrontend");

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
                //app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();
            app.UseAuthorization();
            app.MapControllers();

            app.Run();

        }
    }
}
