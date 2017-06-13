# Third party modules
from django.conf.urls import url
from django_yaml_redirects import load_redirects
from ubuntudesign.gsa.views import SearchView

# Local code
from django_template_finder_view import TemplateFinder

urlpatterns = load_redirects()
urlpatterns += [
    url(r'^search$', SearchView.as_view(template_name='search.html')),
    url(r'^(?P<template>.*)$', TemplateFinder.as_view()),
]

