from django.db import models

class EmergencySession(models.Model):
    session_id = models.CharField(max_length=100, unique=True)
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.session_id


class Transcription(models.Model):
    session = models.ForeignKey(
        EmergencySession,
        on_delete=models.CASCADE,
        related_name="transcriptions"
    )
    transcription_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Transcription for {self.session.session_id} at {self.created_at}"


class Summary(models.Model):
    transcription = models.OneToOneField(
        Transcription,
        on_delete=models.CASCADE,
        related_name="summary"
    )
    summary_text = models.TextField()
    sender = models.CharField(max_length=255, default="Unknown")
    receiver = models.CharField(max_length=255, default="Unknown")
    category = models.CharField(max_length=100, default="General")
    priority = models.CharField(max_length=50, default="Low")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Summary for transcription {self.transcription.id}"
