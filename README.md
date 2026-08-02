# Local Setup

# Part 1 Choice
I chose Form Validation and Error Reporting. When Javascript is disabled, it uses the native constraint validation from within the HTML to ensure that the correct requirements for the text area are being met. Otherwise, with JS enabled it adds more specific and explicitly stated field requirements. Additionally, I have it to where the textarea border is red if the currently input string is invalid, and green if it is valid.

# My Web Component
tag name: weather-widget
supported attributes: lat(itude), lon(gitude)

defaults: As I will explain below, I couldn't get a fully working version where I can allow user input so my default values are the same as my accepted values (my explicitly declared latitude and longitude values). As I will explain below, I want to address this on my own in the future and I thoroughly apologize for having something more minimal than I was hoping to achieve.

accepted values: I could not figure out how to properly accept user input values before the deadline, I apologize. To ensure that I submitted something that works, I declared the attribute values myself within the HTML, however in the future I want to figure out how to allow the user to input their city's and compare it against mine.
endpoint: 'https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,weather_code'

usage example: 
Unfortunately my usage example is very lackluster and minimal due to the explanations above, and my only usage example is what the code currently does.
The JS takes my explicitly stated lat/lon values and fetches the current weather for that specific area (San Diego) by adding them into the fetch line's URL (showed above). I tried to add more information on the page like the weather code (i.e sunny, cloudy, etc.) to try and make it more visually appealing but I couldn't get very far without it breaking.



# SSG (this was inredibly difficult to wrap my head around)
I chose Eleventy

# EC
I did not do the EC.

# Final note, just for my own sake
I have a greater respect for the JS side of webdev and I apologize that I couldn't submit something grander. I admit that this whole assignment gave me a lot of stress and frustration, but I think I came out of it at least having a better understanding of my skill level and that I do in fact want to take it further. Despite all of the headaches this assignment gave me, thank you for a great quarter and for all of the work and effort you returned to all of us.