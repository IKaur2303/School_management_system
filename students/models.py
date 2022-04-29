from string import digits
import uuid
from django.db import models

# Create your models here.

class Student(models.Model):
    choices= [(1,'First'),(2,'Second'),(3,'Third'),(4,'Fourth'),(5,'Fifth'),(6,'Sixth'),(7,'Seventh'),(8,'Eighth')
    ]
    # reg_no = models.UUIDField(default=uuid.uuid4, unique=True, editable=False, )
    reg_no = models.AutoField(unique=True,primary_key=True)
    firstname = models.CharField(max_length=125)
    lastname = models.CharField(max_length=125)
    dob = models.CharField(max_length=20)
    father_name = models.CharField(max_length=125)
    mother_name = models.CharField(max_length=125)
    guardian_contact = models.IntegerField()
    standard = models.IntegerField(choices = choices)

    def tojson(self):
        return{
            'reg_no':self.reg_no,
            'firstname':self.firstname,
            'lastname':self.lastname,
            'dob':self.dob,
            'father_name':self.father_name,
            'mother_name':self.mother_name,
            'guardian_contact':self.guardian_contact,
            'standard':self.standard
        }


    def __str__(self):
        return self.firstname

class Assignments(models.Model):
    choices= [('english','English'),('hindi','Hindi'),('mathematics','Mathematics'),('science','Science'),('history','History'),('evs','Evs'),('drawing','Drawing')
    ]
    standard= [(1,'First'),(2,'Second'),(3,'Third'),(4,'Fourth'),(5,'Fifth'),(6,'Sixth'),(7,'Seventh'),(8,'Eighth')
    ]
    title = models.CharField(max_length=200)
    description = models.CharField(max_length=1000)
    for_standard = models.IntegerField(choices= standard)
    issue_date = models.DateTimeField(auto_now_add=True)
    due_date = models.DateTimeField()
    subject = models.CharField(choices = choices,max_length=250)


    def tojson(self):
        return {
            'title':self.title,
            'description':self.description,
            'for_standard':self.for_standard,
            'issue_date':self.issue_date,
            'due_date':self.due_date,
            'subject':self.subject
        }

    def __str__(self):
        return self.title
