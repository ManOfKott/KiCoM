from django.urls import path
from .views import TranscriptionEndpoint, SummaryView  # Import views

urlpatterns = [
    path('transcribe/', TranscriptionEndpoint.as_view(), name='transcribe'),
    path('summary/<str:session_id>/', SummaryView.as_view(), name='summary'),
]
