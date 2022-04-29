import json
from pydoc import describe
from django.http import JsonResponse
from django.shortcuts import render
from django.contrib.auth import authenticate,login,logout
from django.views.decorators.csrf import csrf_exempt
from students import models
from django.core.exceptions import ObjectDoesNotExist
import students

# Create your views here.

#For admin login
@csrf_exempt
def signin(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        #print(">>>>>>>>>>>>>>>>>>>>>>",data)
        username = data['username']
        password = data['password']
        print('>>>>>>>>>>>>>>>>>',username,password)
        user = authenticate(username=username,password=password)
        if user:
            login(request,user)
            return JsonResponse(data={'msg':'login successfully'},status=200)
        return JsonResponse(data={'msg':'wrong credentials'},status=401)
    return JsonResponse(data={'msg':'bad request'},status=400)

@csrf_exempt
def islogin(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            return JsonResponse(data={'msg':'Logged in'},status=200)
        return JsonResponse(data={'msg':'You have to login'},status=403)
    

@csrf_exempt
def signout(request):
    logout(request)
    return JsonResponse(data={'msg':'logged out successfully'},status=200)


@csrf_exempt
def add_student(request):
    if request.method == 'POST':
        if request.user.is_authenticated:
            student = json.loads(request.body)
            student= models.Student.objects.create(
                firstname = student['firstname'],
                lastname = student['lastname'],
                dob = student['dob'],
                father_name = student['father_name'],
                mother_name =student['mother_name'],
                guardian_contact = student['guardian_contact'],
                standard = student['standard']
            )
            #print(student)
            return JsonResponse(data={"msg":"hello Arjun"},status=200)
        return JsonResponse(data={'msg':'not authenticated'},status=401)
    return JsonResponse(data={'msg':'bad request'},status=400)


@csrf_exempt
def update_student(request,id):
    if request.method == 'PUT':
        if request.user.is_authenticated:
            student = models.Student.objects.get(reg_no=id)
            data = json.loads(request.body)
            student.firstname = data['firstname']
            student.lastname = data['lastname']
            student.dob = data['dob']
            student.father_name = data['father_name']
            student.mother_name = data['mother_name']
            student.guardian_contact = data['guardian_contact']
            student.standard = data['standard']
            student.save()
            return JsonResponse(data={'msg':'updated student details'},status=200)
        return JsonResponse(data={'msg':'not authenticated'},status=401)
    return JsonResponse(data={'msg':'bad request'},status=400)

@csrf_exempt
def remove_student(request,id):
    if request.method == 'DELETE':
        if request.user.is_authenticated:
             student = models.Student.objects.get(reg_no=id)
             student.delete()
             return JsonResponse(data={'msg':'student deleted successfully'},status=200)
        return JsonResponse(data={'msg':'not authenticated'},status=401)
    return JsonResponse(data={'msg':'bad request'},status=400)




@csrf_exempt
def get_students(request,id=None):
    if request.method == 'GET':
        # if request.user.is_authenticated:
            if id:
                try:
                    student = models.Student.objects.get(reg_no = id)
                    return JsonResponse(data=student.tojson())
                except ObjectDoesNotExist:
                    return JsonResponse(data={'msg':'Student Does not Exist'})

            else:
                data = models.Student.objects.all()
                students = []
                for student in data:
                    students.append(student.tojson())
                return JsonResponse(data={'data':students},status = 200)
        # return JsonResponse(data={'msg':'not authenticated'},status=401)
    return JsonResponse(data={'msg':'bad request'},status=400)

        

@csrf_exempt
def add_assignment(request):
    if request.method == 'POST':
        if request.user.is_authenticated:
            data = json.loads(request.body)
            assignment = models.Assignments.objects.create(
                title = data['title'],
                description = data['description'],
                for_standard = data['for_standard'],
                due_date = data['due_date'],
                subject = data['subject']
            )
            return JsonResponse(data={'msg':'assignment added'},status=200)
        return JsonResponse(data={'msg':'not authenticated'},status= 401)
    return JsonResponse(data={'msg':'Bad request'},status= 400)

@csrf_exempt
def get_assignment(request):
    if request.method == 'GET':
        # if request.user.is_authenticated:
            data = models.Assignments.objects.all()
            assignments = []

            for assignment in data:
                assignments.append(assignment.tojson())
            return JsonResponse(data={'data':assignments},status=200)
        # return JsonResponse(data={'msg':'not authenticated'},status=401)
    return JsonResponse(data={'msg':'bad request'},status = 400)



