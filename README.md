# Oasis

## Live Map for Farming Simulator 22

While playing Farming Simulator 19, i was wondering if it's possible to have some kind of "out of game" live map.  
After some quick research (basically clicking through the dedicated server administration, i found some xml files with interesting informations.  
And here we are... "Oasis" a Farming Simulator Live Map.

## Prerequisites

* node > 16.9.1
* npm > 7.24.1
* Farming Simulator 22 Server ;)

Works best on linux hosts ;)

## Run Oasis locally

### Installation

1. Get the [latest](https://github.com/msdigital/oasis/releases/latest) relase version
2. Extract zip file
3. Open a new terminal inside the folder
4. Run `npm install` and let npm do the rest :)

### Run Oasis

The configuration is pretty easy.  
Just provide the following settings as environment variables to your node process  
_or_  
This app uses dotenv, just create an `.env` file in the root folder and add the following variables to it.

| Variable  | Description |
| ------------- | ------------- |
| WEB_PORT  | The port the app will use to run (ex. 3000)  |
| SERVER_IP  | The game server ip and port (ex. 127.0.0.1:1234)  |
| SERVER_KEY  | Some kind of secret key, should look something like this "fGL0Dayr"  |

You may find your servers IP and key in the Dedicated Server Administration under Settings ->Miscellaneous.  
If you, for example, take a look at the Link XML, you will see the IP, Port and the "code" which is used in this project as SERVER_KEY.

## Run Oasis on a server

### **_I do not provide support for installation and hosting!_**

## Authors

This project is licensed under GNU Lesser General Public License version 3 (GNU LGPLv3) - see the [LICENSE.md](LICENSE.md) file for details.
