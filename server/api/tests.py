from django.test import TestCase
from .models import Message
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse
from django.contrib.auth.models import User

class ModelTestCase(TestCase):
    """This class defines the test suite for the message model."""

    def setUp(self):
        """Define the test client and other test variables."""
        user = User.objects.create(username="markmorcos")
        self.text = "Hello, world!"
        self.message = Message(text=self.text, user=user)

    def test_model_can_create_a_message(self):
        """Test the message model can create a message."""
        old_count = Message.objects.count()
        self.message.save()
        new_count = Message.objects.count()
        self.assertNotEqual(old_count, new_count)

class ViewTestCase(TestCase):
    """Test suite for the api views."""

    def setUp(self):
        """Define the test client and other test variables."""
        user = User.objects.create(username="markmorcos")

        # Initialize client and force it to use authentication
        self.client = APIClient()
        self.client.force_authenticate(user=user)

        # Since user model instance is not serializable, use its Id/PK
        self.message_data = {'text': 'Hello, world!', 'user': user.id}
        self.response = self.client.post(
            reverse('create'),
            self.message_data,
            format="json")

    def test_api_can_create_a_message(self):
        """Test the api has bucket creation capability."""
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)

    def test_authorization_is_enforced(self):
        """Test that the api has user authorization."""
        new_client = APIClient()
        res = new_client.get('/messages/', kwargs={'pk': 3}, format="json")
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)

    def test_api_can_get_a_message(self):
        """Test the api can get a given message."""
        message = Message.objects.get(id=1)
        response = self.client.get(
            '/messages/',
            kwargs={'pk': message.id}, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, message)

    def test_api_can_update_message(self):
        """Test the api can update a given message."""
        message = Message.objects.get()
        change_message = {'text': 'Hello, Django!'}
        res = self.client.put(
            reverse('details', kwargs={'pk': message.id}),
            change_message, format='json'
        )
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_api_can_delete_message(self):
        """Test the api can delete a message."""
        message = Message.objects.get()
        response = self.client.delete(
            reverse('details', kwargs={'pk': message.id}),
            format='json',
            follow=True)
        self.assertEquals(response.status_code, status.HTTP_204_NO_CONTENT)
