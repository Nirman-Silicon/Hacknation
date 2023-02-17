from django.urls import path
from .import views

urlpatterns = [
    path('feed',views.index,name='index'),
    path('',views.signin,name='signin'),
    path('signup',views.signup,name='signup'),
    path('signin',views.signin,name='signin'),
    path('logout',views.logout,name='logout'),
    path('profile',views.profile,name='profile'),
    path('aspect',views.aspect,name='aspect'),
    
]