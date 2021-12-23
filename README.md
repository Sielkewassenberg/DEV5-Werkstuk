# DEV5-Werkstuk
# Intro
In dit project kan je jou make-up ingeven en hierbij ook een rating toevoegen om zo goed bij te houden welke je later nog zou willen kopen. 

De database en de api zijn aangemaakt via docker. 

Het is een project gemaakt voor school. 
# Set-Up
Downloaden van mij github. Project openen en naar de integrated terminal gaan van  docker-compose.yml. file. Type hierin command: docker compose up --build 
Hierna moet je twee lijnen zien: tabel product gemaakt en  tabel types gemaakt. 
Wanneer je deze twee lijnen ziet, is de set-up gelukt. 
# Kennis 
 kennis van javascript, docker, postgress, github.  
# Hulp:
Bugs kunnen worden gemeld op github. Onder tags, kan je jou probleem rapporteren. 
Na 24/12 neem ik afstand van dit project, dan werkt alle hulp via github. 
# Status
Het project is nog in development
# Auteurs 
Sielke Wassenberg
# Endpoints

/ : al de verschillende opties te krijgen 
/getAll : om al de tabels samen te krijgen

 ![img] (alles.png) voor / 

/getAllProducten: om alles van de tabel producten te krijgen
/getAllTypes: om alles van de de tabel types te krijgen
/insertProduct/:name-:rate-:desc : toevoegen van een product in de database 
/insertType/:type : toevoegen van een types in de database 
/deleteID/:productId : delete vanuit de database van meegegeven id
/updateRating/:productId-:newRate : aanpassen van je rating 