from django.contrib import admin
from .models import User  # Assuming you have a User model defined in users/models.py

admin.site.register(User)  # Register the User model with the admin site