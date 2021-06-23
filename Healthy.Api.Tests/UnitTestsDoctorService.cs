using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using ConsoleApp2.Interfaces;
using Healthy.Data.Entities;
using System.Collections.Generic;
using Assert = Microsoft.VisualStudio.TestTools.UnitTesting.Assert;
using Healthy.Api.Services;
using Healthy.Data.Interfaces;
using System;
using Healthy.Data;

namespace Healthy.Api.Tests
{
    [TestClass]
    public class UnitTestsDoctorService
    {
        private HealthyDbContext _context;

        [TestMethod]
        public void testInsertingDoctorsIntoDatabase()
        {
            //Arrange
            var repositoryMockDoctor = new MockRepository(MockBehavior.Strict).Create<IDoctorRepository>();
            var repositoryMockUser = new MockRepository(MockBehavior.Strict).Create<IUserRepository>();
            var repositoryMockPatientDoctor = new MockRepository(MockBehavior.Strict).Create<IRepository<PacientDoctor>>();
            var repositoryMockPatient = new MockRepository(MockBehavior.Strict).Create<IRepository<Patient>>();


            repositoryMockDoctor.Setup(r => r.Insert(It.IsAny<Doctor>()))
                          .Verifiable();
            var sut = new DoctorService(repositoryMockDoctor.Object, repositoryMockUser.Object, repositoryMockPatientDoctor.Object, repositoryMockPatient.Object, _context);

            var doctor = new Doctor()
            {
                Id = 1,
                User = new User() { Password = "Cisdfsfdos22!", UserName = "Radu231" },
                Address = "str 321321312",
                Birthdate = DateTime.Now,
                City = "Bucharest",
                Country = "Romania",
                Gender = "Male",
                FirstName = "Rsada",
                LastName = "Sdasdas",
                SocialSecurityNumber = "123213",
                Field = "doc",
                Certifications = new List<Certification> { new Certification() { Information = "fdsfsad" } }
            };

            //Act
            sut.InsertDoctor(doctor);

            //Asert
            repositoryMockDoctor.VerifyAll();
        }


        [TestMethod]
        public void testGettingAllDoctorsFromDatabase()
        {
            //Arrange
            var doctors = new List<Doctor>()
            {
             new Doctor(){  Id = 1,
                            User = new User() { Password = "Ciosfdos22!", UserName = "Radu321" },
                            Address = "sfsafd",
                             Birthdate = DateTime.Now,
                            City = "fsdfsdaf",
                            Country = "fdsafdsaf",
                            Gender = "asdafdsf",
                            FirstName = "dsfsfsaf",
                            LastName = "rewreqw",
                            SocialSecurityNumber = "123213",
                            Field = "dsadas",
                            Certifications = new List<Certification> { new Certification() { Information = "fdsfsad"}}
                            },
             new Doctor(){  Id = 2,
                            User = new User() { Password = "Ciosfdos22!", UserName = "Radu2" },
                            Address = "sfsafd",
                             Birthdate = DateTime.Now,
                            City = "fsdfsdaf",
                            Country = "fdsafdsaf",
                            Gender = "asdafdsf",
                            FirstName = "dsfsfsaf",
                            LastName = "rewreqw",
                            SocialSecurityNumber = "123213",
                            Field = "dsadas",
                            Certifications =new List<Certification> { new Certification() { Information = "fdsfsad"}}
                            },
             new Doctor(){  Id = 3,
                            User = new User() { Password = "Ciosfdos22!", UserName = "Radu3" },
                            Address = "sfsafd",
                            Birthdate = DateTime.Now,
                            City = "fsdfsdaf",
                            Country = "fdsafdsaf",
                            Gender = "asdafdsf",
                            FirstName = "dsfsfsaf",
                            LastName = "rewreqw",
                            SocialSecurityNumber = "123213",
                            Field = "dsadas",
                            Certifications =new List<Certification> { new Certification() { Information = "fdsfsad"}}
                            }
             };
            var repositoryMockDoctor = new MockRepository(MockBehavior.Strict).Create<IDoctorRepository>();
            var repositoryMockUser = new MockRepository(MockBehavior.Strict).Create<IUserRepository>();
            var repositoryMockPatientDoctor = new MockRepository(MockBehavior.Strict).Create<IRepository<PacientDoctor>>();
            var repositoryMockPatient = new MockRepository(MockBehavior.Strict).Create<IRepository<Patient>>();

            repositoryMockDoctor.Setup(r => r.GetByAll())
                .Returns(doctors);

            //Act
            var sut = new DoctorService(repositoryMockDoctor.Object, repositoryMockUser.Object, repositoryMockPatientDoctor.Object, repositoryMockPatient.Object, _context);
            var result = sut.GetDoctors();

            //Assert
            repositoryMockDoctor.VerifyAll();
        }

        [TestMethod]
        public void testForPasswordValidation()
        {
            //Arrange

            var doctor = new Doctor()
            {
                Id = 1,
                User = new User() { Password = "Ciocolata2202!", UserName = "Radu231" },
                Address = "str 321321312",
                Birthdate = DateTime.Now,
                City = "Bucharest",
                Country = "Romania",
                Gender = "Male",
                FirstName = "Rsada",
                LastName = "Sdasdas",
                SocialSecurityNumber = "123213",
                Field = "doc",
                Certifications = new List<Certification> { new Certification() { Information = "fdsfsad" } }
            };

            var repositoryMockDoctor = new MockRepository(MockBehavior.Strict).Create<IDoctorRepository>();
            var repositoryMockUser = new MockRepository(MockBehavior.Strict).Create<IUserRepository>();
            var repositoryMockPatientDoctor = new MockRepository(MockBehavior.Strict).Create<IRepository<PacientDoctor>>();
            var repositoryMockPatient = new MockRepository(MockBehavior.Strict).Create<IRepository<Patient>>();

            var sut = new DoctorService(repositoryMockDoctor.Object, repositoryMockUser.Object, repositoryMockPatientDoctor.Object, repositoryMockPatient.Object, _context);

            //Act
            sut.IsValidPassword(doctor);

            //Assert
            Assert.AreEqual(sut.IsValidPassword(doctor), true);
        }

        [TestMethod]
        public void testUsernameOrPasswordAreEmpty()
        {
            //Arrange

            var doctor = new Doctor()
            {
                Id = 1,
                User = new User() { Password = "Ciocolata2202!", UserName = "Radu231" },
                Address = "str 321321312",
                Birthdate = DateTime.Now,
                City = "Bucharest",
                Country = "Romania",
                Gender = "Male",
                FirstName = "Rsada",
                LastName = "Sdasdas",
                SocialSecurityNumber = "123213",
                Field = "doc",
                Certifications = new List<Certification> { new Certification() { Information = "fdsfsad" } }
            };

            var repositoryMockDoctor = new MockRepository(MockBehavior.Strict).Create<IDoctorRepository>();
            var repositoryMockUser = new MockRepository(MockBehavior.Strict).Create<IUserRepository>();
            var repositoryMockPatientDoctor = new MockRepository(MockBehavior.Strict).Create<IRepository<PacientDoctor>>();
            var repositoryMockPatient = new MockRepository(MockBehavior.Strict).Create<IRepository<Patient>>();

            var sut = new DoctorService(repositoryMockDoctor.Object, repositoryMockUser.Object, repositoryMockPatientDoctor.Object, repositoryMockPatient.Object, _context);

            //Act 
            sut.IsNotEmpty(doctor);

            //Assert
            Assert.AreEqual(sut.IsNotEmpty(doctor), true);
        }

        [TestMethod]
        public void testForCheckingIfUsernameExists()
        {
            //Arrange

            var doctor = new Doctor()
            {
                Id = 1,
                User = new User() { Password = "Cisdfsfdos22!", UserName = "Radu231" },
                Address = "str 321321312",
                Birthdate = DateTime.Now,
                City = "Bucharest",
                Country = "Romania",
                Gender = "Male",
                FirstName = "Rsada",
                LastName = "Sdasdas",
                SocialSecurityNumber = "123213",
                Field = "doc",
                Certifications = new List<Certification> { new Certification() { Information = "fdsfsad" } }
            };

            var repositoryMockDoctor = new MockRepository(MockBehavior.Strict).Create<IDoctorRepository>();
            var repositoryMockUser = new MockRepository(MockBehavior.Strict).Create<IUserRepository>();
            var repositoryMockPatientDoctor = new MockRepository(MockBehavior.Strict).Create<IRepository<PacientDoctor>>();
            var repositoryMockPatient = new MockRepository(MockBehavior.Strict).Create<IRepository<Patient>>();

            repositoryMockUser.Setup(r => r.ExistsUserName(doctor.User))
                          .Returns(true);
            var sut = new DoctorService(repositoryMockDoctor.Object, repositoryMockUser.Object, repositoryMockPatientDoctor.Object, repositoryMockPatient.Object, _context);

            //Act
            sut.ExistUsername(doctor);

            //Assert
            Assert.AreEqual(sut.IsNotEmpty(doctor), true);
        }
    }
}