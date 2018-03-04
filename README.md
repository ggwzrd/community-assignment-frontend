# CoinMunity Frontend

React Frontend made during the final Real World Project weeks of the 9-week Codaisseur Academy. The Backend for this project can be found [here](https://github.com/Abohte/coinmunity-assignment-frontend). The assignment was given by [Guilio Gallerini](http://www.giuliogallerini.com/) of [CoiNerd](https://twitter.com/coinerdofficial).

This project was made by a team of Codaisseur students:
* [Adinda Bohte](https://github.com/Abohte)
* [Bruna da Fonseca](https://github.com/brunadafonseca)
* [Fandy Tsui](https://github.com/fandytcc)
* [Marc Smalbrugge](https://github.com/PamperBoy)
* [Sebastian van Hesteren](https://github.com/svanhesteren)

<p align="middle">
<img src="src/images/PostsPage.png" width="425" />
<img src="src/images/ProfilePage.png" width="425" />
</p>
<p align="middle">
<img src="src/images/PostPage.png" width="425" />
<img src="src/images/PostPageBottom.png" width="425" />
</p>
<p align="middle">
<img src="src/images/PostPageTrust.png" width="425" />
<img src="src/images/PostPageReport.png" width="425" />
</p>

## Assignment

Creating a community Microservice for CoiNerd, a platform for cryptocurrency enthusiasts. Users can browse posts, create posts and respond to other posts with Trusts, Reports and Comments. Each user has a trustiness score. A user can only post with a trustiness score > -10 and can only report/trust with a trustiness score of >= 0. The trustiness score can be increased by daily sign-in and received trusts. It will be decreased when a user's posts are reported. See below for more information regarding the assignment.

* Database: PostgreSQL
* Backend: Ruby on Rails
* Frontend: React.js
* WebSockets via Action Cable

See the [original repository](https://github.com/giuliogallerini/community-assignment-frontend).

## Running Locally

Make sure you have [Node.js](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/lang/en/) installed and the [backend](https://github.com/Abohte/coinmunity-assignment-frontend) running.

```bash
git clone https://github.com/Abohte/coinmunity-assignment-frontend
cd coinmunity-assignment-backend
yarn install
yarn start
```
