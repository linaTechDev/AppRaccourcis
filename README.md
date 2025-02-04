**Projet: Site web Everyday**

*Preview du site web*
![3E18A870-2F22-4225-A17F-5AEC4DAC7376_1_201_a](https://github.com/user-attachments/assets/5c9f35f1-c52b-4344-8f8c-700d079fc76f)

**Procédure d’installation:**

- Angular CLI
- Les dépendances utilisées ont été téléchargées depuis la création de projet Spring (Spring Initializer) ou depuis mvndependency
- PostGreSQL à été installé en allant sur le site officiel https://www.postgresql.org

**26 Août: Choix du projet est pas assez rempli**

- rencontre vendredi après le cours
- veut avoir un projet dans une nouvelle langue (Angular)
- incertitude sur le nombre insuffisant de fonctionnalités qu’il faut faire
# <a name="_6jorzmgz4eb7"></a>Sprint 1
**2 Septembre: (17:00-18:00) Trouvé idée du projet: une application avec une interface en Angular**

- une application raccourcis
- avec widgets
- en Angular dans le Frontend
- en Spring dans le Backend
- ajout de stories dans le Trello
- ajout initialisation environnement de base (Angular et Spring)
- ajout d’un wireframe de présentation :
  - Utilisation de l’application Canva pour la création du wireFrame

![](readme/Aspose.Words.51acb96e-aa55-46bf-95cd-9a1c96dade2a.001.png)

![](readme/Aspose.Words.51acb96e-aa55-46bf-95cd-9a1c96dade2a.002.png)

![](readme/Aspose.Words.51acb96e-aa55-46bf-95cd-9a1c96dade2a.003.png)


# <a name="_6by5obyyyvzr"></a>Sprint 2
**5 Septembre: (16:00-17:00) Visité des sites sur angular pour se refamiliariser avec le langage**

- Site web décrivant comment communiquer avec le Backend en Angular:

  <https://angular.io/guide/http> (très utile)

Appris:

- On peut rajouter nos propres champs
- y'a des nom fixes qui doivent être utilisés dans le payload
- On peut aussi avoir nos propres champs personnalisé
- Pour le token il y a 3 section le header, le payload et la signature

Opinion sur le site: 7/10 (très utile). Il manque la connexion avec le backend.

**8 Septembre: (19:00-20:00) Finalisation du FrontEnd de page connexion et création du compte en Angular**

- Ajout d’image de fond
- Modification de l’icon du site
- Ajout de 2 pages principal avant d’accéder à la page d’accueil (création et connexion compte)
- Problèmes rencontrées:
  - Les icônes doivent être en format .ico, les autres formats ne fonctionnent pas, ils n’affichent aucune icône

**9 Septembre: (18:00-19:00) Finalisation Backend pour la connexion et la création compte utilisateur en Spring**

- Ajout de la partie visuel et redimenssion de l’image de fond pour qu’elle prenne toute la page
- Test du backend avec postman et quelques corrections après

  ![](readme/Aspose.Words.51acb96e-aa55-46bf-95cd-9a1c96dade2a.004.png)
  
  ![](readme/Aspose.Words.51acb96e-aa55-46bf-95cd-9a1c96dade2a.005.png)

- Ajout dans Angular le lien avec Spring
# <a name="_mjs13fgl087e"></a>Sprint 3
**14 Septembre (20:00-21:00): Gestion de l’état de connexion de l’utilisateur (token)**

- Après la tentative infructueuse de créer manuellement le token, recherche d'une librairie pour aider à le faire
- Recherche aussi d'une librairie angular pour vérifier au frontend si le token est expiré
  - Problème/solution
    - recherche d'une solution pour le problème qu'il ne peut pas trouver le module "@auth0/angular-jwt
      - lien du site:

        <https://stackoverflow.com/questions/56563335/cannot-find-module-auth0-angular-jwt>

**15 Septembre (16:00-17:00): Le CRUD pour les raccourcis dans la page d’acceuil pour le Backend**

- CRUD raccorcis test postman

	 ![](readme/Aspose.Words.51acb96e-aa55-46bf-95cd-9a1c96dade2a.006.png)

![](readme/Aspose.Words.51acb96e-aa55-46bf-95cd-9a1c96dade2a.007.png)

![](readme/Aspose.Words.51acb96e-aa55-46bf-95cd-9a1c96dade2a.008.png)

![](readme/Aspose.Words.51acb96e-aa55-46bf-95cd-9a1c96dade2a.009.png)


# <a name="_b3yqc7sjt24i"></a>Sprint 4
**Lundi 19 Septembre (10:20-12:00): Le CRUD pour les widgets la partie Backend**

- Lecture sur les types de widgets
  - <https://docs.tibco.com/pub/loglmi/6.3.1/doc/html/GUID-D2D95190-A3D9-440B-B80F-4C0F8D411518.html>
  - Appris :
    - il y a beaucoup de types de widgets (bouton, checkbox, file…)

      Opinion sur le site : 5 / 10 (manque d’information et de plus de description)

- Test avec postman du CRUD pour les widgets

  ![](readme/Aspose.Words.51acb96e-aa55-46bf-95cd-9a1c96dade2a.010.png)

![](readme/Aspose.Words.51acb96e-aa55-46bf-95cd-9a1c96dade2a.011.png)

![](readme/Aspose.Words.51acb96e-aa55-46bf-95cd-9a1c96dade2a.012.png)

![](readme/Aspose.Words.51acb96e-aa55-46bf-95cd-9a1c96dade2a.013.png)

![](readme/Aspose.Words.51acb96e-aa55-46bf-95cd-9a1c96dade2a.014.png)

![](readme/Aspose.Words.51acb96e-aa55-46bf-95cd-9a1c96dade2a.015.png)

**Mercredi 21 Septembre (11:00-12:00): Progression pour la partie preview et le loader spinner**

- Avec le preview en progression et les futurs widgets le chargement de la page d’accueil risque d’être long alors pour ne pas laisser croire que l’application ne marche pas, ajout d’un loader d’attente en overview sur la page grâce à cette nouvelle composante
  - Utilisation de ce lien pour m’aider :
    - <https://christianlydemann.com/four-ways-to-create-loading-spinners-in-an-angular-app/>
    - Appris :
      - C’est possible avec angular d’afficher un loader en overlay grâce à la composante cdk, à partir d’un http intercepteur (pour démarrer le loader)
      - On peux styliser un spinner en Angular dans le css

		  Opinion sur le site (8/10) très utile, mais pas assez d’information pour l’intégration du loader sur l’intégration http intercepteur

- Installation d’une dépendence

![](readme/Aspose.Words.51acb96e-aa55-46bf-95cd-9a1c96dade2a.016.png)

**Vendredi 23 Septembre (16:00-17:00): Finalisation du preview**

- Lien d’un site utile : [preview lien utile](https://www.javachinna.com/generate-rich-link-preview-for-a-given-url-based-on-the-meta-tags-present-in-the-web-page-in-spring-boot/)
- Appris :
  - la logique avec l’aide de la composante Jsoup pour extraire l’information nécessaire à créer le preview

    Opinion sur le site (8/10) utile
