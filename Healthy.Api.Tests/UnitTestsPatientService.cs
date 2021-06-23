using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using ConsoleApp2.Interfaces;
using Healthy.Data.Entities;
using System.Collections.Generic;
using Assert = Microsoft.VisualStudio.TestTools.UnitTesting.Assert;
using Healthy.Api.Services;
using System;
using Healthy.Data.Interfaces;
using Healthy.Data;

namespace Healthy.Api.Tests
{
    [TestClass]
    public class UnitTestsPatientService
    {

        private HealthyDbContext _context;
        [TestMethod]
        public void testInsertingPatientsIntoDatabase()
        {
            //Arrange
            var repositoryMockPatient = new MockRepository(MockBehavior.Strict).Create<IRepository<Patient>>();
            var repositoryMockUser = new MockRepository(MockBehavior.Strict).Create<IUserRepository>();
            var repositoryMockPacientDoctor = new MockRepository(MockBehavior.Strict).Create<IRepository<PacientDoctor>>();

            repositoryMockPatient.Setup(r => r.Insert(It.IsAny<Patient>()))
                          .Verifiable();
            var sut = new PatientService(repositoryMockPatient.Object, repositoryMockUser.Object, repositoryMockPacientDoctor.Object, _context);

            var patient = new Patient()
            {
                Id = 1,
                User = new User() { Password = "Cisdfsfdos22!", UserName = "Radu231" },
                Address = "str 321321312",
                Birthdate = new DateTime(1997-02-22),
                City = "Bucharest",
                Country = "Romania",
                Gender = "Male",
                FirstName = "Rsada",
                LastName = "Sdasdas",
                SocialSecurityNumber = "123213",
                Precondition = "doc",
            };
            //Act
            sut.InsertPatient(patient);
            //Assert
            repositoryMockPatient.VerifyAll();
        }

        [TestMethod]
        public void testForUpdatingPatients()
        {
            //Arrange
            var repositoryMockPatient = new MockRepository(MockBehavior.Strict).Create<IRepository<Patient>>();
            var repositoryMockPacientDoctor = new MockRepository(MockBehavior.Strict).Create<IRepository<PacientDoctor>>();

            repositoryMockPatient.Setup(r => r.Update(It.IsAny<Patient>()))
                          .Verifiable();
            var repositoryMockUser = new MockRepository(MockBehavior.Strict).Create<IUserRepository>();
            var sut = new PatientService(repositoryMockPatient.Object, repositoryMockUser.Object, repositoryMockPacientDoctor.Object, _context);

            var patient = new Patient()
            {
                Id = 1,
                User = new User() { Password = "Cisdfsfdos22!", UserName = "Radu231" },
                Address = "str 321321312",
                Birthdate = new DateTime(1997 - 02 - 22),
                City = "Bucharest",
                Country = "Romania",
                Gender = "Male",
                FirstName = "Rsada",
                LastName = "Sdasdas",
                SocialSecurityNumber = "123213",
                Precondition = "doc",
            };
            //Act
            sut.UpdatePatient(patient);
            //Assert
            repositoryMockPatient.VerifyAll();
        }

        [TestMethod]
        public void testGettingAPatientById()
        {
            //Arrange
            var patients = new List<Patient>()
            {

            new Patient()
            {
                Id=1,
                FirstName="Radu12321",
	            LastName=" fdsafd",
                Precondition="dafsaf",
                Birthdate = new DateTime(1997 - 02 - 22),
                SocialSecurityNumber = "123213",
                 Gender = "Male",
                Country = "Romania",
                City = "Bucharest",
                Address = "str 321321312",
                User = new User() { Password = "Cisdfsfdos22!", UserName = "Radu" }
             },
            new Patient()
            {
                Id = 2,
                FirstName="Radu12321",
                LastName=" fdsafd",
                Precondition="dafsaf",
                Birthdate = new DateTime(1997 - 02 - 22),
                SocialSecurityNumber = "123213",
                 Gender = "Male",
                Country = "Romania",
                City = "Bucharest",
                Address = "str 321321312",
                User = new User() { Password = "Cisdfsfdos22!", UserName = "Radu" }
            },
            new Patient()
            {
                Id = 3,
                FirstName="Radu12321",
                LastName=" fdsafd",
                Precondition="dafsaf",
                Birthdate = new DateTime(1997 - 02 - 22),
                SocialSecurityNumber = "123213",
                 Gender = "Male",
                Country = "Romania",
                City = "Bucharest",
                Address = "str 321321312",
                User = new User() { Password = "Cisdfsfdos22!", UserName = "Radu" }
            }
            };
            var repositoryMockPatient = new MockRepository(MockBehavior.Loose).Create<IRepository<Patient>>();
            var repositoryMockUser = new MockRepository(MockBehavior.Strict).Create<IUserRepository>();
            var repositoryMockPacientDoctor = new MockRepository(MockBehavior.Strict).Create<IRepository<PacientDoctor>>();

            var sut = new PatientService(repositoryMockPatient.Object, repositoryMockUser.Object, repositoryMockPacientDoctor.Object, _context);
            //Act
            var result = sut.GetPatientById(patients[0].Id);
            //Assert
            repositoryMockPatient.VerifyAll();
        }


        [TestMethod]
        public void testForPasswordValidation()
        {
            //Arrange
            var patient = new Patient()
            {
                Id = 1,
                User = new User() { Password = "Cisdfsfdos22!", UserName = "Radu231" },
                Address = "str 321321312",
                Birthdate = new DateTime(1997 - 02 - 22),
                City = "Bucharest",
                Country = "Romania",
                Gender = "Male",
                FirstName = "Rsada",
                LastName = "Sdasdas",
                SocialSecurityNumber = "123213",
                Precondition = "doc",
            };

            var repositoryMockPatient = new MockRepository(MockBehavior.Strict).Create<IRepository<Patient>>();
            var repositoryMockUser = new MockRepository(MockBehavior.Strict).Create<IUserRepository>();
            var repositoryMockPacientDoctor = new MockRepository(MockBehavior.Strict).Create<IRepository<PacientDoctor>>();

            var sut = new PatientService(repositoryMockPatient.Object, repositoryMockUser.Object, repositoryMockPacientDoctor.Object, _context);
            //Act
            sut.IsValidPassword(patient);
            //Assert
            Assert.AreEqual(sut.IsValidPassword(patient), true);
        }

        [TestMethod]
        public void testUsernameOrPasswordAreEmpty()
        {
            //Arrange
            var patient = new Patient()
            {
                Id = 1,
                User = new User() { Password = "Cisdfsfdos22!", UserName = "Radu231" },
                Address = "str 321321312",
                Birthdate = new DateTime(1997 - 02 - 22),
                City = "Bucharest",
                Country = "Romania",
                Gender = "Male",
                FirstName = "Rsada",
                LastName = "Sdasdas",
                SocialSecurityNumber = "123213",
                Precondition = "doc",
            };
            
            var repositoryMockPatient = new MockRepository(MockBehavior.Strict).Create<IRepository<Patient>>();
            var repositoryMockUser = new MockRepository(MockBehavior.Strict).Create<IUserRepository>();
            var repositoryMockPacientDoctor = new MockRepository(MockBehavior.Strict).Create<IRepository<PacientDoctor>>();

            var sut = new PatientService(repositoryMockPatient.Object, repositoryMockUser.Object, repositoryMockPacientDoctor.Object, _context);
            //Act
            sut.IsNotEmpty(patient);
            //Assert
            Assert.AreEqual(sut.IsNotEmpty(patient), true);
        }

        [TestMethod]
        public void testForCheckingIfUsernameExists()
        {
            //Arrange
            var patient = new Patient()
            {
                Id = 1,
                User = new User() { Password = "Cisdfsfdos22!", UserName = "Radu231" },
                Address = "str 321321312",
                Birthdate = new DateTime(1997 - 02 - 22),
                City = "Bucharest",
                Country = "Romania",
                Gender = "Male",
                FirstName = "Rsada",
                LastName = "Sdasdas",
                SocialSecurityNumber = "123213",
                Precondition = "doc",
            };

            var repositoryMockPatient = new MockRepository(MockBehavior.Strict).Create<IRepository<Patient>>();
            var repositoryMockUser = new MockRepository(MockBehavior.Strict).Create<IUserRepository>();
            var repositoryMockPacientDoctor = new MockRepository(MockBehavior.Strict).Create<IRepository<PacientDoctor>>();

            repositoryMockUser.Setup(r => r.ExistsUserName(patient.User))
                          .Returns(true);
            //Act
            var sut = new PatientService(repositoryMockPatient.Object, repositoryMockUser.Object, repositoryMockPacientDoctor.Object, _context);
            sut.ExistUsername(patient);
            //Assert
            Assert.AreEqual(sut.IsNotEmpty(patient), true);
        }
    }
}
