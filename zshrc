proxy_status=on

case $proxy_status in
        on)
                ## select the base url for your proxies
#                proxy_url=3.166.220.15:3128
       proxy_url=cinproxy1.glb.comfin.gtm.ge.com:80
#       proxy_url=norproxy.comfin.ge.com:80
#               #proxy_url=sjc1intproxy01.crd.ge.com:8080

                ## set your proxies, using the base url you set above
                export ftp_proxy=http://$proxy_url
                export http_proxy=http://$proxy_url
                export https_proxy=http://$proxy_url
                export HTTP_PROXY=http://$proxy_url
                export HTTPS_PROXY=http://$proxy_url

                ## normally this is set, some networks require a proxy for 3.* and ge.com (like rf)
                ## in cases where your network uses proxies, this needs to be disabled.. in other cases enabled
                #export no_proxy="localhost,3.*,127.0.0.1,.ge.com"
				export no_proxy="localhost,3.*,127.0.0.1,.ge.com,`ifconfig | grep \"inet 3\" | grep -vn 127.0.0.1 | cut -c9-21 | head -1 | grep -E -o \"([0-9]{1,3}[\.]){3}[0-9]{1,3}\"`"

                echo "N.B. - proxies are on"
                echo "proxy base url: $proxy_url"
                ;;
        off)
                unset ftp_proxy
                unset http_proxy
                unset https_proxy
                unset HTTP_PROXY
                unset HTTPS_PROXY
                unset no_proxy

                echo "N.B. - proxies are unset"
                env | grep prox
                ;;
        *)
                echo $"Usage: $0 {on|off}"
                break
                ;;
esac

export PATH=".:/usr/local/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
export GOPATH=$HOME/workspace/go_projects
export PATH=$PATH:$GOPATH/bin


# Path to your oh-my-zsh installation.
export ZSH=/Users/221014669/.oh-my-zsh

# Set name of the theme to load.
# Look in ~/.oh-my-zsh/themes/
# Optionally, if you set this to "random", it'll load a random theme each
# time that oh-my-zsh is loaded.
ZSH_THEME="robbyrussell"

# Uncomment the following line to use case-sensitive completion.
# CASE_SENSITIVE="true"

# Uncomment the following line to use hyphen-insensitive completion. Case
# sensitive completion must be off. _ and - will be interchangeable.
# HYPHEN_INSENSITIVE="true"

# Uncomment the following line to disable bi-weekly auto-update checks.
# DISABLE_AUTO_UPDATE="true"

# Uncomment the following line to change how often to auto-update (in days).
# export UPDATE_ZSH_DAYS=13

# Uncomment the following line to disable colors in ls.
# DISABLE_LS_COLORS="true"

# Uncomment the following line to disable auto-setting terminal title.
# DISABLE_AUTO_TITLE="true"

# Uncomment the following line to enable command auto-correction.
# ENABLE_CORRECTION="true"

# Uncomment the following line to display red dots whilst waiting for completion.
# COMPLETION_WAITING_DOTS="true"

# Uncomment the following line if you want to disable marking untracked files
# under VCS as dirty. This makes repository status check for large repositories
# much, much faster.
# DISABLE_UNTRACKED_FILES_DIRTY="true"

# Uncomment the following line if you want to change the command execution time
# stamp shown in the history command output.
# The optional three formats: "mm/dd/yyyy"|"dd.mm.yyyy"|"yyyy-mm-dd"
# HIST_STAMPS="mm/dd/yyyy"

# Would you like to use another custom folder than $ZSH/custom?
# ZSH_CUSTOM=/path/to/new-custom-folder

# Which plugins would you like to load? (plugins can be found in ~/.oh-my-zsh/plugins/*)
# Custom plugins may be added to ~/.oh-my-zsh/custom/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
# Add wisely, as too many plugins slow down shell startup.
plugins=(git mvn spring cf brew)

# User configuration

# export MANPATH="/usr/local/man:$MANPATH"

source $ZSH/oh-my-zsh.sh

# You may need to manually set your language environment
# export LANG=en_US.UTF-8

# Preferred editor for local and remote sessions
# if [[ -n $SSH_CONNECTION ]]; then
#   export EDITOR='vim'
# else
#   export EDITOR='mvim'
# fi

# Compilation flags
# export ARCHFLAGS="-arch x86_64"

# ssh
# export SSH_KEY_PATH="~/.ssh/dsa_id"

# Set personal aliases, overriding those provided by oh-my-zsh libs,
# plugins, and themes. Aliases can be placed here, though oh-my-zsh
# users are encouraged to define aliases within the ZSH_CUSTOM folder.
# For a full list of active aliases, run `alias`.
#
# Example aliases
# alias zshconfig="mate ~/.zshrc"
# alias ohmyzsh="mate ~/.oh-my-zsh"

#nginx old ui start/restart/stop
alias s_nginx_old='sudo nginx -c /usr/local/etc/nginx/nginx-old-js-ui.conf'
alias r_nginx_old='sudo nginx -c /usr/local/etc/nginx/nginx-old-js-ui.conf -s reload'
alias e_nginx='sudo nginx -s stop'

#nginx devops-ui start/restart/stop
alias s_nginx_new='sudo nginx -c /usr/local/etc/nginx/nginx-new-js-ui.conf'
alias r_nginx_new='sudo nginx -c /usr/local/etc/nginx/nginx-new-js-ui.conf -s reload'

alias mac_mini_old_jenkins='ssh labuser@3.99.135.145'
alias ip_old='ifconfig | grep "inet 3"'
alias ip='ifconfig | grep "inet 3" | grep -vn 127.0.0.1 | cut -c9-21 | head -1 | grep -E -o "([0-9]{1,3}[\.]){3}[0-9]{1,3}" | tee >(pbcopy) >(xargs echo ">>> ip copied to clipbard: ")'
alias sshKeyToClipboard='pbcopy < ~/.ssh/id_rsa.pub'

alias z=". ~/.zshrc && echo 'reloaded .zshrc'"


alias poff='. ./.proxies.sh off'
alias pon='. ./.proxies.sh on'

alias cf_login_dev='cf login -u richard.marry@ge.com -p Uchimata -a https://api.grc-apps.svc.ice.ge.com -o predix-devops -s dev dev'
alias cf_login_demo='cf login -u richard.marry@ge.com -p Uchimata -a https://api.grc-apps.svc.ice.ge.com -o predix-devops -s demo demo'
alias cf_login_rc='cf login -u richard.marry@ge.com -p Uchimata -a https://api.grc-apps.svc.ice.ge.com -o predix-devops -s release-candidate'
alias cf_login_sandbox='cf login -u richard.marry@ge.com -p Uchimata -a https://api.grc-apps.svc.ice.ge.com -o predix-devops -s sandbox'
alias cf_login_release='cf login -u richard.marry@ge.com -p Uchimata -a https://api.grc-apps.svc.ice.ge.com -o predix-devops -s release'
alias cf_login_integration='cf login -u richard.marry@ge.com -p Uchimata -a https://api.grc-apps.svc.ice.ge.com -o predix-devops -s integration'

#vim bindings
bindkey -v

#emacs
alias emacs="emacs -nw"
# ctrl-r starts searching history backward
bindkey '^r' history-incremental-search-backward


# Zsh, ~/.zshrc
eval "$(grunt --completion=zsh)"

alias postgres_start="pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start"
alias postgres_stop="pg_ctl -D /usr/local/var/postgres stop -s -m fast"

# rabbit
alias rabbit_start="rabbitmq-server -detached"
alias rabbit_stop="rabbitmqctl stop"

DISABLE_AUTO_TITLE="true"
