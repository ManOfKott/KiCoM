from django.urls import path
from .views import TranscriptionEndpoint, SummaryView, MarkSummariesAsRead  # Import views

urlpatterns = [
    path('transcribe/', TranscriptionEndpoint.as_view(), name='transcribe'),
    path('summary/<str:session_id>/', SummaryView.as_view(), name='summary'),
    path("mark-as-read/", MarkSummariesAsRead.as_view(), name="mark_summaries_as_read"),
]
