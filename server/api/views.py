from rest_framework import generics, permissions
from .permissions import IsOwner
from .serializers import MessageSerializer, UserSerializer
from .models import Message
from django.contrib.auth.models import User

class CreateView(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""

    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = (
        permissions.IsAuthenticated, IsOwner)

    def perform_create(self, serializer):
        """Save the post data when creating a new Message."""
        serializer.save(user=self.request.user)

class DetailsView(generics.RetrieveUpdateDestroyAPIView):
    """This class handles GET, PUT, PATCH and DELETE requests."""

    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = (
        permissions.IsAuthenticated,
        IsOwner)

class UserView(generics.ListCreateAPIView):
    """View to list the user queryset."""
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        """Save the post data when creating a new Message."""
        serializer.save()

class UserDetailsView(generics.RetrieveAPIView):
    """View to retrieve a user instance."""
    queryset = User.objects.all()
    serializer_class = UserSerializer
