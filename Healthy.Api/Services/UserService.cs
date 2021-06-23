using ConsoleApp2.Interfaces;
using Healthy.Api.Helpers;
using Healthy.Api.Interfaces;
using Healthy.Api.Models;
using Healthy.Data;
using Healthy.Data.Entities;
using Healthy.Data.Interfaces;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace WebApi.Services
{
    public class UserService : IUserService
    {
        private readonly AppSettings appSettings;
        private readonly IUserRepository userRepository ;
        private readonly IRepository<Patient> patientRepository;
        private readonly IDoctorRepository doctorRepository;

        public UserService(IOptions<AppSettings> appSettings, IUserRepository userRepository, IRepository<Patient> patientRepository, IDoctorRepository doctorRepository)
        {
            this.appSettings = appSettings.Value;
            this.userRepository = userRepository;
            this.patientRepository = patientRepository;
            this.doctorRepository = doctorRepository;
        }

        public AuthenticateResponse Authenticate(AuthenticateRequest model, string type)
        {
            var _users = userRepository.GetByAll();
            var user = _users.SingleOrDefault(x => x.UserName == model.Username);
            bool verified = false;
            try
            {
                if (user != null && model != null)
                {
                    verified = BCrypt.Net.BCrypt.Verify(model.Password, user.Password);
                }

            }
            catch (Exception)
            {
                verified = false;

            }

            if (user == null || verified == false) { return null; }
            //to delete
            if (this.GetUserType(user) != type)
            {
                return null;
            }

            var token = GenerateJwtToken(user);

            return new AuthenticateResponse(user, token);
        }

        public IEnumerable<User> GetAll()
        {
            return userRepository.GetByAll();
        }

        public User GetById(int id)
        {
            return userRepository.GetByAll().FirstOrDefault(x => x.Id == id);
        }


        private string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(appSettings.Secret));

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()), new Claim("type", this.GetUserType(user))}),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        private string GetUserType(User user)
        {
            string type = "";
            foreach (var patient in patientRepository.GetByAll())
            {
                if (patient.UserId == user.Id)
                {
                    type = "patient";

                }
            }
            foreach (var doctor in doctorRepository.GetByAll())
            {
                if (doctor.UserId == user.Id)
                {
                    type = "doctor";
                }
            }
            return type;

        }
    }
}
