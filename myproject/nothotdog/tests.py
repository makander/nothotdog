
from PIL import Image as MockImage
import tempfile

from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework import status


class UserTests(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.standard_user = User.objects.create(username="tester")
        self.standard_user.set_password("tester")
        self.standard_user.save()

    def test_create_account(self):
        """
        Ensure we can create a new user object.
        """

        data = {'username': 'test', 'password': "test1",
                'email': 'test@test.com'}
        response = self.client.post(
            'http://localhost:8080/api/signup/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_login(self):
        """
        Ensure we can login a user.
        """
        data = {'username': 'tester',
                'password': 'tester'}
        response = self.client.post('http://localhost:8080/api/auth/login/',
                                    data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class AdvancedImageTest(APITestCase):
    def setUp(self):

        self.client = APIClient()

        self.super_user = User.objects.create_superuser(username='testeradmin')
        self.super_user.set_password('testeradmin')
        self.super_user.save()

        self.client.force_authenticate(user=self.super_user)
        self.tmp_file = tempfile.NamedTemporaryFile(suffix='.jpg')
        image = MockImage.new('RGB', (100, 100))
        image.save(self.tmp_file.name)

    def test_change_status(self):
        """
        Ensure admin user can change status
        """
        url = reverse('image-list')

        data = {'name': 'test-image', 'description': 'testdescript'}
        image = self.client.post(url, data, format='json')

        name = image.data['name']
        put_url = reverse('image-detail', kwargs={'pk': image.data['id']})

        payload = {
            'name': name,
            'valid': 'True'}

        updated_description = self.client.put(put_url,
                                              payload,
                                              )

        self.assertTrue(updated_description.data['valid'])

    def test_delete_image(self):
        """
        Ensure we can delete an image.
        """
        url = reverse('image-list')

        data = {'name': 'test-image', 'description': 'testdescript'}
        image = self.client.post(url, data, format='json')

        delete_url = reverse('image-detail', kwargs={'pk': image.data['id']})
        deleted = self.client.delete(delete_url, format='json')
        self.assertEqual(deleted.status_code, status.HTTP_404_NOT_FOUND)


class BasicImageTests(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.standard_user = User.objects.create(username="tester")
        self.standard_user.set_password("tester")
        self.standard_user.save()

        self.client.force_authenticate(user=self.standard_user)
        self.tmp_file = tempfile.NamedTemporaryFile(suffix='.jpg')
        image = MockImage.new('RGB', (100, 100))
        image.save(self.tmp_file.name)

    def test_list_images(self):
        """
        Ensure we can list images.
        """
        url = reverse('image-list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_image(self):
        """
        Ensure we can create a new image.
        """
        url = reverse('image-list')

        data = {'name': 'test-image', 'description': 'testdescript'}
        image = self.client.post(url, data, format='json')

        name = image.data['name']
        put_url = reverse('image-detail', kwargs={'pk': image.data['id']})

        payload = {"image": self.tmp_file,
                   'name': name}

        updated_with_image = self.client.put(put_url,
                                             payload
                                             )
        self.assertEqual(updated_with_image.status_code, status.HTTP_200_OK)

    def test_change_name(self):
        """
        Ensure we can edit an image.
        """
        url = reverse('image-list')

        data = {'name': 'test-image', 'description': 'testdescript'}
        image = self.client.post(url, data, format='json')

        put_url = reverse('image-detail', kwargs={'pk': image.data['id']})

        payload = {
            'name': 'this is an updated name'}

        updated_name = self.client.put(put_url,
                                       payload
                                       )

        self.assertEqual(updated_name.data['name'], payload['name'])

    def test_change_description(self):
        """
        Ensure we can change a description.
        """
        url = reverse('image-list')

        data = {'name': 'test-image', 'description': 'testdescript'}
        image = self.client.post(url, data, format='json')

        name = image.data['name']
        put_url = reverse('image-detail', kwargs={'pk': image.data['id']})

        payload = {
            'name': name,
            'description': 'this is an updated description'}

        updated_description = self.client.put(put_url,
                                              payload,
                                              )

        self.assertEqual(
            updated_description.data['description'], payload['description'])

    def test_change_status(self):
        url = reverse('image-list')

        data = {'name': 'test-image', 'description': 'testdescript'}
        image = self.client.post(url, data, format='json')

        name = image.data['name']
        put_url = reverse('image-detail', kwargs={'pk': image.data['id']})

        payload = {
            'name': name,
            'valid': 'True'}

        updated_description = self.client.put(put_url,
                                              payload,
                                              )

        self.assertIsNone(
            updated_description.data['valid'])
