# My Django Project

This is a Django project that supports user login, registration, and CRUD operations for products.

## Features

- User registration and login functionality
- CRUD operations for products
- Admin interface for managing users and products

## Project Structure

```
my_django_project
├── my_django_project
│   ├── __init__.py
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── products
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── migrations
│   │   └── __init__.py
│   ├── models.py
│   ├── tests.py
│   └── views.py
├── users
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── migrations
│   │   └── __init__.py
│   ├── models.py
│   ├── forms.py
│   ├── tests.py
│   └── views.py
├── manage.py
└── README.md
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd my_django_project
   ```

3. Create a virtual environment:
   ```
   python -m venv venv
   ```

4. Activate the virtual environment:
   - On Windows:
     ```
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```
     source venv/bin/activate
     ```

5. Install the required packages:
   ```
   pip install -r requirements.txt
   ```

6. Apply migrations:
   ```
   python manage.py migrate
   ```

7. Create a superuser to access the admin interface:
   ```
   python manage.py createsuperuser
   ```

8. Run the development server:
   ```
   python manage.py runserver
   ```

## Usage

- Access the application at `http://127.0.0.1:8000/`
- Access the admin interface at `http://127.0.0.1:8000/admin/` using the superuser credentials.

## License

This project is licensed under the MIT License.