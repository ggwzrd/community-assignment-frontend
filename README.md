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

## Database Structure

1. Users (Devise)
  * name:string
  * password:string
  * nickname:string
  * trustiness:float
  * silenced:boolean
  * last_sign_in_date:datetime
  * image:string

2. Profile
  * nickname:string
  * first_name:string
  * last_name:string
  * picture:string
  * bio:text

3. Posts
  * content:text
  * summary:text
  * link:string
  * images:string
  * is_spam:boolean
  * user_id:begint

4. Tags
  * name:string
  * description:string
  * icon:string

5. Reports
  * reason:string
  * screenshot:string
  * link:string
  * authenticity:integer
  * user_id:bigint
  * post_id:bigint

6. Trusts
  * comment:string
  * screenshot:string
  * link:string
  * authenticity:integer
  * user_id:bigint
  * post_id:bigint
  * source_id:bigint

7. Sources
  * name:string
  * description:string
  * logo:string
  * domain:string
  * secure_connection:boolean
  * verified:boolean
  * authenticity:integer

## Running Locally

Make sure you have [Node.js](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/lang/en/) installed and the [backend](https://github.com/Abohte/coinmunity-assignment-frontend) running.

```bash
git clone https://github.com/Abohte/coinmunity-assignment-frontend
cd coinmunity-assignment-backend
yarn install
yarn start
```

=======

# CoinMunity Functionality Explained -- by [giuliogallerini](https://github.com/giuliogallerini)

## Principals

The **coinmunity** is based on trust and, as in real life, trust needs to be
gained with efforts and a proven record of authenticity. For this reason there
will be a **decentralized** trust score system.

#### Why decentralized?

Because the platform will **not** be able to **control or influence** the trustiness of
a person or post. The community will be able to decide what they consider
trustworthy or not.

## Trustiness Logic

When we meet somebody in real life we give them the minimum amount of trust necessary
to start building a true relationship with them, for then increasing it or decreasing
it based on his / her **behaviours** or **statements**. This is the same logic that we are
going to use to evaluate the trustiness of a person and how it's going to evolve on time.

## Getting Started

Each user will start his / her journey with **10** `trustiness` points while the
maximum and minimum amounts are respectively `+infinite` and `-infinite` (*we can
review this during the development process*).

## Earning and Losing points

A user can earn trustiness points by posting anything he / she wants in the feed
that has been **previously verified** and it's **not a spam**. If the post gets
**trusted** by other participants of the coinmunity the user is going to automatically
earn trustiness points that will increase his / her **reliability** in the community.

In the contrary, if the user gets **reported**, he / she will lose the double of
the default trust points (`-0.2 trustiness points`).

## Trust or Report

When **trusting** a post we assume that you previously verified the information
that you are trusting. This is why we ask for the **source** where you
confirmed it. Each source will have it's level of authenticity that will influence the
weight of the given trust. The person will be able to add a screenshot or the link to the website
where he / she verified the authenticity of the post.

#### algorithm:

> based on a single post

*the default / initial value of a trust is always 0.1*

`trust / source_authenticity`

Trusting can be done only by **trustworthy coinmunity members** (*with at least 0
trustiness points*).


The **reporting** of a post is quite similar to the trusting but, instead
of the source, we will have the reason why this post has been reported.
Reporting can be done only by **trustworthy coinmunity members** (*with at least 0
trustiness points*).

> as previously mentioned each report it's equal to -0.2 trustiness points

## Silence

If a person trustiness drops below **-10** points it's going to be silenced for
as long as he doesn't return over -10 points.

In this case, the only way for the user to be able to be part of the community again,
is to demonstrate his / her commitment to it. This can be done each time that you login
into the platform. Each user will receive **0.5** points every time he / she logs into the
platform, with a maximum of **once per day**.
