from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from django.contrib import messages

def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=password)
            login(request, user)
            messages.success(request, 'Registration successful.')
            return redirect('home')  # Change 'home' to your desired redirect URL
    else:
        form = UserCreationForm()
    return render(request, 'users/register.html', {'form': form})

def user_login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            messages.success(request, 'Login successful.')
            return redirect('home')  # Change 'home' to your desired redirect URL
        else:
            messages.error(request, 'Invalid username or password.')
    return render(request, 'users/login.html')

@login_required
def user_logout(request):
    logout(request)
    messages.success(request, 'Logout successful.')
    return redirect('home')  # Change 'home' to your desired redirect URL