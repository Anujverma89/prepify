from django.urls import path
from .import views

urlpatterns=[
    path("",views.index,name="home"),
    path("taketest",views.taketest, name="taketest"),
    path("dashboard", views.dashboard),
    path("login", views.loginf, name="login"),
    path("signup",views.signup,name="signup"),
    path("logout",views.logoutfunc,name="logout"),
    path("saveresult", views.saveResponse, name="saverespone"),
    path("pastresults", views.pastresult, name="pastresult"),
    path("processSound",views.processSound, name="prcesss"),
]