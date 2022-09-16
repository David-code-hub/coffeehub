from django.db import models
from django.contrib.auth.models import User
from cloudinary.models import CloudinaryField

# Create your models here.


class Barista(models.Model):
	user = models.ForeignKey(User,on_delete=models.CASCADE)
	profile_image = CloudinaryField('profile_image')
	online = models.BooleanField(default=False)


	def __str__(self):
		return self.user.username

class Beverage(models.Model):
	name = models.CharField(max_length=255)
	active = models.BooleanField(default=True)

	def __str__(self):
		return self.name

class Status(models.Model):
	order = models.ForeignKey('Order',on_delete=models.CASCADE,related_name='order_status')
	date = models.DateTimeField(auto_now=True)
	status_val = models.CharField(max_length=50,null=True,blank=True)
	time = models.TimeField(auto_now=True)

	def __str__(self):
		return str(self.id)

class Order(models.Model):
	barista = models.ForeignKey(Barista,on_delete=models.CASCADE)
	customer = models.ForeignKey('Customer',on_delete=models.CASCADE,related_name='customers_order')
	beverage = models.CharField(max_length=50,null=True,blank=True)
	sugar = models.IntegerField(null=True,blank=True)
	status = models.CharField(max_length=50,null=True,blank=True,default=0)
	status_info = models.ManyToManyField(Status,blank=True,related_name='status_order')
	time_to_complete = models.CharField(max_length=50,null=True,blank=True)
	date = models.DateTimeField(auto_now=True)
	time = models.TimeField(auto_now=True)
	placed = models.BooleanField(default=False)

	def __str__(self):
		return str(self.id)


class Customer(models.Model):
	user = models.ForeignKey(User,on_delete=models.CASCADE)
	profile = CloudinaryField('profile')
	orders = models.ManyToManyField(Order,blank=True,related_name='customer_orders')

	def __str__(self):
		return self.user.username


class Review(models.Model):
	customer = models.ForeignKey(Customer,on_delete=models.CASCADE)
	rate = models.IntegerField()
	comment = models.TextField(max_length=100, null=True,blank=True)
	love = models.ManyToManyField(User,blank=True)
	datetime = models.DateTimeField(auto_now=True)
	loading = models.BooleanField(default=False)

	def __str__(self):
		return str(self.customer)
