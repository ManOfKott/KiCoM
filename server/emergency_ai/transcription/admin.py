from django.contrib import admin
from .models import EmergencySession, Transcription, Summary


@admin.register(Summary)
class SummaryAdmin(admin.ModelAdmin):
    list_display = ('id', 'transcription', 'summary_text', 'sender', 'receiver', 'category', 'prioritized', 'is_new', 'created_at')
    list_filter = ('is_new', 'category', 'prioritized')
    search_fields = ('summary_text', 'sender', 'receiver')

@admin.register(EmergencySession)
class EmergencySessionAdmin(admin.ModelAdmin):
    list_display = ('id', 'session_id', 'last_updated')
    search_fields = ('session_id',)

@admin.register(Transcription)
class TranscriptionAdmin(admin.ModelAdmin):
    list_display = ('id', 'session', 'transcription_text', 'created_at')
    search_fields = ('transcription_text', 'session__session_id')
