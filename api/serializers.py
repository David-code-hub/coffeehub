from rest_framework import serializers
from .models import Barista,Status,Order,Customer,Review,Beverage
from django.contrib.auth.models import User




class BaristaSerializer(serializers.ModelSerializer):
	class Meta:
		model = Barista
		fields = '__all__'
		depth = 1

class CustomerSerializer(serializers.ModelSerializer):
	class Meta:
		model = Customer
		fields = '__all__'
		depth = 1

class OrderSerializer(serializers.ModelSerializer):
	class Meta:
		model = Order
		fields = '__all__'
		depth = 1

class StatusSerializer(serializers.ModelSerializer):
	class Meta:
		model = Status
		fields = '__all__'
		depth = 1


class ReviewSerializer(serializers.ModelSerializer):
	user = serializers.CharField(source='customer.user.username')
	class Meta:
		model = Review
		fields = ['customer','rate','datetime','id','user','love','loading','comment']
		depth = 1

class BeverageSerializer(serializers.ModelSerializer):
	class Meta:
		model = Beverage
		fields = '__all__'
		depth = 1