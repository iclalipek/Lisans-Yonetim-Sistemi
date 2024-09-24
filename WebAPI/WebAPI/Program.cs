using Domain;
using Microsoft.EntityFrameworkCore;
using WebAPI.Repositories;
using WebAPI.RepositoryInterface;
using AutoMapper;
using Abstractions.DTOS;
using Domain.Mappings;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();  

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IRepository, Repository>(); 
builder.Services.AddScoped<ILogRepository, LogRepository>();

builder.Services.AddAutoMapper(      //LisansMapping, entity'ler ile DTO'lar arasındaki eşlemeleri tanımlayan bir profildir.
    typeof(LisansMapping));  

builder.Services.AddDbContext<ApplicationDbContext>(options =>  //EF Core'un SQL Server'ı kullanmasını sağlar.
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder => builder.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowAll"); 

app.UseAuthorization(); app.UseCors("AllowAll"); 

app.UseRouting();

app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.MapControllers();

app.Run();
