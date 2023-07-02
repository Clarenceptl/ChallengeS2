# ChallengeS2
Voici notre projet de challenge, il est fait avec Nestjs en micro-service. La plupart, voir la totalité des fonctionalités attendues sont dans api-gateway. 
## Installation

setup le .env docker

### Build

```bash
$ docker compose build
```

### Developpement

```bash
$ docker compose up -d
```

### Seed data

```bash
$ docker compose exec app-service npm run seed
```
Compte seed : <br>
admin@admin.com - password -> admin <br>
user@user - password -> utilisateur simple <br>
employeur@employeur.com -> password -> employeur avec une entreprise

### Other
Liens du repo : https://github.com/Victsing/ChallengeS2
Branch : rendu/nestjs