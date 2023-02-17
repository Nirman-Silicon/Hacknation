from django.shortcuts import render , redirect
from django.contrib.auth.models import User , auth
from django.contrib import messages
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from .models import Profile

# Create your views here.

@login_required(login_url='signin')
def aspect(request):
    return render(request,'aspect.html')
@login_required(login_url='signin')
def profile(request):
    return render(request,'profile.html')
@login_required(login_url='signin')
def index(request):
    return render(request,'Landing.html')
    user_object = User.objects.get(username=request.user.username)
    user_profile = Profile.objects.get(user=user_object)


    posts = Post.objects.all()
    return render(request, 'Landing.html',{'user_profile':user_profile, 'posts':posts})
@login_required(login_url='signin') 
def signup(request):

    if request.method == 'POST':
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']
        password2 = request.POST['password2']

        if password == password2:
            if User.objects.filter(email=email).exists():
                messages.info(request , 'email taken already')
                return redirect('signup')
            elif User.objects.filter(username=username).exists():
                messages.info(request,'username taken')
                return redirect('signup')
            else:
                user = User.objects.create_user(username =username,email =email, password =password)
                user.save()

                user_model = User.objects.get(username=username)
                new_profile = Profile.objects.create(user=user_model,id_user=user_model.id)
                new_profile.save()
                return redirect('signup')
        else:
            messages.info(request , 'Password didnt match....')
            return redirect('signup')

    else:
        return render(request, 'signup.html')
def signin(request):
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']

        user = auth.authenticate(username=username,password=password)

        if user is not None:
            auth.login(request,user)
            return redirect('/')
        else:
            messages.info(request,'invalid pw or un')
            return redirect('signin')
    else:    
        return render(request , 'signin.html')
def logout(request):
    auth.logout(request)
    return redirect('signin')