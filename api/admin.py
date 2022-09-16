from django.contrib import admin
from .models import * 

# Register your models here.
class OrderAdmin(admin.ModelAdmin):
    list_display = ["barista", "customer","beverage","sugar","status"]

admin.site.register(Barista)
admin.site.register(Status)
admin.site.register(Order,OrderAdmin)
admin.site.register(Customer)
admin.site.register(Beverage)
admin.site.register(Review)
