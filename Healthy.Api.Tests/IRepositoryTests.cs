using System.Collections.Generic;
using System.Linq;
using ConsoleApp2.Interfaces;
using Healthy.Data.Entities;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace Healthy.Api.Tests
{
    [TestClass]
    public class IRepositoryTests
    {
        public TestContext TestContext { get; set; }

        public IRepository<Patient> MockProductsRepository;
        [TestInitialize()]
        public void Startup()
        {
            IList<Patient> products = new List<Patient>
                {
                    new Patient
                    { Id=1, FirstName = "John", LastName = "Doe" },
                    new Patient
                    { Id=2, FirstName = "John2", LastName = "Doe2" },
                    new Patient
                    { Id=3, FirstName = "John3", LastName = "Doe3" }
                };

            Mock<IRepository<Patient>> mockProductRepository = new Mock<IRepository<Patient>>();
            mockProductRepository.Setup(mr => mr.GetByAll()).Returns(products);

            mockProductRepository.Setup(mr => mr.GetById(
                It.IsAny<int>())).Returns((int i) => products.Where(
                x => x.Id == i).Single());

            mockProductRepository.Setup(r => r.Insert(It.IsAny<Patient>())).Callback(
                (Patient target) =>
                {
                    target.FirstName = "newJohnDoe";
                    target.LastName = "testDoe";
                    target.Id = products.Count() + 1;
                    products.Add(target);
                });
            mockProductRepository.Setup(r => r.Update(It.IsAny<Patient>()));
            this.MockProductsRepository = mockProductRepository.Object;
        }

        [TestCleanup()]
        public void Cleanup()
        {
            MockProductsRepository = null;

        }

        [TestMethod]
        public void CanReturnProductById()
        {
            Patient testProduct = this.MockProductsRepository.GetById(1);

            Assert.IsNotNull(testProduct);
            Assert.IsInstanceOfType(testProduct, typeof(Patient));
            Assert.AreEqual("John", testProduct.FirstName);
        }

        [TestMethod]
        public void CanReturnAllProducts()
        {
            // Try finding all products
            IList<Patient> testProducts = (IList<Patient>)this.MockProductsRepository.GetByAll();

            Assert.IsNotNull(testProducts);
            Assert.AreEqual(3, testProducts.Count);
        }

        [TestMethod]
        public void CanInsertProduct()
        {
            Patient newProduct = new Patient
            { Id = 4, FirstName = "John4", LastName = "Doe4" };

            int productCount = this.MockProductsRepository.GetByAll().Count();
            Assert.AreEqual(3, productCount);

            this.MockProductsRepository.Insert(newProduct);

            productCount = this.MockProductsRepository.GetByAll().Count();
            Assert.AreEqual(4, productCount);

            Patient testProduct = this.MockProductsRepository.GetById(4);
            Assert.IsNotNull(testProduct);
            Assert.IsInstanceOfType(testProduct, typeof(Patient));
            Assert.AreEqual(4, testProduct.Id);
        }

        [TestMethod]
        public void CanUpdateProduct()
        {
            Patient testProduct = this.MockProductsRepository.GetById(1);

            testProduct.FirstName = "NewJohn";

            this.MockProductsRepository.Update(testProduct);

            Assert.AreEqual("NewJohn", this.MockProductsRepository.GetById(1).FirstName);
        }
    }
}
