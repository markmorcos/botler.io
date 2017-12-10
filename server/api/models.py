from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.dispatch import receiver

class Message(models.Model):
    """This class represents the message model."""
    text = models.CharField(max_length=255, blank=False)
    user = models.ForeignKey('auth.User',
    related_name='messages',
    on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):    
        """Return a human readable representation of the model instance."""
        return "{}".format(self.text)

# This receiver handles token creation immediately a new user is created.
@receiver(post_save, sender=User)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
