from django.contrib.auth.models import User
from django.db import models


class AuctionUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="auction_user")
    avatar = models.ImageField(upload_to="avatar/")
    phone = models.CharField(max_length=20)
    evalute = models.CharField(choices="default", default="default")
    coin = models.PositiveIntegerField(default=0)
    create_at = models.DateField(auto_now_add=True)
    update_at = models.DateField(auto_now_add=True)
