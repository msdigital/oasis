# Oasis

Live Map for Farming Simulator 22

## Prerequisites

* Works best on linux hosts ;)
* node > 16.9.1
* npm > 7.24.1

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

The Website is accessed via `localhost:3000`

## Run Oasis on a server

### **_I do not provide support for installation and hosting!_**

This project runs with `pm2` node process manager.
Deployment configured in `ecosystem.config.js`.

*DNS configuration etc. are up to the host.*

## Authors

This project is licensed under GNU Lesser General Public License version 3 (GNU LGPLv3) - see the [LICENSE.md](LICENSE.md) file for details