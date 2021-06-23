using Healthy.Data.Entities;
using Healthy.Data.Interfaces;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System.Collections.Generic;
using System.Linq;

namespace Healthy.Api.Tests
{
    class IUserRepositoryTests
    {
        [TestClass]
        public class IRepositoryTests
        {
            public TestContext TestContext { get; set; }

            public IUserRepository mockUserRepository;
            [TestInitialize()]
            public void Startup()
            {
                IList<User> products = new List<User>
                {
                    new User
                    { Id=1, UserName = "John1", Password = "Mock123!" },
                    new User
                    { Id=2, UserName = "John2", Password = "Mock123!" },
                    new User
                    { Id=3, UserName = "John3", Password = "Mock123!" }
                };

                Mock<IUserRepository> mockUserRepository = new Mock<IUserRepository>();
                mockUserRepository.Setup(mr => mr.GetByAll()).Returns(products);

                mockUserRepository.Setup(mr => mr.GetById(
                    It.IsAny<int>())).Returns((int i) => products.Where(
                    x => x.Id == i).Single());

                mockUserRepository.Setup(r => r.Insert(It.IsAny<User>())).Callback(
                    (User target) =>
                    {
                        target.UserName = "newJohnDoe";
                        target.Password = "Mock123!";
                        target.Id = products.Count() + 1;
                        products.Add(target);
                    });

                mockUserRepository.Setup(r => r.Update(It.IsAny<User>()));

                mockUserRepository.Setup(r => r.ExistsUserName(It.IsAny<User>())).Returns(
                    (User target) =>
                    {

                        var original = products.Where(
                             q => q.UserName == target.UserName).Single();

                        if (original == null)
                        {
                            return false;
                        }
                        return true;
                    });

                this.mockUserRepository = mockUserRepository.Object;
            }

            [TestCleanup()]
            public void Cleanup()
            {
                mockUserRepository = null;

            }

            [TestMethod]
            public void CanReturnProductById()
            {
                User testUser = this.mockUserRepository.GetById(1);

                Assert.IsNotNull(testUser);
                Assert.IsInstanceOfType(testUser, typeof(User));
                Assert.AreEqual("John1", testUser.UserName);
            }

            [TestMethod]
            public void CanReturnAllProducts()
            {
                // Try finding all products
                List<User> testProducts = (List<User>)this.mockUserRepository.GetByAll();

                Assert.IsNotNull(testProducts);
                Assert.AreEqual(3, testProducts.Count);
            }

            [TestMethod]
            public void CanInsertProduct()
            {
                User newUser = new User
                { Id = 4, UserName = "John4", Password = "Mock123!" };

                int userCount = this.mockUserRepository.GetByAll().Count();
                Assert.AreEqual(3, userCount);

                this.mockUserRepository.Insert(newUser);

                userCount = this.mockUserRepository.GetByAll().Count();
                Assert.AreEqual(4, userCount);

                User testUser = this.mockUserRepository.GetById(4);
                Assert.IsNotNull(testUser);
                Assert.IsInstanceOfType(testUser, typeof(User));
                Assert.AreEqual(4, testUser.Id);
            }

            [TestMethod]
            public void CanUpdateProduct()
            {
                User testUser = this.mockUserRepository.GetById(1);

                testUser.UserName = "NewJohn";

                this.mockUserRepository.Update(testUser);

                Assert.AreEqual("NewJohn", this.mockUserRepository.GetById(1).UserName);
            }

            [TestMethod]
            public void ExistsUser()
            {
                User newUser = new User() { UserName = "John1", Password = "CouldBeAnything" };

                bool existsUsername = this.mockUserRepository.ExistsUserName(newUser);

                Assert.AreEqual(true, existsUsername);
            }
        }
    }
}
