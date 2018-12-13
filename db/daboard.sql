-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 13, 2018 at 08:22 PM
-- Server version: 5.6.34-log
-- PHP Version: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `daboard`
--

-- --------------------------------------------------------

--
-- Table structure for table `auth`
--

CREATE TABLE `auth` (
  `id` int(11) NOT NULL,
  `token` text NOT NULL,
  `addressV4` text NOT NULL,
  `addressV6` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `auth`
--

INSERT INTO `auth` (`id`, `token`, `addressV4`, `addressV6`) VALUES
(1, '@4hwwu_MX99=GB2e^WkzttG9TR37-JLF$d=6A5xq%q%+4ny4bsuG4t$PbXvhuH*D', '127.0.0.1', '::1');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `value` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `value`) VALUES
(1, 'SIS'),
(2, 'BDE'),
(3, 'DEV');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `html` text NOT NULL,
  `author` varchar(255) NOT NULL,
  `category` varchar(16) NOT NULL,
  `creation` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `title`, `content`, `html`, `author`, `category`, `creation`) VALUES
(5, 'Contribuez au développement de DaBoard', '#### DaBoard ? Késaco ?\n\nIl s&#39;agit tout simplement du futur remplaçant de notre bien aimé SupBoard.\nUne refonte ? Pourquoi ? Un seul mot : RESTful API.\n* VueJS\n* ExpressJS\n\n#### Nous souhaitons votre avis !\n\nNous voulons que vous contribuiez, en tant qu&#39;étudiant Niçois à la création de notre futur dashboard, c&#39;est pourquoi si vous avez des suggestions ou que vous désirez participer au développement, contactez nous à l&#39;adresse suivante :\n\n`guillaume.sivade@supinfo.com`\n\n#### Fonctionnalités prévues (pour le moment)\n\n*Nous comptons sur vous afin de rendre cette liste plus exhaustive.*\n\n* Home page\n* Horaires des prochains Bus / Tramway aux arrêts à proximité du campus.\n* Actualité de la région en temps réel.\n* Météo à venir.\n* Planning des différentes promotions.\n* Actualité du campus (sous forme de news, comme celle que vous êtes en train de lire)', '<h4 id=\"daboardksaco\">DaBoard ? Késaco ?</h4>\n<p>Il s&#39;agit tout simplement du futur remplaçant de notre bien aimé SupBoard.\nUne refonte ? Pourquoi ? Un seul mot : RESTful API.</p>\n<ul>\n<li>VueJS</li>\n<li>ExpressJS</li>\n</ul>\n<h4 id=\"noussouhaitonsvotreavis\">Nous souhaitons votre avis !</h4>\n<p>Nous voulons que vous contribuiez, en tant qu&#39;étudiant Niçois à la création de notre futur dashboard, c&#39;est pourquoi si vous avez des suggestions ou que vous désirez participer au développement, contactez nous à l&#39;adresse suivante :</p>\n<p><code>guillaume.sivade@supinfo.com</code></p>\n<h4 id=\"fonctionnalitsprvuespourlemoment\">Fonctionnalités prévues (pour le moment)</h4>\n<p><em>Nous comptons sur vous afin de rendre cette liste plus exhaustive.</em></p>\n<ul>\n<li>Home page</li>\n<li>Horaires des prochains Bus / Tramway aux arrêts à proximité du campus.</li>\n<li>Actualité de la région en temps réel.</li>\n<li>Météo à venir.</li>\n<li>Planning des différentes promotions.</li>\n<li>Actualité du campus (sous forme de news, comme celle que vous êtes en train de lire)</li>\n</ul>', 'Gsivade', 'DEV', '2018-12-13 17:31:51');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `token` text NOT NULL,
  `rank` tinyint(4) NOT NULL,
  `creation` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `token`, `rank`, `creation`) VALUES
(1, 'Supinfo', '8a1b992c1150923faefc65a9acfd3855e2f2eab2c00a44f581d92d98aeabb8eb72158b74380d8e89f9e9f524e1019cbca2ff6dc660607aeb7833b7982f15c3e8', '', 1, '2018-11-29 15:32:18'),
(2, 'Gsivade', '30720A1D332B905FDD2097D6033DB5A8AD4E4780EF972EC236DD265A80F34577CD1F9644A5E934B43E6D0118879B2F20B5B0BBAA208C32AC8095886434FA3188', '20181213195522', 1, '2018-12-12 13:51:17');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `auth`
--
ALTER TABLE `auth`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `auth`
--
ALTER TABLE `auth`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
