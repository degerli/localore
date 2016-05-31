# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('localore_admin', '0008_auto_20160515_1150'),
        ('blog', '0040_blogpage_video_poster_image_mobile'),
    ]

    operations = [
        migrations.AddField(
            model_name='blogpage',
            name='social_image',
            field=models.ForeignKey(on_delete=django.db.models.deletion.SET_NULL, blank=True, help_text='Optional. The image to use when sharing the page on social networks.', to='localore_admin.LocaloreImage', null=True, related_name='+'),
        ),
    ]
