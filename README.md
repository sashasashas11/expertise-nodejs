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
1.Install `git` and `git gui`.

```
sudo apt-get install git
sudo apt-get install git-gui
```

2.Generate  ssh-key.

```
ssh-keygen -t rsa -C "git@github.com"
```

3.Add ssh-key on github (https://github.com/settings/ssh). Open your ssh-key.Copy text from file and add on github.

```
gedit ~/.ssh/id_rsa.pub
```

4.Clone project and go to branch develop.

```
git clone git@github.com:sashasashas11/expertise-nodejs.git
cd expertise-nodejs
git checkout develop
```