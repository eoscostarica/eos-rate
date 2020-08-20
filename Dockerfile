FROM ubuntu:18.04

ARG ssh_prv_key
ARG ssh_pub_key
ARG branch

# Make sure we have bash as our default shell
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# Get the packages needed for Ubuntu
ENV DEBIAN_FRONTEND noninteractive
RUN apt-get -y update && \
  apt-get install -y \
  openssh-server \
  git

# Authorize SSH Host
RUN mkdir -p /root/.ssh && \
    chmod 0700 /root/.ssh && \
    ssh-keyscan 190.171.41.51 > /root/.ssh/known_hosts

# Add the keys and set permissions
RUN echo "$ssh_prv_key" > /root/.ssh/id_rsa && \
    chmod 600 /root/.ssh/id_rsa

RUN git clone --branch "$branch" https://github.com/eoscostarica/eos-rate.git /opt/eos-rate

WORKDIR /opt/eos-rate

CMD eval `ssh-agent` && ssh-add \
  && export GIT_SSH_COMMAND="/usr/bin/ssh -i /root/.ssh/id_rsa" \
  && git push "ssh://${USER}@190.171.41.51/var/repo/eos-rate.git" HEAD:"$branch"
