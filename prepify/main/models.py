from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.
from django.contrib.auth.models import User


# class CustomUser(AbstractUser):
#     name= models.CharField(max_length=50, blank=False, null=False)
#     email_address = models.EmailField(blank=False, null=False)
#     contact_number = models.CharField(max_length=15, blank=True, null=True)
#     department = models.CharField(max_length=100)
#     year = models.PositiveSmallIntegerField(null=True)

class Question(models.Model):
    QUESTION_TYPES = (
        ('tech', 'Technical'),
        ('hr', 'HR question'),
        ('bhbrl', 'Behavioural Question'),
    )

    question_type = models.CharField(max_length=20, choices=QUESTION_TYPES)
    question_text = models.TextField()

    def __str__(self):
        return self.question_text[:50]



class TestRecord(models.Model):
    userId = models.ForeignKey(User, on_delete= models.CASCADE)
    question = models.TextField(null= False)
    answer = models.TextField(null=False)
    score = models.CharField(max_length=1000)