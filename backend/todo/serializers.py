
# todo/serializers.py

from drf_hal_json.serializers import HalModelSerializer

from rest_framework import serializers
from .models import Todo
from .models import AIUser
from .models import Profile
      
class TodoSerializer( HalModelSerializer):

  url = serializers.HyperlinkedIdentityField(view_name="api:todo-detail")

  class Meta:
    model = Todo
    fields = ('url','id', 'title', 'description', 'completed')
    
    
class AIUserSerializer( HalModelSerializer):
    
  url = serializers.HyperlinkedIdentityField(view_name="api:aiuser-detail")

  class Meta:
    model = AIUser
    fields = ('url','id','firstName','lastName', 'username', 'password')
    
    
class ProfileSerializer( HalModelSerializer):
  url = serializers.HyperlinkedIdentityField(view_name="api:profile-detail")              
  class Meta:
    model = Profile
    fields = ('url','id', 'fname', 'lname', 'country','userid')    