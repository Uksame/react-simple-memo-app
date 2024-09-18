using System.Data.Common;
using api.Data;
using api.Interfaces;
using api.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

var myAllowedOrigins = "AllowReactApp";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: myAllowedOrigins, policy =>
    {
        // policyBuilder.WithOrigins("https://localhost:3000")
        //              .AllowAnyHeader()
        //              .AllowAnyMethod()
        //              .AllowCredentials();

        policy.WithOrigins("http://localhost:3000", "http://192.168.1.6:3000")
                     .AllowAnyMethod()
                     .AllowAnyHeader();
    });
});

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(option =>
{
    option.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Memo Demo API",
        Description = "API for documenting the MEMO APP CRUD Operations",
        Version = "v1"
    });
});

builder.Services.AddControllers()
    .AddNewtonsoftJson(options =>
        options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
    );


builder.Services.AddDbContext<MemoDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddScoped<INoteRepository, NoteRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();





var app = builder.Build();

app.Urls.Add("http://localhost:5000");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Memo Demo API V1");
    });
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseCors(myAllowedOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();
