from django.conf.urls import url
from django.core.urlresolvers import reverse_lazy
from django.views.generic import RedirectView

from . import views

ABOUT_PAGES = ('mission', 'team', 'connect')

urlpatterns = [
    url(r'^$', RedirectView.as_view(
        url=reverse_lazy('about-mission'),
        permanent=False
    ), name='about-index'),
]

for page in ABOUT_PAGES:
    urlpatterns.append(
        url(
            r'^' + page + '$',
            views.about,
            {
                'current_page_name': page,
                'about_page_names': ABOUT_PAGES
            },
            name='about-' + page
        )
    )