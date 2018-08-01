# Get original clickableuri from the crawling module in a log message
myUri = document.uri

		
# An error is raised when "Coveo" is not part of the title
if (".htm" not in myUri) and (".html" not in myUri):
    document.reject()
elif ("search.htm" in myUri) or ("error.htm" in myUri):
    document.reject()