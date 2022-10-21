<p align="center" style="margin-bottom: 0px !important;">
  <img width="200" src="loghi.png" alt="MVC Express" align="center">
</p>

<h1 align="center" style="margin-top: 10px;">MVC Express with template engine</h1>

<p align="center">Another awesome Express template</p>

<div align="center">
<a href="https://github.com/paolaguarasci/templateAppExpressMVC/actions/workflows/eslint.yml"><img width="100" src="https://github.com/paolaguarasci/templateAppExpressMVC/actions/workflows/eslint.yml/badge.svg?branch=dev" alt="MVC Express" align="center"></a>
</div>

### Features

- MVC Architecture
- [Twig](https://www.npmjs.com/package/twig) as template engine
- [Express](https://www.npmjs.com/package/express) version 5 (**still in BETA!**)
- Login with [passport](https://www.npmjs.com/package/passport) (username/password)
- Security headers (with [helmet](https://www.npmjs.com/package/helmet))
- Protection against url parameter pollution (with [HPP](https://www.npmjs.com/package/hpp))
- MongoDB/Mongoose (with [Atlas](https://cloud.mongodb.com/))
- Rate limiter (with [node-rate-limiter-flexible](https://www.npmjs.com/package/rate-limiter-flexible))
- [Snyk](https://snyk.io/) tested for code quality and vulnerability
- HTTPS support (need to build your own localhost cert/key or use valid cert/key in production)
- Dockerizzed
- Basic Role base access controll (user, editor, admin)
- Server side input validation (with [express-validator](https://www.npmjs.com/package/express-validator))
- Test drive development
- ES6+ syntax
- [ESLint](https://www.npmjs.com/package/eslint)

This project is developed using the very latest version of node (version 19). I do not exclude that it also works with older but fairly recent versions.

### Configure

In order to start developing and expanding this template you must:

- `npm install` in root directory
- copy `.env.example` in `.env`
- edit `.env` end fill in the missing values
- create your own cert/key for `localhost` as suggest [letsencrypt](https://letsencrypt.org/docs/certificates-for-localhost/)

  ```shell
  $ cd cert
  $ openssl req -x509 -out localhost.crt -keyout localhost.key \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
  ```

### Start dev mode

```shell
$ docker compose -f docker-compose.dev.yaml up
```

### Start production mode

```shell
$ docker compose -f docker-compose.prod.yaml up -d
```

The `-d` flag start in deamon mode.
If you need to apply change in your code base, you need to rebuild image. The flag `--no-deps` tell to docker to build only `web` image without dependencies.

```shell
$ docker compose build web
$ docker compose up --no-deps -d web
```

### Suggestion

#### Notes about `.nvmrc`

If you use `zsh` and `nvm` as your node version manager, you can automatically force the use of a particular version of node when you enter the directory containing the `.nvrmc` file with the shell. In addition to the presence of the given file you have to add in `.zshrc` the following snippet of code **after nvm initialization**

```sh
# nvm initialization
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

# ...

autoload -U add-zsh-hook
load-nvmrc() {
  local node_version="$(nvm version)"
  local nvmrc_path="$(nvm_find_nvmrc)"

  if [ -n "$nvmrc_path" ]; then
    local nvmrc_node_version=$(nvm version "$(cat "${nvmrc_path}")")

    if [ "$nvmrc_node_version" = "N/A" ]; then
      nvm install
    elif [ "$nvmrc_node_version" != "$node_version" ]; then
      nvm use
    fi
  elif [ "$node_version" != "$(nvm version default)" ]; then
    echo "Reverting to nvm default version"
    nvm use default
  fi
}
add-zsh-hook chpwd load-nvmrc
load-nvmrc
```

#### Remove unused package

#### Check vulnerability in node package

#### Check vulnerability in docker

https://github.com/docker/docker-bench-security

### Future expansions

- Improve RBAC with https://github.com/flash-oss/node_acl
- Coverage test ~100%
- PurgeCSS to remove unused css rules
- CSFR protection
- Another version in which only APIs are handled (coming soon)
- Improve input validation
- Github workflow for test automation
- Documentation
- Sanitize
- Logging sistem

### Disclaimer

This is a project created primarily to put together some good programming ideas and have a base from which to start if needed. It is therefore code for personal use. It does not claim to be anything official so use it at your own discretion, on your own responsibility.





test


