# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('localore_admin', '0008_auto_20160515_1150'),
        ('home', '0020_homepage_video_poster_image_mobile'),
    ]

    operations = [
        migrations.AddField(
            model_name='homepage',
            name='social_image',
            field=models.ForeignKey(help_text='Optional. The image to use when sharing the page on social networks.', null=True, related_name='+', to='localore_admin.LocaloreImage', blank=True, on_delete=django.db.models.deletion.SET_NULL),
        ),
    ]
