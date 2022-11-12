| :warning: Deprecation Notice          |
|:------------------------------------------|
| This project has been deprecated.  As of this point the Twitter account associated with this bot has been removed/disabled, and no new development of *this* project will occur.  There are a number of reasons for this.  This repository will remain intact, to keep the sourcecode available for reference.   This project may see new life in a more adaptable, less Twitter/Manifold Garden focused project in the future.
  |


# ManifoldGardenTwitterBot

This repository hosts the code for the (Former) Twitter bot **Just Manifold Garden Screenshots**

Manifold Garden is a really cool game!  This project is a way to post screenshots and share them, because taking screenshots is one of the best parts of the game.  

## Setup and operation

### Setup

Clone the repo.  

Copy the file `config.js.example` to `config.js`.  
Populate the fields using a Twitter Developer account.  Create an application for your twitter user to tweet screenshots.  The application will require Read+Write priveleges.  

### Docker

Docker is the preferred way to run the application.  
Start Docker on your Windows device.  
From the project directory, run: 

```bash
docker-compose up -d
```

Assuming your Manifold Garden screenshot directory is in the typical place `($userprofile\AppData\LocalLow\William Chyr Studio\Manifold Garden\Pictures)`, run Manifold Garden, solve some puzzles and take some fabulous screenshots!  Manifold Garden Twitter Bot will continue to run in the background and upload screenshots to Twitter while you do. 
