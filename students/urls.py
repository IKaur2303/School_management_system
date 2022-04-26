from django.urls import path
from students import views

urlpatterns = [
    path('home',views.add_student),
    path('login',views.signin),
    path('signout',views.signout),
    path('assignment',views.add_assignment),
    path('getstudent',views.get_students),
    path('getstudent/<int:id>',views.get_students),
    path('updatestudent/<int:id>',views.update_student),
    path('removestudent/<int:id>',views.remove_student),
    path('getassignment',views.get_assignment)
]