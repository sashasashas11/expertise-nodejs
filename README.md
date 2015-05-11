expertise-nodejs
================

Abstract
-----------
   The aim of work is to create web-oriented software for expert assessment of
questionnaire method. The objective of the study is to analyze the advantages
and disadvantages methods of questionnaire, analysis of existing software for
expert assessment, design and creation of web-oriented software for expert
assessment of questionnaire method, which would be accessible to the Internet
users for expert analysis of real problems and issues in business and education.

Installation
-----------
1.Install git and git gui.

```
sudo apt-get install git
sudo apt-get install git-gui
```

2.Generate  ssh-key.

```
ssh-keygen -t rsa -C "git@github.com"
```

3.Add ssh-key on github (https://github.com/settings/ssh). Open your ssh-key. Copy text from file and add on github.

```
gedit ~/.ssh/id_rsa.pub
```

4.Clone project and go to branch develop.

```
git clone git@github.com:sashasashas11/expertise-nodejs.git
cd expertise-nodejs
git checkout develop
```

5.Install Node.js and check version.

```
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install nodejs
nodejs -v
```

6.Install MongoDB.

```
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo apt-get install -y mongodb-org=3.0.2 mongodb-org-server=3.0.2 mongodb-org-shell=3.0.2 mongodb-org-mongos=3.0.2 mongodb-org-tools=3.0.2
```

7.Install Bower.

```
sudo npm install bower -g
```

8.Install npm.

```
cd expertise-nodejs
sudo npm install
```

9.Install Bower libs .

```
cd expertise-nodejs
bower install
```

10.Register environment variables.

```
export EXPERTISE_PORT=3000
export EXPERTISE_ENV=development
```

11.Create DB.

```
mongo
use expertise_dev
```

12.Run scripts for filling DB.

```
cd expertise-nodejs
node bin/mindb.js
node bin/method_db.js
```

Run application
-----------

1.Start server.

```
node app/app.js
```

2.Open [http://localhost:3000](http://localhost:3000).
