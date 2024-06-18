from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
# Register your models here.
from .models import Question,TestRecord

# admin.site.register(CustomUser,UserAdmin)
admin.site.register(Question)
admin.site.register(TestRecord)