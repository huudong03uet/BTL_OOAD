from django.db import models

from .auction_user import AuctionUser


class ItemImage(models.Model):
    item = models.ForeignKey(Item, related_name='item_images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='item_images/')


class Item(models.Model):
    auction_user = models.ManyToManyField(AuctionUser, related_name="histories")
    name = models.CharField(max_length=512)
    description = models.TextField(null=True, blank=True)
    create_at = models.DateField(auto_now_add=True)
    update_at = models.DateField(auto_now_add=True)
