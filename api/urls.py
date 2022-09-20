from django.urls import path
from . import views


urlpatterns = [
    path('login/',views.login_new,name="login_new"),
    path('logout_new/',views.logout_new,name="logout_new"),
    path('signupbarista/',views.signupbarista,name="signupbarista"),
    path('signupcustomer/',views.signupcustomer,name="signupcustomer"),
    path('', views.index,name='index'),
    path('api/baristas/', views.baristas,name='baristas'),
    path('api/select_b/', views.select_b,name='select_b'),
    path('api/beverage_s/', views.beverage_s,name='beverage_s'),
    path('api/order/<int:id>/', views.order,name='order'),
    path('api/newstatus/<int:id>/', views.newstatus,name='newstatus'),
    path('api/allorders/', views.allorders,name='allorders'),
    path('api/updatestatus/', views.updatestatus,name='updatestatus'),
    path('api/reviews/', views.reviews,name='reviews'),
    path('api/new_reviews/', views.new_reviews,name='new_reviews'),
    path('api/beverages/', views.beverages,name='beverages'),
    path('api/beverages_all/', views.beverages_all,name='beverages_all'),
    path('api/updatebeverage/', views.updatebeverage,name='updatebeverage'),
    path('api/customer/', views.customer,name='customer'),
    path('api/has_bev/', views.has_bev,name='has_bev'),
    path('api/love/<int:id>/', views.love,name='love'),
    path('api/cancelorder/<int:id>/', views.cancelorder,name='cancelorder'),



]
