from django.contrib import admin
from .models import EmergencySession, Transcription, Summary


@admin.register(EmergencySession)
class EmergencySessionAdmin(admin.ModelAdmin):
    list_display = ('session_id', 'last_updated')  # Remove 'summary'
    search_fields = ('session_id',)


@admin.register(Transcription)
class TranscriptionAdmin(admin.ModelAdmin):
    list_display = ('session', 'created_at', 'transcription_text')
    search_fields = ('session__session_id', 'transcription_text')
    list_filter = ('created_at',)


@admin.register(Summary)
class SummaryAdmin(admin.ModelAdmin):
    list_display = ('transcription', 'created_at', 'summary_text')
    search_fields = ('transcription__transcription_text', 'summary_text')
    list_filter = ('created_at',)
