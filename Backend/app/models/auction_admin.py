from django.contrib.auth.models import User
from django.db import models


class AuctionAdmin(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="auction_user")
    phone = models.CharField(max_length=20)
    create_at = models.DateField(auto_now_add=True)
    update_at = models.DateField(auto_now_add=True)
