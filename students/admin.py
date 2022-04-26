from django.contrib import admin
from students import models

# Register your models here.

class AuthorAmin(admin.ModelAdmin):
    pass

admin.site.register(models.Student)
admin.site.register(models.Assignments)


