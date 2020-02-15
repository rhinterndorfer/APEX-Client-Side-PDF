// APEX Client-Side PDF
// Author: Raphael Hinterndorfer
// Version: 0.1

/*
options = {
	pageFormat: "a4",
	pageOrientation: "portrait", 
	marginLeft: 50, 
	marginTop: 50, 
	marginRight: 50, 
	marginBottom: 50, 
	bodySelector: ".pdf-Body", 
	headerSelector: ".pdf-Header", 
	footerSelector: ".pdf-Footer", 
	pageInfoSelector: ".pdf-PageInfoContainer", 
	canvasScale: 2, 
	imageQuality: 0.95,
	outputFormat: "save",
	filename: "filename.pdf"
}
*/

var clientSidePdf = {

	// check options and set defaults
	checkOptions: function (options) {
			if(options){
				if(typeof options.version == "undefined"){
					options.version = "0.1";
				}
				if(typeof options.pageFormat == "undefined"){
					options.pageFormat = "a4";
				}
				if(typeof options.pageOrientation == "undefined"){
					options.pageOrientation = "portrait";
				}
				if(typeof options.marginLeft == "undefined"){
					options.marginLeft = 50;
				}
				if(typeof options.marginTop == "undefined"){
					options.marginTop = 50;
				}
				if(typeof options.marginRight == "undefined"){
					options.marginRight = 50;
				}
				if(typeof options.marginBottom == "undefined"){
					options.marginBottom = 50;
				}
				if(typeof options.bodySelector == "undefined"){
					options.bodySelector = ".pdf-Body";
				}
				if(typeof options.headerSelector == "undefined"){
					options.headerSelector = ".pdf-Header";
				}
				if(typeof options.footerSelector == "undefined"){
					options.footerSelector = ".pdf-Footer";
				}
				if(typeof options.pageInfoSelector == "undefined"){
					options.pageInfoSelector = ".pdf-PageInfoContainer";
				}
				if(typeof options.canvasScale == "undefined"){
					options.canvasScale = 2;
				}
				if(typeof options.imageQuality == "undefined"){
					options.imageQuality = 0.95;
				}
				if(typeof options.outputFormat == "undefined"){
					options.outputFormat = "save";
				}
				if(typeof options.filename == "undefined"){
					options.filename = "filename.pdf";
				}
			}
			else
			{
				options = {
					pageFormat: "a4",
					pageOrientation: "portrait", 
					marginLeft: 50, 
					marginTop: 50, 
					marginRight: 50, 
					marginBottom: 50, 
					bodySelector: ".pdf-Body", 
					headerSelector: ".pdf-Header", 
					footerSelector: ".pdf-Footer", 
					pageInfoSelector: ".pdf-PageInfoContainer", 
					canvasScale: 2, 
					imageQuality: 0.95,
					outputFormat: "save",
					filename: "filename.pdf"
				};
			}
			return options;
		},

	// open Pdf after it is created
	openPdf: function (state) {
			// open in new window
			setTimeout(function() {
				if(state.options.outputFormat == "window") {
					window.open(state.pdfObject.output('bloburl',{ filename: state.options.filename }), '_blank');
				} else if (state.options.outputFormat == "save") {
					state.pdfObject.save(state.options.filename);
				} else {
					console.log("createPDF: no valid output format selected");
				}
				
				// remove spinner
				state.spinner$.remove();
			});
		},
	
	// add footer to pdf pages
	addFooter: function (state) {
			if(state.footer$.length == 1) {
				html2canvas(state.footer$.get(0), state.html2pdf_options.html2canvas)
					.then(function(canvas){

						console.log( "createPDF: Add PDF footer on page " + state.currentPage );

						var imgData = canvas.toDataURL('image/png');
						
						// calculate available width
						// and use image ratio to calculate height
						var width = state.pdfObject.internal.pageSize.getWidth()-state.options.marginLeft - state.options.marginRight;
						var height = width / canvas.width * canvas.height;

						state.pdfObject.setPage(state.currentPage);
						state.pdfObject.addImage(imgData, 'PNG', state.options.marginLeft, state.pdfObject.internal.pageSize.getHeight() - state.options.marginBottom, width, height);
						
				}).then(function() { clientSidePdf.addFooterAndHeader(state); });
			} else {
				// no header proceed to next page
				clientSidePdf.addFooterAndHeader(state);
			}
		},
	
	// add header to pdf pages
	addHeader: function (state) {
			if(state.header$.length == 1) {
				html2canvas(state.header$.get(0), state.html2pdf_options.html2canvas)
					.then(function(canvas){

						console.log( "createPDF: Add PDF header on page " + state.currentPage );

						var imgData = canvas.toDataURL('image/png');
						
						// calculate available width
						// and use image ratio to calculate height
						var width = state.pdfObject.internal.pageSize.getWidth()-state.options.marginLeft - state.options.marginRight;
						var height = width / canvas.width * canvas.height;

						state.pdfObject.setPage(state.currentPage);
						state.pdfObject.addImage(imgData, 'PNG', state.options.marginLeft, state.options.marginTop-height, width, height);
						
				}).then(function() { clientSidePdf.addFooter(state); });
			} else {
				// no header add footer
				clientSidePdf.addFooter(state);
			}
		},
		
	
	// add footer and header to pdf pages
	addFooterAndHeader: function (state) {
			// proceed to next page
			state.currentPage = state.currentPage + 1;

			if(state.currentPage <= state.number_of_pages) {
				
				// set page information
				// ether on header or footer
				state.footer$.find(state.options.pageInfoSelector).text(state.pagePlaceHolder.replace('#PAGE#', state.currentPage).replace('#TOTALPAGES#', state.number_of_pages));
				state.header$.find(state.options.pageInfoSelector).text(state.pagePlaceHolder.replace('#PAGE#', state.currentPage).replace('#TOTALPAGES#', state.number_of_pages));
				
				clientSidePdf.addHeader(state);
			} else {
				// finish
				state.footer$.find(state.options.pageInfoSelector).text(state.pagePlaceHolder);
				state.header$.find(state.options.pageInfoSelector).text(state.pagePlaceHolder);
				
				clientSidePdf.openPdf(state);
			}
		},
	
	// main function to create a pdf
	createPdf: function (options) {
			console.log("createPDF: Start");
			console.log(options);
			
			// check options and set defaults
			clientSidePdf.checkOptions(options);
			
			// create state object
			var state = {
					currentPage: 0,
					number_of_pages: 0,
					options: options,
					html2pdf_options: {
						  margin:       [options.marginTop,options.marginRight,options.marginBottom,options.marginLeft],
						  pagebreak:    { mode: ['css','legacy'], before: '.pdf-page-break-before', after: '.pdf-page-break-after', avoid: '.pdf-page-break-avoid'},
						  filename:     options.filename,
						  image:        { type: 'jpeg', quality: options.imageQuality },
						  html2canvas:  { scale: options.canvasScale },
						  jsPDF:        { unit: 'pt', format: options.pageFormat, orientation: options.pageOrientation, title: options.filename }
					}
			};
			
			// start spinner
			state.spinner$ = apex.util.showSpinner();
			
			// create Pdf with body
			var pdf$ = $(options.bodySelector);
			var pdfWorker = html2pdf()
				.set(state.html2pdf_options)
				.from(pdf$.get(0))
				.toPdf()
				.get('pdf')
				.then(
					function(pdfObject) {
						
						state.pdfObject = pdfObject;
						state.number_of_pages = pdfObject.internal.getNumberOfPages();
						
						state.footer$ = $(options.footerSelector); 
						state.header$ = $(options.headerSelector); 
						state.pagePlaceHolder = state.footer$.find(options.pageInfoSelector).text();
						
						// when body is added do Pdf
						// iterate thru the pages and
						// add Header and Footer				
						clientSidePdf.addFooterAndHeader(state);
					}
				);
		}    
	
}