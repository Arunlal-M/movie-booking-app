import random,uuid
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.contrib.postgres.fields import JSONField

class Movie(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(max_length=1200)
    poster = models.URLField(max_length=200, default="https://placehold.co/200x250")
    genre = models.CharField(max_length=50)
    release_date = models.DateField()
    availability = models.BooleanField(default=True)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    trailer = models.URLField(max_length=100)
    show_time = models.JSONField(max_length=50)


    def __str__(self):
        return self.title

class BookingRegister(models.Model):
    booking_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, null=True, blank=True)
    booking_date = models.DateField()
    booking_time = models.CharField(max_length=10)
    quantity = models.PositiveIntegerField()
    seats_booked = models.CharField(max_length=200)
    booking_qr = models.FileField(upload_to='booking_qr/', null=True, blank=True)
    booking_pdf = models.FileField(upload_to='booking_pdfs/', blank=True, null=True)
    show_date = models.DateField()
    total_price = models.DecimalField(max_digits=6, decimal_places=2, default=180.00)
    
    def save(self, *args, **kwargs):
        if not self.booking_id:
            self.booking_id = self.generate_unique_booking_id()
        super().save(*args, **kwargs)

    def generate_unique_booking_id(self):
        timestamp = timezone.now().strftime('%Y%m%d%H%M%S%f')[:-3]  # Remove microseconds
        unique_id = str(uuid.uuid4())[:8]  # Take first 8 characters of UUID
        return f'{timestamp}-{unique_id}'



