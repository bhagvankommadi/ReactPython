
# backend/urls.py

from django.contrib import admin
from django.urls import path, include                 # add this
from rest_framework import routers                    # add this
from todo import views                            # add this
        
router = routers.DefaultRouter()                      # add this
router.register(r'todos', views.TodoView)     # add this
router.register(r'users', views.AIUserView) 
router.register(r'profile', views.ProfileView)         
urlpatterns = [
    path('admin/', admin.site.urls),           
    path('api/', include(router.urls))                # add this
]

handler415 = 'todo.error_handler.bad_request'