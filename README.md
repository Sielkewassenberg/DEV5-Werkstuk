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

Wanneer je volgende endpoints invult krijg je: 

/ : al de verschillende opties 
```
[
"/",
"/getAll",
"/getAllProducten",
"/getAllTypes",
"/insertProduct/:name-:rate-:desc-:typesID",
"/insertType/:type",
"/deleteProduct/:productId",
"/deleteType/:typeId",
"/updateRating/:productId-:newRate",
"/updateType/:typeId-:newType"
]
```
---
/getAll : om al de tabels samen te krijgen
```
[
{
"id": 1,
"product_name": "Kylieskins",
"product_rating": 5,
"description": "Blauw",
"typesID": 1,
"type": "Oogschaduw"
},
{
"id": 2,
"product_name": "Kylieskins",
"product_rating": 8,
"description": "bruin",
"typesID": 2,
"type": "Lippenstift"
},
{
"id": 3,
"product_name": "Revolve",
"product_rating": 10,
"description": "roos",
"typesID": 3,
"type": "Foundation"
}
]

```
---
/getAllProducten: om alles van de tabel producten te krijgen
```
[
{
"id": 1,
"product_name": "Kylieskins",
"product_rating": 5,
"description": "Blauw",
"typesID": 1
},
{
"id": 2,
"product_name": "Kylieskins",
"product_rating": 8,
"description": "bruin",
"typesID": 2
},
{
"id": 3,
"product_name": "Revolve",
"product_rating": 10,
"description": "roos",
"typesID": 3
}
]
```
---
/getAllTypes: om alles van de de tabel types te krijgen
```
[
{
"id": 1,
"type": "Oogschaduw"
},
{
"id": 2,
"type": "Lippenstift"
},
{
"id": 3,
"type": "Foundation"
}
]
```
---
 /insertProduct/:name-:rate-:desc-:typesID: toevoegen van een product in de database 
```
voorbeelden:
 * http://localhost:3000/insertProduct/Revolve-10-roos-3
 * http://localhost:3000/insertProduct/Kylieskins-8-bruin-2
 * http://localhost:3000/insertProduct/Kylieskins-5-Blauw-1
```
---  
/insertType/:type : toevoegen van een types in de database 
```
voorbeelden:
 * http://localhost:3000/insertType/Oogschaduw
 * http://localhost:3000/insertType/Foundation
 * http://localhost:3000/insertType/Lippenstift
 
```
---
/deleteProduct/:productId : delete uit de database van meegegeven id voor producten
``` 
voorbeeld:
* http://localhost:3000/deleteProduct/1
```
--- 
/deleteType/:typeId: delete delete uit de database van meegegeven id voor types
``` 
voorbeeld:
* http://localhost:3000/deleteType/1
```
--- 
/updateRating/:productId-:newRate: aanpassen van je rating 
``` 
voorbeeld:
* http://localhost:3000/1/8
```
--- 

/updateType/:typeId-:newType":aanpassen van je type 
``` 
voorbeeld:
* http://localhost:3000/updateType/1-Liquid%20Oogschaduw
```
--- 