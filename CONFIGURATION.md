# APEX-Client-Side-PDF CONFIGURATION

APEX Client-Sode PDF plugin uses html style classes to define regions that are rendered as PDF body, header or footer.

The following sreenshot shows the page structur and inline CSS of the demo page on https://apex.oracle.com/pls/apex/f?p=105972 (Login is: demo / 12345678).  

![PAGE PDF Body](https://github.com/rhinterndorfer/APEX-Client-Side-PDF/raw/master/screenshot_page_structur.png)

The regions that are used as PDF body, header or footer content are marked with the default "pdf-Body", "pdf-Footer" or "pdf-Header" class. 
The jQuery selector for the body, header or footer region can be changed within the plugin settings.  

![PAGE PDF Body](https://github.com/rhinterndorfer/APEX-Client-Side-PDF/raw/master/screenshot_page_pdf_body.png)

![PAGE PDF Body](https://github.com/rhinterndorfer/APEX-Client-Side-PDF/raw/master/screenshot_page_pdf_header.png)

![PAGE PDF Body](https://github.com/rhinterndorfer/APEX-Client-Side-PDF/raw/master/screenshot_page_pdf_footer.png)

For page information use a placeholder like "Page #PAGE# of #TOTALPAGES#" within a div that is marked with the default class "pdf-PageInfoContainer".
This container has to be placed within footer or header region.

![PAGE PDF Body](https://github.com/rhinterndorfer/APEX-Client-Side-PDF/raw/master/screenshot_page_pdf_page_info.png)

The following screenshots shows the configuration of the two buttons that trigger the PDF creation on client. 
The "Create PDF (download)" button starts a download of the created PDF file.
The scond button "Create PDF (window)" opens the created PDF file in a new window.
Please check the POPUP blocker when using "Create PDF (window)".

![PAGE PDF Body](https://github.com/rhinterndorfer/APEX-Client-Side-PDF/raw/master/screenshot_page_pdf_button_download.png)

![PAGE PDF Body](https://github.com/rhinterndorfer/APEX-Client-Side-PDF/raw/master/screenshot_page_pdf_button_new_window.png)


The html attribute data-html2canvas-ignore excludes elements from rendering (source: http://html2canvas.hertzen.com/configuration/).