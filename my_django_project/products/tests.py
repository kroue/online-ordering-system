from django.test import TestCase
from .models import Product

class ProductModelTest(TestCase):

    def setUp(self):
        self.product = Product.objects.create(
            name="Test Product",
            description="This is a test product.",
            price=10.99
        )

    def test_product_creation(self):
        self.assertEqual(self.product.name, "Test Product")
        self.assertEqual(self.product.description, "This is a test product.")
        self.assertEqual(self.product.price, 10.99)

    def test_product_str(self):
        self.assertEqual(str(self.product), "Test Product")  # Assuming __str__ method is defined in Product model

    def test_product_price(self):
        self.assertGreater(self.product.price, 0)  # Ensure price is greater than zero

    def test_product_update(self):
        self.product.price = 15.99
        self.product.save()
        self.assertEqual(self.product.price, 15.99)

    def test_product_delete(self):
        product_id = self.product.id
        self.product.delete()
        with self.assertRaises(Product.DoesNotExist):
            Product.objects.get(id=product_id)