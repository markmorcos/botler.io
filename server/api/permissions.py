from rest_framework.permissions import BasePermission
from .models import Message

class IsOwner(BasePermission):
    """Custom permission class to allow only message owners to edit them."""

    def has_object_permission(self, request, view, obj):
        """Return True if permission is granted to the message owner."""
        if isinstance(obj, Message):
            return obj.user == request.user
        return obj.user == request.user
