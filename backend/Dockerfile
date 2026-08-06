FROM ubuntu:24.04
#setup user
RUN useradd -m -s /bin/bash sandbox

#setup working directory
WORKDIR /home/sandbox

#update the ubuntu machine
RUN apt update && apt upgrade -y

#install nano and curl
RUN apt install nano curl -y

#install nodejs
RUN curl -fsSL https://deb.nodesource.com/setup_24.x | bash - && apt-get install -y nodejs

#configuring terminal to display current working directory
RUN echo 'PS1="\w $ "' >> /home/sandbox/.bashrc

#setup final working directory
WORKDIR /home/sandbox/app
    