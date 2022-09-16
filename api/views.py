from django.shortcuts import render,redirect
from .serializers import BaristaSerializer,CustomerSerializer,OrderSerializer,StatusSerializer,ReviewSerializer,BeverageSerializer
from django.http import HttpResponse
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from .models import Barista,Status,Order,Customer,Review,Beverage
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from rest_framework.decorators import api_view
from django.db.models import Avg
import json
from rest_framework.response import Response
# Create your views here.


@api_view(('GET',))
def love(request,id):
	r = Review.objects.get(id=id)
	user = request.user
	if user in r.love.all():
		r.love.remove(user)
		return HttpResponse('')
	else:
		r.love.add(user)
		return HttpResponse('')

def login_new(request):
	if request.method == 'POST':
		data = json.loads(request.body)
		username = data['username']
		password = data['password']
		# username = request.POST.get('username')
		# password = request.POST.get('password')
		user = authenticate(username=username, password=password)

		if user is not None:
				username = User.objects.get(username=username)
				if Barista.objects.filter(user__username=username):
					b = Barista.objects.filter(user__username=username)
					b.update(online=True)
					login(request, user)
					return HttpResponse('')
				else:
					login(request, user)
					return HttpResponse('')
					#messages.success(request, 'Welcome ' + str(username))
		else:
			if User.objects.filter(username=username):
				msg = 'Invalid credentials. NOTE: Fields may be case sensetive.'
				return JsonResponse({"err":msg},status=400)
			else:
				msg = 'Invalid credentials. NOTE: Fields may be case sensetive.'
				return JsonResponse({"err":msg},status=400)
	else:
		return render(request, 'login.html')

def signupcustomer(request):
	username = request.POST.get('username')
	password = request.POST.get('password')
	profile = request.FILES.get('profile')

	if username == '' or password == '':
		response = 'Please fill out all required fields.' 
		return JsonResponse({"err":response}, status=400) 
	if len(username) < 5:
		response = 'Username too short - minimum 5 characters' 
		return JsonResponse({"err":response}, status=400) 
	if len(password) < 6:
		response = 'Password too short - minimum 6 characters' 
		return JsonResponse({"err":response}, status=400) 
	if password:
		if User.objects.filter(username=username).exists():
			response = 'Sorry that username is already taken.' 
			return JsonResponse({"err":response}, status=400) 
		else:			
			user = User.objects.create_user(username=username, password=password)
			user.save()
			b = Customer.objects.create(profile=profile,user=user)
			login(request, user)
			return HttpResponse('')
	else:
		response = 'Error occured in password field.' 
		return JsonResponse({"err":response}, status=400) 

def signupbarista(request):
	username = request.POST.get('username')
	password = request.POST.get('password')
	profile_image = request.FILES.get('profile_image')

	if username == '' or password == '':
		response = 'Please fill out all required fields.' 
		return JsonResponse({"err":response}, status=400) 
	if len(username) < 5:
		response = 'Username too short - minimum 5 characters' 
		return JsonResponse({"err":response}, status=400) 
	if len(password) < 6:
		response = 'Password too short - minimum 6 characters' 
		return JsonResponse({"err":response}, status=400) 
	if password:
		if User.objects.filter(username=username).exists():
			response = 'Sorry that username is already taken.' 
			return JsonResponse({"err":response}, status=400) 
		else:			
			user = User.objects.create_user(username=username, password=password)
			user.save()
			b = Barista.objects.create(profile_image=profile_image,user=user,online=True)
			login(request, user)
			return HttpResponse('')
	else:
		response = 'Error occured in password field.' 
		return JsonResponse({"err":response}, status=400) 

def logout_new(request):
	user = request.user
	if Barista.objects.filter(user=user):
		b = Barista.objects.filter(user=user)
		b.update(online=False)
		logout(request)
		return redirect('login_new')
	else:
		logout(request)
		return redirect('login_new')

@login_required(login_url='login_new')
def index(request):
	if Customer.objects.filter(user= request.user).exists():
		customer = True
		barista = False
	else:
		customer = False
		barista =  True
	return render(request,'index.html',{"customer":customer,"barista":barista})


def select_b(request):
	data = json.loads(request.body)
	user = data['user']
	b = Barista.objects.get(user__username=user)
	c = Customer.objects.get(user=request.user)
	o = Order.objects.create(barista=b,customer=c)
	o.save()
	c.orders.add(o)
	# for s in Status.objects.all():
	# 	o.status_info.add(s)
	# 	o.save()
	serializer = OrderSerializer(o)
	return JsonResponse({'order':serializer.data})

def beverage_s(request):
	data = json.loads(request.body)
	beverage = data['beverage']
	order_id = data['order_id']
	sugar = data['sugar']
	o = Order.objects.filter(id=order_id).update(beverage=beverage,sugar=sugar,placed=True)
	return HttpResponse('')

@api_view(('GET',))
def order(request,id):
	o = Order.objects.get(id=id)
	serializer = OrderSerializer(o)
	return Response(serializer.data)

def has_bev(request):
	s = Order.objects.latest('id')
	if s.beverage:
		has_bev = True;
		return JsonResponse({'has_bev':has_bev})
	else:
		has_bev = False;
		return JsonResponse({'has_bev':has_bev})


@api_view(('GET',))
def newstatus(request,id):
	o = Order.objects.get(id=id)
	if Status.objects.filter(order=o):
		s = Status.objects.filter(order=o).latest('id')
		serializer = StatusSerializer(s)
		return Response(serializer.data)
	else:
		return HttpResponse('')

@api_view(('GET',))
def baristas(request):
	app = Barista.objects.filter(online=True)
	serializer = BaristaSerializer(app,many=True)
	return Response(serializer.data)

@api_view(('GET',))
def beverages(request):
	app = Beverage.objects.filter(active=True)
	serializer = BeverageSerializer(app,many=True)
	return Response(serializer.data)

@api_view(('GET',))
def beverages_all(request):
	app = Beverage.objects.all()
	serializer = BeverageSerializer(app,many=True)
	return Response(serializer.data)

@api_view(('GET',))
def reviews(request):
	r = Review.objects.all().order_by('-id')
	serializer = ReviewSerializer(r,many=True)
	return Response(serializer.data)

@api_view(('GET',))
def customer(request):
	c = Customer.objects.get(user=request.user)
	serializer = CustomerSerializer(c)
	return Response(serializer.data)


@api_view(('GET',))
def allorders(request):
	o = Order.objects.filter(placed=True).order_by('-id')
	serializer = OrderSerializer(o,many=True)
	return Response(serializer.data)

def new_reviews(request):
	c = Customer.objects.get(user=request.user)
	data = json.loads(request.body)
	rate = data['rate']
	comment = data['comment']
	r = Review.objects.create(rate = rate,customer=c,comment=comment)
	r.save()
	return HttpResponse('')

def updatestatus(request):
	data = json.loads(request.body)
	status = data['status']
	id_ = data['id_']
	if Order.objects.filter(id=id_,status=status).exists():
		return HttpResponse('')
	else:
		order_new = Order.objects.get(id=id_)
		order_new.status = status
		order_new.save()
		s = Status.objects.create(order=order_new,status_val=status)
		s.save()
		order_new.time_to_complete = s.date - order_new.date
		order_new.save()
		order_new.status_info.add(s)
		return HttpResponse('')
	
def updatebeverage(request):
	data = json.loads(request.body)
	id_ = data['id_']
	b = Beverage.objects.get(id=id_)
	if b.active == True:
		b.active = False
		b.save()
		msg = b.active
		return JsonResponse({"msg":msg})
	else:
		b.active = True
		b.save()
		msg = b.active
		return JsonResponse({"msg":msg})
		

def cancelorder(request,id):
	o = Order.objects.get(id=id)
	o.delete()
	return HttpResponse('')

	