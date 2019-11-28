create table categories
(
    id    int auto_increment
        primary key,
    value varchar(16) not null
)
    charset = utf8mb4;

create table posts
(
    id       int auto_increment
        primary key,
    title    varchar(255) not null,
    content  text         not null,
    html     text         not null,
    author   int          not null,
    category varchar(16)  not null,
    creation datetime     not null
)
    charset = utf8mb4;

create table ranks
(
    id    int auto_increment
        primary key,
    label varchar(255) not null
)
    charset = utf8mb4;

create table users
(
    id       int auto_increment
        primary key,
    username varchar(255) not null,
    password text         not null,
    token    text         null,
    `rank`   tinyint      not null,
    creation datetime     not null
)
    charset = utf8mb4;

