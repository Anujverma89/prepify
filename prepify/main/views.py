from django.shortcuts import render,HttpResponse
from django.core.serializers import serialize
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,logout,login
from django.shortcuts import redirect
import speech_recognition as sr
import os
from django.views.decorators.csrf import csrf_exempt
from .models import TestRecord

from .models import Question
# Create your views here.

def index(request):
    if request.user.is_authenticated:
        print("yes")
    else:
        print("No")
    return render(request,"index.html")


def taketest(request):
    existingAnswer= None
    all_questions = Question.objects.all()
    return render(request, "testpage.html",{"question":all_questions,"existingAnswer":existingAnswer})


@login_required(login_url= "login")
def dashboard(request):
    return render(request, "dashboard.html")


def loginf(request):
    if(request.method == "POST"):
        name = request.POST["username"]
        password= request.POST["password"]
        checkvalue = None
        if "checkvalue" in request.POST:
            checkvalue = request.POST["checkvalue"]
        u = authenticate(request,username = name, password = password)
        if u is not None:
            login(request,u)
            if (checkvalue == "1"):
                existingAnswer="Yes"
                all_questions = Question.objects.all()
                return render(request, "testpage.html",{"question":all_questions,"existingAnswer":existingAnswer})
            else:
                return redirect("home")
        else:
            mess="Username or password is wrong"
            return render(request,"auth.html",{"message":mess})
    else:
        referer = request.META.get('HTTP_REFERER')
        endpt = referer.split("/")
        refpt = endpt[3]
        print(refpt)
        mess=" "
        if(refpt == "taketest"):
            return render(request,"auth.html",{"message":mess})
        else:
            return render(request,"auth.html",{"message":mess})


def signup(request):
    if(request.method == "POST"):
        name = request.POST["username"]
        email = request.POST["useremail"]
        contact= request.POST["contact"]
        department= request.POST["department"]
        year= request.POST["year"]
        password = request.POST["password"]
        cpass= request.POST["confpassword"]
        checkvalue = None
        if "checkvalue" in request.POST:
            checkvalue = request.POST["checkvalue"]
        isUser = User.objects.filter(username='johndoe').exists()
        if not isUser :
            if (password != cpass):
                mess = "Password and confirm doesnot matches"
                return render(request,"auth.html",{"message":mess})
            else:
                user = User.objects.create_user(name,email,password)
                u = authenticate(username=name, password=password)
                if u is not None:
                    login(request,u)
                    if (checkvalue == "1"):
                        existingAnswer="Yes"
                        all_questions = Question.objects.all()
                        return render(request, "testpage.html",{"question":all_questions,"existingAnswer":existingAnswer})
                    else:
                        return redirect("home")
                else:
                    return redirect("login")
        else:
            mess = "User name already exists Choose new one"
            return render(request,"auth.html",{"message":mess})

    else:
        return HttpResponse("This route is blocked")


def logoutfunc(request):
    logout(request)
    return redirect("home")


    
def processSound(request):  
    data = request.FILES["data"]

    with open("video.mp4", 'wb+') as destination:
        for chunk in data.chunks():
            destination.write(chunk)

    r = sr.Recognizer()
    hard = sr.AudioFile("harvard.wav")
    with hard as source:
        audio = r.record(source)

    print(type(audio))
    r=r.recognize_google(audio)
    return HttpResponse(r)

@csrf_exempt
def saveResponse(request):
    if request.method == "POST":
        user = request.user
        print(user)
        question = request.POST["question"]
        answer = request.POST["answer"]
        score = 0.7
        res = TestRecord(id=None, userId=user,question=question, answer=answer, score=score)
        if res.save():
            return HttpResponse("response Created")
        else:
            return HttpResponse("Could not save the result Something went wrong !!")
    else:
        return HttpResponse("Not accessible")


def pastresult(request):
    result = TestRecord.objects.filter(userId = request.user)
    serialized_data = serialize('json', result)
    # print(serialized_data)
    res=[]
    for r in result:
        dic={}
        dic["question"] = r.question
        dic["answer"] = r.answer
        res.append(dic)
    print(len(res))
    return JsonResponse(res, status=200, safe=False)
    # return HttpResponse(result)