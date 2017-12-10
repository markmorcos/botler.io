from rest_framework import serializers
from .models import Message
from django.contrib.auth.models import User

class MessageSerializer(serializers.ModelSerializer):
    """Serializer to map the Model instance into JSON format."""
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        """Meta class to map serializer's fields with the model fields."""
        model = Message
        fields = ('id', 'user', 'text', 'date')
        read_only_fields = ('date',)

class UserSerializer(serializers.ModelSerializer):
    """A user serializer to aid in authentication and authorization."""

    messages = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Message.objects.all())

    class Meta:
        """Map this serializer to the default django user model."""
        model = User
        fields = ('id', 'username', 'messages')
