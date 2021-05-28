
# todo/views.py
from django.shortcuts import get_object_or_404, render
#from django.shortcuts import render
from rest_framework import viewsets          # add this
from rest_framework import permissions
#from setup.permissions import IsOwnerOrReadOnly, IsOwner, IsReadOnly
from .serializers import TodoSerializer      # add this
from .serializers import AIUserSerializer
from .serializers import ProfileSerializer
from .models import Todo   
from .models import AIUser
from .models import Profile
from rest_framework.decorators import action
from rest_framework.response import Response
from drf_hal_json.views import HalCreateModelMixin
import logging
import json

logger = logging.getLogger("ai_recruiter_logger")
# add this
        
class TodoView(HalCreateModelMixin,viewsets.ModelViewSet):       # add this
  serializer_class = TodoSerializer          # add this
  queryset = Todo.objects.all()              # add this
    
    
class AIUserView(HalCreateModelMixin,viewsets.ModelViewSet):       # add this
  serializer_class = AIUserSerializer          # add this
  queryset = AIUser.objects.all()
  #permission_classes = (IsOwner)    
  #filterset_fields = ('username', )    # add this
  @action(detail=False, url_path='authenticate', methods=['post'])
  def authenticate_many(self, request, *args, **kwargs):
      print(request.data) 
      username = request.data.get('username')
      password = request.data.get('password')
      #username = request.POST['username']
      #password = request.POST['password']
      try:
        user = get_object_or_404(AIUser, username=username)
      except Exception as exception:
        print(str(exception))
        #template_name = 'notes/login.html'
        error_username = "Invalid username"
        context = {'error_useremail': error_username,
                'error_password': error_password}
        return Response(context)   

      if user:
        check, error_username, error_password = user.authenticate(username, password)
        print(check,error_username,error_password)
        if check:
              #request.session["user_token"] = user.id
              #template_name = 'notes/Feeds_display.html'
              logger.info("authenticated username "+username)
        else :
           print("setting template as login") 
           #template_name = 'notes/login.html'
           logger.info("authenticate failure username "+username )
      else :
        print("setting template as login")
        #template_name = 'notes/login.html'
        error_username = "Invalid username"
        logger.info("validation failure username "+username )
        
      context = { 'authenticated': check,
                  'userinfo':{'url':" ",'id':user.id,'firstName':user.firstName,'lastName':user.lastName},
                'error_useremail': error_username,
                'error_password': error_password}
    
      return Response(context)  



def _validate_username(username):
    error_username = None    
    if username == None:
       error_username = "user email is blank"
        
    if "@" not in username or "." not in username :
       error_username = "user email is not valid"         
    return error_username



def _validate_password(password,confirm_password):
    error_password = None
    error_confirm_password = None
    if password == None:
       error_password = "password is blank"
    if confirm_password == None:
       error_confirm_password = "confirm password is blank"
    if password != None and confirm_password != None:
       if password == confirm_password:
          error_password = None
          error_confirm_password = None
       else :
          error_password = "password and confirm_password do not match"
          error_confirm_password = "password and confirm_password do not match"   
    return error_password, error_confirm_password 


    
    
class ProfileView(HalCreateModelMixin,viewsets.ModelViewSet):       # add this
  serializer_class = ProfileSerializer          # add this
  queryset = Profile.objects.all()              # add this    
  @action(detail=False, url_path='getProfileByUserid', methods=['post'])
  def getProfileByUserId_many(self, request, *args, **kwargs):
      print(request.data) 
      #userid = request.POST.get('userid')
        
      userid = request.data.get('userid')    
        
      print("userid",userid);    
      #userid= request.GET("id");
      #fname = request.data.get('fname') 
      #lname = request.data.get('lname')
      #country = request.data.get('country')      
      #password = request.data.get('password')
      #username = request.POST['username']
      #password = request.POST['password']
      #context = None    
      try:
        profile = get_object_or_404(Profile, userid=userid)
        
      except Exception as exception:
        print(str(exception))
        #template_name = 'notes/login.html'
        #error_username = "Invalid username"
        context = {'error': "profile"}
        return Response(context)
      
      print("profile "+profile.fname)
        #profile.fname = fname
        #profile.lname = lname
        #profile.country = country
        #print("profile ",profile)
      id = profile.id
      fname = profile.fname
      lname = profile.lname
      country = profile.country
      context = {'url':" ",'id':id,'fname':fname,'lname':lname,'country':country,'userid':userid}
      return Response(context)   
  
    
class ExceptionLoggingMiddleware(object):
 def process_request(self, request):
    print(request.body)
    print(request.scheme)
    print(request.method)
    print(request.META)
    return None    

class IsOwner(permissions.BasePermission):
    """
    Custom permission to only allow owners of profile to view or edit it.
    """
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user